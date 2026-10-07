import { getSupabaseConfig } from './supabaseConfig';

const getConfig = () => {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  return { url, key };
};

const getErrorMessage = (result, fallback) =>
  result?.message || result?.msg || result?.error_description || fallback;

const isUuid = (value) =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const createSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const requireAdminToken = (accessToken, action = 'save changes') => {
  if (!accessToken) {
    throw new Error(`Please sign in again before you ${action}.`);
  }
};

const requestJson = async (url, options, fallback) => {
  const response = await fetch(url, options);
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(result, fallback));
  }

  return result;
};

const publicHeaders = (key) => ({
  apikey: key,
  Accept: 'application/json'
});

const adminHeaders = (key, accessToken) => ({
  apikey: key,
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates,return=representation'
});

const toArray = (value) => (Array.isArray(value) ? value : []);

const toNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const makeId = (value) => (isUuid(value) ? value : crypto.randomUUID());

const fetchTable = async (table, query = {}) => {
  const { url, key } = getConfig();
  const params = new URLSearchParams({ select: '*', ...query });

  return requestJson(
    `${url}/rest/v1/${table}?${params}`,
    { headers: publicHeaders(key) },
    `Could not load ${table} from Supabase.`
  );
};

const upsertRow = async (table, row, accessToken) => {
  const { url, key } = getConfig();
  requireAdminToken(accessToken);

  return requestJson(
    `${url}/rest/v1/${table}?on_conflict=id`,
    {
      method: 'POST',
      headers: adminHeaders(key, accessToken),
      body: JSON.stringify(row)
    },
    `Could not save changes to ${table}.`
  );
};

