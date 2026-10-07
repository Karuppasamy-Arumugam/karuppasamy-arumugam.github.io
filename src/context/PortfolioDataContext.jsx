import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { initialProfile } from '../data/profile';
import { initialProjects } from '../data/projects';
import { initialSkills } from '../data/skills';
import { initialExperience } from '../data/experience';
import { initialEducation } from '../data/education';
import { initialCertifications } from '../data/certifications';
import { initialCodingProfiles } from '../data/codingProfiles';
import { initialSocials } from '../data/socials';

import {
  fetchPublicTable,
  fetchPublishedProjects,
  fetchPublicSkills,
  fetchPublicPortfolioSections,
  savePortfolioProfile,
  saveSkillCategory,
  deleteSkillCategory as deleteSkillCategoryFromSupabase,
  saveSkill,
  deleteSkill as deleteSkillFromSupabase,
  saveExperience,
  deleteExperience as deleteExperienceFromSupabase,
  saveEducation,
  deleteEducation as deleteEducationFromSupabase,
  saveCertification,
  deleteCertification as deleteCertificationFromSupabase,
  saveCodingProfile,
  deleteCodingProfile as deleteCodingProfileFromSupabase,
  saveSocialLink,
  deleteSocialLink as deleteSocialLinkFromSupabase,
  saveCurrentStatus,
  saveSiteSettings
} from '../utils/portfolioApi';

const STORAGE_KEY = 'karuppasamy_portfolio_data_v1';

const defaultSettings = {
  particleEnabled: true,
  threeDEnabled: true,
  heroVideoEnabled: true,
  contactFormEnabled: true,
  web3FormsAccessKey: '',
  animationIntensity: 'standard',
  defaultTheme: 'dark',
  availabilityStatus: 'Available for Junior Full Stack Developer Opportunities',
  isAvailable: true,
  currentFocus: ''
};

const normalizeSavedProfile = (profile) => {
  if (!profile) return initialProfile;

  return {
    ...initialProfile,
    ...profile,
    whatsapp:
      profile.whatsapp === '9585346003' ||
      profile.whatsapp === '919876543210'
        ? '919585346003'
        : profile.whatsapp
  };
};

const normalizeSavedSocials = (socials) => {
  if (!Array.isArray(socials)) return initialSocials;

  return socials.map((social) => {
    if (
      social.id === 'whatsapp' &&
      (social.url || '').includes('919876543210')
    ) {
      return {
        ...social,
        url: 'https://wa.me/919585346003?text=Hi%20Karuppasamy%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.'
      };
    }

    if (
      social.id === 'github' &&
      (social.url || '').includes('github.com/karuppasamy74')
    ) {
      return {
        ...social,
        url: 'https://github.com/Karuppasamy-Arumugam',
        handle: 'Karuppasamy-Arumugam'
      };
    }

    if (
      social.id === 'linkedin' &&
      (social.url || '').includes('linkedin.com/in/karuppasamy-a')
    ) {
      return {
        ...social,
        url: 'https://www.linkedin.com/in/karuppasamy-arumugam/',
        handle: 'karuppasamy-arumugam'
      };
    }

    return social;
  });
};

const normalizeCodingProfiles = (profiles) => {
  const source = Array.isArray(profiles) ? profiles : initialCodingProfiles;

  return source
    .filter((profile) =>
      ['github', 'leetcode'].includes(
        (profile.name || profile.platform || profile.id || '').toLowerCase()
      )
    )
    .map((profile) => {
      if (
        (profile.id === 'github' || profile.platform === 'GitHub') &&
        (profile.url || '').includes('github.com/karuppasamy74')
      ) {
        return {
          ...profile,
          username: '@Karuppasamy-Arumugam',
          url: 'https://github.com/Karuppasamy-Arumugam'
        };
      }

      return profile;
    });
};