const deleteRow = async (table, id, accessToken) => {
  const { url, key } = getConfig();
  requireAdminToken(accessToken, `delete ${table}`);

  if (!isUuid(id)) {
    throw new Error(`This ${table} record does not have a valid Supabase ID.`);
  }

  const response = await fetch(
    `${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: {
        apikey: key,
        Authorization: `Bearer ${accessToken}`,
        Prefer: 'return=minimal'
      }
    }
  );

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(getErrorMessage(result, `Could not delete the record from ${table}.`));
  }

  return true;
};

/* Public portfolio reads */

export const fetchPublicTable = (table) => fetchTable(table);

export const fetchPublishedProjects = () =>
  fetchTable('projects', {
    is_published: 'eq.true',
    order: 'display_order.asc,created_at.desc'
  });

export const fetchPublicSkills = async () => {
  const [categoryRows, skillRows] = await Promise.all([
    fetchTable('skill_categories', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('skills', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    })
  ]);

  return categoryRows.map((category) => ({
    id: category.id,
    category: category.name,
    icon: category.icon || 'Code2',
    description: category.description || '',
    isVisible: category.is_visible,
    skills: skillRows
      .filter((skill) => skill.category_id === category.id)
      .map((skill) => ({
        id: skill.id,
        categoryId: skill.category_id,
        name: skill.name,
        level: skill.proficiency || '',
        highlight: skill.highlight || '',
        isVisible: skill.is_visible
      }))
  }));
};

export const fetchPublicPortfolioSections = async () => {
  const [
    experienceRows,
    educationRows,
    certificationRows,
    codingProfileRows,
    socialRows,
    statusRows,
    settingsRows
  ] = await Promise.all([
    fetchTable('experience', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('education', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('certifications', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('coding_profiles', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('social_links', {
      is_visible: 'eq.true',
      order: 'display_order.asc'
    }),
    fetchTable('current_status', { id: 'eq.true' }),
    fetchTable('site_settings', { id: 'eq.true' })
  ]);

  const allowedCodingProfiles = new Set(['github', 'leetcode']);

  return {
    experience: experienceRows.map((row) => ({
      id: row.id,
      role: row.role || '',
      company: row.company || '',
      location: row.location || '',
      period: row.period || '',
      type: row.employment_type || '',
      transferableSkills: toArray(row.transferable_skills),
      responsibilities: toArray(row.responsibilities).length
        ? row.responsibilities
        : row.description
          ? [row.description]
          : [],
      isVisible: row.is_visible
    })),

    education: educationRows.map((row) => ({
      id: row.id,
      degree: row.qualification || '',
      institution: row.institution || '',
      location: row.location || '',
      period: row.period || '',
      status: row.status || '',
      highlights: row.description || '',
      isVisible: row.is_visible
    })),

    certifications: certificationRows.map((row) => ({
      id: row.id,
      title: row.name || '',
      issuer: row.issuer || '',
      location: row.location || '',
      period: row.period || '',
      type: row.certification_type || '',
      description: row.description || '',
      technologies: toArray(row.technologies),
      note: row.note || '',
      certificateUrl: row.certificate_url || row.credential_url || '',
      credentialUrl: row.credential_url || '',
      certificateType: row.certificate_type || '',
      hasDownload: Boolean(row.has_download),
      isVisible: row.is_visible
    })),

    codingProfiles: codingProfileRows
      .filter((row) =>
        allowedCodingProfiles.has((row.platform || '').toLowerCase())
      )
      .map((row) => ({
        id: row.id,
        name: row.platform || '',
        username: row.username || '',
        url: row.profile_url || '',
        icon: row.icon || 'Code2',
        badgeText: row.stats?.badgeText || '',
        isVisible: row.is_visible
      })),

    socials: socialRows.map((row) => ({
      id: row.id,
      name: row.platform || '',
      label: row.label || row.platform || '',
      handle: row.handle || '',
      url: row.url || '',
      icon: row.icon || 'Link',
      isVisible: row.is_visible
    })),

    currentStatus: statusRows[0]
      ? {
          statusText: statusRows[0].status_text || '',
          availability: statusRows[0].availability || '',
          currentFocus: statusRows[0].current_focus || '',
          isVisible: statusRows[0].is_visible,
          updatedAt: statusRows[0].updated_at || null
        }
      : null,

    siteSettings: settingsRows[0]
      ? {
          contactEmail: settingsRows[0].contact_email || '',
          whatsappNumber: settingsRows[0].whatsapp_number || '',
          contactEnabled: Boolean(settingsRows[0].contact_enabled),
          contactHeading: settingsRows[0].contact_heading || '',
          contactDescription: settingsRows[0].contact_description || '',
          resumeDownloadLabel: settingsRows[0].resume_download_label || '',
          ...(settingsRows[0].settings || {})
        }
      : null
  };
};

/* Portfolio profile */

export const savePortfolioProfile = async (profile, accessToken) => {
  const row = {
    id: true,
    full_name: profile.name || '',
    professional_title: profile.title || '',
    short_bio: profile.heroDescription || '',
    long_bio: profile.aboutSummary || '',
    location: profile.location || '',
    email: profile.email || '',
    portrait_url: profile.profileImage || '',
    hero_video_url: profile.heroVideo || '',
    instagram_url: profile.instagram || '',
    updated_at: new Date().toISOString()
  };

  const result = await upsertRow('portfolio_profile', row, accessToken);
  return result?.[0] ?? null;
};

/* Projects */

export const saveProject = async (project, accessToken) => {
  const title = project.title?.trim() || '';
  const row = {
    id: makeId(project.id),
    title,
    slug: project.slug?.trim() || createSlug(title),
    summary: project.shortDescription || project.summary || '',
    description: project.description || '',
    image_url: project.thumbnail || project.image_url || project.imageUrl || '',
    screenshots: toArray(project.screenshots),
    tech_stack: toArray(project.technologies || project.tech_stack || project.techStack),
    category: project.category || '',
    categories: toArray(project.categories),
    github_url: project.github || project.github_url || project.githubUrl || '',
    live_url: project.liveDemo || project.live_url || project.liveUrl || '',
    featured: Boolean(project.featured),
    status: project.status || '',
    problem_statement: project.problemStatement || project.problem_statement || '',
    solution: project.solution || '',
    features: toArray(project.features),
    challenges: project.challenges || '',
    learning_outcomes: project.learningOutcomes || project.learning_outcomes || '',
    is_published: project.is_published ?? project.isPublished ?? true,
    display_order: toNumber(project.display_order ?? project.displayOrder),
    updated_at: new Date().toISOString()
  };

  const result = await upsertRow('projects', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteProject = (projectId, accessToken) =>
  deleteRow('projects', projectId, accessToken);

/* Skills */

export const saveSkillCategory = async (category, accessToken) => {
  const row = {
    id: makeId(category.id),
    name: category.name || category.category || '',
    description: category.description || '',
    icon: category.icon || 'Code2',
    display_order: toNumber(category.display_order ?? category.displayOrder),
    is_visible: category.is_visible ?? category.isVisible ?? true
  };

  const result = await upsertRow('skill_categories', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteSkillCategory = (categoryId, accessToken) =>
  deleteRow('skill_categories', categoryId, accessToken);

export const saveSkill = async (skill, accessToken) => {
  if (!isUuid(skill.categoryId)) {
    throw new Error('This skill category has no valid Supabase ID.');
  }

  const row = {
    id: makeId(skill.id),
    category_id: skill.categoryId,
    name: skill.name || '',
    proficiency: skill.level || skill.proficiency || '',
    highlight: skill.highlight || '',
    display_order: toNumber(skill.display_order ?? skill.displayOrder),
    is_visible: skill.is_visible ?? skill.isVisible ?? true
  };

  const result = await upsertRow('skills', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteSkill = (skillId, accessToken) =>
  deleteRow('skills', skillId, accessToken);

/* Experience */

export const saveExperience = async (experience, accessToken) => {
  const responsibilities = toArray(experience.responsibilities);
  const row = {
    id: makeId(experience.id),
    role: experience.role || '',
    company: experience.company || '',
    location: experience.location || '',
    description: responsibilities.join('\n'),
    period: experience.period || '',
    employment_type: experience.type || experience.employment_type || '',
    transferable_skills: toArray(
      experience.transferableSkills || experience.transferable_skills
    ),
    responsibilities,
    start_date: experience.start_date || null,
    end_date: experience.end_date || null,
    is_current: Boolean(experience.is_current),
    display_order: toNumber(experience.display_order ?? experience.displayOrder),
    is_visible: experience.is_visible ?? experience.isVisible ?? true
  };

  const result = await upsertRow('experience', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteExperience = (id, accessToken) =>
  deleteRow('experience', id, accessToken);

/* Education */

export const saveEducation = async (education, accessToken) => {
  const row = {
    id: makeId(education.id),
    institution: education.institution || '',
    qualification: education.degree || education.qualification || '',
    field_of_study: education.field_of_study || '',
    description: education.highlights || education.description || '',
    location: education.location || '',
    period: education.period || '',
    status: education.status || '',
    start_date: education.start_date || null,
    end_date: education.end_date || null,
    display_order: toNumber(education.display_order ?? education.displayOrder),
    is_visible: education.is_visible ?? education.isVisible ?? true
  };

  const result = await upsertRow('education', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteEducation = (id, accessToken) =>
  deleteRow('education', id, accessToken);

/* Certifications */

export const saveCertification = async (certification, accessToken) => {
  const row = {
    id: makeId(certification.id),
    name: certification.title || certification.name || '',
    issuer: certification.issuer || '',
    credential_url: certification.credentialUrl || '',
    issue_date: certification.issue_date || null,
    expiry_date: certification.expiry_date || null,
    location: certification.location || '',
    period: certification.period || '',
    certification_type: certification.type || certification.certification_type || '',
    description: certification.description || '',
    technologies: toArray(certification.technologies),
    note: certification.note || '',
    certificate_url:
      certification.certificateUrl || certification.certificate_url || '',
    certificate_type:
      certification.certificateType || certification.certificate_type || '',
    has_download: Boolean(certification.hasDownload ?? certification.has_download),
    display_order: toNumber(certification.display_order ?? certification.displayOrder),
    is_visible: certification.is_visible ?? certification.isVisible ?? true
  };

  const result = await upsertRow('certifications', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteCertification = (id, accessToken) =>
  deleteRow('certifications', id, accessToken);

/* Coding Profiles — the public reader keeps only GitHub and LeetCode */

export const saveCodingProfile = async (codingProfile, accessToken) => {
  const platform = codingProfile.platform || codingProfile.name || '';
  const row = {
    id: makeId(codingProfile.id),
    platform,
    username: codingProfile.username || '',
    profile_url: codingProfile.url || codingProfile.profile_url || '',
    icon: codingProfile.icon || 'Code2',
    stats: {
      ...(codingProfile.stats || {}),
      badgeText: codingProfile.badgeText || codingProfile.stats?.badgeText || ''
    },
    display_order: toNumber(codingProfile.display_order ?? codingProfile.displayOrder),
    is_visible: codingProfile.is_visible ?? codingProfile.isVisible ?? true
  };

  const result = await upsertRow('coding_profiles', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteCodingProfile = (id, accessToken) =>
  deleteRow('coding_profiles', id, accessToken);

/* Social links */

export const saveSocialLink = async (social, accessToken) => {
  const platform = social.platform || social.name || '';
  const row = {
    id: makeId(social.id),
    platform,
    label: social.label || social.name || platform,
    handle: social.handle || '',
    url: social.url || '',
    icon: social.icon || 'Link',
    display_order: toNumber(social.display_order ?? social.displayOrder),
    is_visible: social.is_visible ?? social.isVisible ?? true
  };

  const result = await upsertRow('social_links', row, accessToken);
  return result?.[0] ?? null;
};

export const deleteSocialLink = (id, accessToken) =>
  deleteRow('social_links', id, accessToken);

/* Current status and site settings use the singleton row id=true */

export const saveCurrentStatus = async (status, accessToken) => {
  const row = {
    id: true,
    status_text: status.statusText || status.status_text || '',
    availability: status.availability || '',
    current_focus: status.currentFocus || status.current_focus || '',
    is_visible: status.isVisible ?? status.is_visible ?? true,
    updated_at: new Date().toISOString()
  };

  const result = await upsertRow('current_status', row, accessToken);
  return result?.[0] ?? null;
};

export const saveSiteSettings = async (settings, accessToken) => {
  const {
    contactEmail = '',
    whatsappNumber = '',
    contactEnabled = true,
    contactHeading = '',
    contactDescription = '',
    resumeDownloadLabel = '',
    ...publicSettings
  } = settings;

  const row = {
    id: true,
    contact_email: contactEmail,
    whatsapp_number: whatsappNumber,
    contact_enabled: Boolean(contactEnabled),
    contact_heading: contactHeading,
    contact_description: contactDescription,
    resume_download_label: resumeDownloadLabel,
    settings: publicSettings,
    updated_at: new Date().toISOString()
  };

  const result = await upsertRow('site_settings', row, accessToken);
  return result?.[0] ?? null;
};