const loadLocalData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    return {
      profile: normalizeSavedProfile(parsed.profile),
      projects: parsed.projects || initialProjects,
      skills: parsed.skills || initialSkills,
      experience: parsed.experience || initialExperience,
      education: parsed.education || initialEducation,
      certifications: parsed.certifications || initialCertifications,
      codingProfiles: normalizeCodingProfiles(parsed.codingProfiles),
      socials: normalizeSavedSocials(parsed.socials || initialSocials),
      settings: {
        ...defaultSettings,
        ...(parsed.settings || {})
      }
    };
  } catch (error) {
    console.error('Could not load saved portfolio data:', error);
    return null;
  }
};

const initialData = loadLocalData() || {
  profile: initialProfile,
  projects: initialProjects,
  skills: initialSkills,
  experience: initialExperience,
  education: initialEducation,
  certifications: initialCertifications,
  codingProfiles: normalizeCodingProfiles(initialCodingProfiles),
  socials: normalizeSavedSocials(initialSocials),
  settings: { ...defaultSettings }
};

const PortfolioDataContext = createContext(null);

const isUuid = (value) =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

export const PortfolioDataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [cloudLoaded, setCloudLoaded] = useState(false);

  // Save a local fallback copy. The Web3Forms key stays in the browser only.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Could not save portfolio fallback data:', error);
    }
  }, [data]);

  // Load public profile from Supabase.
  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const rows = await fetchPublicTable('portfolio_profile');
        const row = rows?.[0];
        if (!row || cancelled) return;

        setData((previous) => ({
          ...previous,
          profile: {
            ...previous.profile,
            name: row.full_name || previous.profile.name,
            title: row.professional_title || previous.profile.title,
            heroDescription: row.short_bio || previous.profile.heroDescription,
            aboutSummary: row.long_bio || previous.profile.aboutSummary,
            location: row.location || previous.profile.location,
            email: row.email || previous.profile.email,
            profileImage: row.portrait_url || previous.profile.profileImage,
            heroVideo: row.hero_video_url || previous.profile.heroVideo,
            instagram: row.instagram_url || previous.profile.instagram
          }
        }));
      } catch (error) {
        console.error('Could not load profile from Supabase:', error);
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load projects from Supabase.
  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        const rows = await fetchPublishedProjects();
        if (cancelled || !rows?.length) return;

        const projects = rows.map((row) => ({
          id: row.id,
          slug: row.slug || '',
          title: row.title || '',
          shortDescription: row.summary || '',
          description: row.description || '',
          thumbnail: row.image_url || '',
          screenshots: row.screenshots || [],
          technologies: row.tech_stack || [],
          category: row.category || '',
          categories: row.categories || [],
          github: row.github_url || '',
          liveDemo: row.live_url || '',
          featured: Boolean(row.featured),
          status: row.status || '',
          problemStatement: row.problem_statement || '',
          solution: row.solution || '',
          features: row.features || [],
          challenges: row.challenges || '',
          learningOutcomes: row.learning_outcomes || '',
          isPublished: row.is_published,
          displayOrder: row.display_order
        }));

        setData((previous) => ({ ...previous, projects }));
      } catch (error) {
        console.error('Could not load projects from Supabase:', error);
      }
    };

    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load skills from Supabase.
  useEffect(() => {
    let cancelled = false;

    const loadSkills = async () => {
      try {
        const skills = await fetchPublicSkills();
        if (cancelled || !skills?.length) return;
        setData((previous) => ({ ...previous, skills }));
      } catch (error) {
        console.error('Could not load skills from Supabase:', error);
      }
    };

    loadSkills();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load experience, education, certifications, profiles, socials and settings.
  useEffect(() => {
    let cancelled = false;

    const loadSections = async () => {
      try {
        const sections = await fetchPublicPortfolioSections();
        if (cancelled) return;

        setData((previous) => ({
          ...previous,

          // Keep local starter content visible until the matching tables have rows.
          experience: sections.experience.length
            ? sections.experience
            : previous.experience,

          education: sections.education.length
            ? sections.education
            : previous.education,

          certifications: sections.certifications.length
            ? sections.certifications
            : previous.certifications,

          codingProfiles: sections.codingProfiles.length
            ? sections.codingProfiles
            : normalizeCodingProfiles(previous.codingProfiles),

          socials: sections.socials.length
            ? sections.socials
            : previous.socials,

          settings: {
            ...previous.settings,
            ...(sections.siteSettings || {}),
            ...(sections.currentStatus
              ? {
                  availabilityStatus: sections.currentStatus.statusText,
                  isAvailable:
                    sections.currentStatus.availability === 'available',
                  currentFocus: sections.currentStatus.currentFocus
                }
              : {})
          }
        }));

        setCloudLoaded(true);
      } catch (error) {
        console.error('Could not load portfolio sections from Supabase:', error);
      }
    };

    loadSections();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateProfile = async (profile, accessToken) => {
    await savePortfolioProfile(profile, accessToken);
    setData((previous) => ({ ...previous, profile }));
  };

  // Project state updates. The Admin page saves project changes to Supabase first.
  const addProject = (project) => {
    setData((previous) => ({
      ...previous,
      projects: [project, ...previous.projects]
    }));
  };

  const updateProject = (id, updatedProject) => {
    setData((previous) => ({
      ...previous,
      projects: previous.projects.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project
      )
    }));
  };

  const deleteProject = (id) => {
    setData((previous) => ({
      ...previous,
      projects: previous.projects.filter((project) => project.id !== id)
    }));
  };

  const toggleProjectFeatured = (id) => {
    setData((previous) => ({
      ...previous,
      projects: previous.projects.map((project) =>
        project.id === id
          ? { ...project, featured: !project.featured }
          : project
      )
    }));
  };

  const reorderProjects = (projects) => {
    setData((previous) => ({ ...previous, projects }));
  };

  // Skills

  const addSkillCategory = async (
    categoryName,
    icon = 'Code2',
    description = '',
    accessToken
  ) => {
    const saved = await saveSkillCategory(
      {
        category: categoryName,
        icon,
        description,
        displayOrder: data.skills.length,
        isVisible: true
      },
      accessToken
    );

    const category = {
      id: saved?.id,
      category: saved?.name || categoryName,
      icon: saved?.icon || icon,
      description: saved?.description || description,
      isVisible: saved?.is_visible ?? true,
      skills: []
    };

    setData((previous) => ({
      ...previous,
      skills: [...previous.skills, category]
    }));

    return category;
  };

  const deleteSkillCategory = async (categoryName, accessToken) => {
    const category = data.skills.find((item) => item.category === categoryName);
    if (!category) return;

    for (const skill of category.skills) {
      if (isUuid(skill.id)) {
        await deleteSkillFromSupabase(skill.id, accessToken);
      }
    }

    if (isUuid(category.id)) {
      await deleteSkillCategoryFromSupabase(category.id, accessToken);
    }

    setData((previous) => ({
      ...previous,
      skills: previous.skills.filter((item) => item.category !== categoryName)
    }));
  };

  const addSkill = async (categoryName, skillData, accessToken) => {
    const category = data.skills.find((item) => item.category === categoryName);
    if (!category) throw new Error('Select a skill category first.');

    const saved = await saveSkill(
      {
        ...skillData,
        categoryId: category.id,
        displayOrder: category.skills.length,
        isVisible: true
      },
      accessToken
    );

    const newSkill = {
      ...skillData,
      id: saved?.id,
      categoryId: category.id,
      isVisible: saved?.is_visible ?? true
    };

    setData((previous) => ({
      ...previous,
      skills: previous.skills.map((item) =>
        item.category === categoryName
          ? { ...item, skills: [...item.skills, newSkill] }
          : item
      )
    }));
  };

  const updateSkill = async (
    categoryName,
    skillIndex,
    updatedSkill,
    accessToken
  ) => {
    const category = data.skills.find((item) => item.category === categoryName);
    const existingSkill = category?.skills?.[skillIndex];
    if (!category || !existingSkill) return;

    const saved = await saveSkill(
      {
        ...existingSkill,
        ...updatedSkill,
        categoryId: category.id
      },
      accessToken
    );

    setData((previous) => ({
      ...previous,
      skills: previous.skills.map((item) => {
        if (item.category !== categoryName) return item;

        const skills = [...item.skills];
        skills[skillIndex] = {
          ...existingSkill,
          ...updatedSkill,
          id: saved?.id || existingSkill.id
        };

        return { ...item, skills };
      })
    }));
  };

  const deleteSkill = async (categoryName, skillIndex, accessToken) => {
    const category = data.skills.find((item) => item.category === categoryName);
    const skill = category?.skills?.[skillIndex];
    if (!category || !skill) return;

    if (isUuid(skill.id)) {
      await deleteSkillFromSupabase(skill.id, accessToken);
    }

    setData((previous) => ({
      ...previous,
      skills: previous.skills.map((item) =>
        item.category === categoryName
          ? {
              ...item,
              skills: item.skills.filter((_, index) => index !== skillIndex)
            }
          : item
      )
    }));
  };

  // Experience

  const addExperience = async (experience, accessToken) => {
    const saved = await saveExperience(
      { ...experience, displayOrder: data.experience.length },
      accessToken
    );

    setData((previous) => ({
      ...previous,
      experience: [
        { ...experience, id: saved?.id, isVisible: saved?.is_visible ?? true },
        ...previous.experience
      ]
    }));
  };

  const updateExperience = async (id, experience, accessToken) => {
    const saved = await saveExperience({ ...experience, id }, accessToken);

    setData((previous) => ({
      ...previous,
      experience: previous.experience.map((item) =>
        item.id === id
          ? { ...item, ...experience, id: saved?.id || id }
          : item
      )
    }));
  };

  const deleteExperience = async (id, accessToken) => {
    if (isUuid(id)) await deleteExperienceFromSupabase(id, accessToken);

    setData((previous) => ({
      ...previous,
      experience: previous.experience.filter((item) => item.id !== id)
    }));
  };

  // Education

  const addEducation = async (education, accessToken) => {
    const saved = await saveEducation(
      { ...education, displayOrder: data.education.length },
      accessToken
    );

    setData((previous) => ({
      ...previous,
      education: [
        { ...education, id: saved?.id, isVisible: saved?.is_visible ?? true },
        ...previous.education
      ]
    }));
  };

  const updateEducation = async (id, education, accessToken) => {
    const saved = await saveEducation({ ...education, id }, accessToken);

    setData((previous) => ({
      ...previous,
      education: previous.education.map((item) =>
        item.id === id ? { ...item, ...education, id: saved?.id || id } : item
      )
    }));
  };

  const deleteEducation = async (id, accessToken) => {
    if (isUuid(id)) await deleteEducationFromSupabase(id, accessToken);

    setData((previous) => ({
      ...previous,
      education: previous.education.filter((item) => item.id !== id)
    }));
  };

  // Certifications

  const addCertification = async (certification, accessToken) => {
    const saved = await saveCertification(
      { ...certification, displayOrder: data.certifications.length },
      accessToken
    );

    setData((previous) => ({
      ...previous,
      certifications: [
        {
          ...certification,
          id: saved?.id,
          isVisible: saved?.is_visible ?? true
        },
        ...previous.certifications
      ]
    }));
  };

  const updateCertification = async (id, certification, accessToken) => {
    const saved = await saveCertification({ ...certification, id }, accessToken);

    setData((previous) => ({
      ...previous,
      certifications: previous.certifications.map((item) =>
        item.id === id
          ? { ...item, ...certification, id: saved?.id || id }
          : item
      )
    }));
  };

  const deleteCertification = async (id, accessToken) => {
    if (isUuid(id)) await deleteCertificationFromSupabase(id, accessToken);

    setData((previous) => ({
      ...previous,
      certifications: previous.certifications.filter((item) => item.id !== id)
    }));
  };

  // Coding Profiles: keep only GitHub and LeetCode.

  const updateCodingProfiles = async (profiles, accessToken) => {
    const allowed = profiles.filter((profile) =>
      ['github', 'leetcode'].includes(
        (profile.name || profile.platform || '').toLowerCase()
      )
    );

    const savedRows = await Promise.all(
      allowed.map((profile, index) =>
        saveCodingProfile(
          { ...profile, displayOrder: index, isVisible: true },
          accessToken
        )
      )
    );

    const savedProfiles = savedRows.map((row, index) => ({
      ...allowed[index],
      id: row?.id || allowed[index].id,
      name: row?.platform || allowed[index].name,
      username: row?.username || '',
      url: row?.profile_url || '',
      icon: row?.icon || allowed[index].icon,
      badgeText: row?.stats?.badgeText || allowed[index].badgeText || ''
    }));

    setData((previous) => ({
      ...previous,
      codingProfiles: savedProfiles
    }));
  };

  // Social links.

  const updateSocials = async (socials, accessToken) => {
    const savedRows = await Promise.all(
      socials.map((social, index) =>
        saveSocialLink(
          { ...social, displayOrder: index, isVisible: true },
          accessToken
        )
      )
    );

    const savedSocials = savedRows.map((row, index) => ({
      ...socials[index],
      id: row?.id || socials[index].id,
      name: row?.platform || socials[index].name,
      label: row?.label || socials[index].label,
      handle: row?.handle || '',
      url: row?.url || '',
      icon: row?.icon || socials[index].icon
    }));

    setData((previous) => ({
      ...previous,
      socials: savedSocials
    }));
  };

  // Settings and current status.

  const updateSettings = async (newSettings, accessToken) => {
    const merged = { ...data.settings, ...newSettings };

    const {
      web3FormsAccessKey,
      contactFormEnabled,
      availabilityStatus,
      isAvailable,
      currentFocus,
      ...publicSettings
    } = merged;

    await Promise.all([
      saveSiteSettings(
        {
          ...publicSettings,
          contactEnabled: contactFormEnabled,
          contactEmail: merged.contactEmail || data.profile.email || '',
          whatsappNumber: merged.whatsappNumber || data.profile.whatsapp || ''
        },
        accessToken
      ),
      saveCurrentStatus(
        {
          statusText: availabilityStatus || '',
          availability: isAvailable ? 'available' : 'unavailable',
          currentFocus: currentFocus || '',
          isVisible: true
        },
        accessToken
      )
    ]);

    setData((previous) => ({
      ...previous,
      settings: merged
    }));
  };

  // Local reset only. It does not delete or overwrite Supabase records.
  const resetToDefaults = () => {
    const defaults = {
      profile: initialProfile,
      projects: initialProjects,
      skills: initialSkills,
      experience: initialExperience,
      education: initialEducation,
      certifications: initialCertifications,
      codingProfiles: normalizeCodingProfiles(initialCodingProfiles),
      socials: normalizeSavedSocials(initialSocials),
      settings: { ...defaultSettings }
    };

    setData(defaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        ...data,
        cloudLoaded,

        updateProfile,

        addProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        reorderProjects,

        addSkillCategory,
        deleteSkillCategory,
        addSkill,
        updateSkill,
        deleteSkill,

        addExperience,
        updateExperience,
        deleteExperience,

        addEducation,
        updateEducation,
        deleteEducation,

        addCertification,
        updateCertification,
        deleteCertification,

        updateCodingProfiles,
        updateSocials,
        updateSettings,

        resetToDefaults
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error(
      'usePortfolioData must be used within a PortfolioDataProvider'
    );
  }

  return context;
};