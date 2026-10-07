const DEFAULT_BUCKET = 'resumes';
const METADATA_OBJECT = 'latest.json';

const getConfig = () => {
  const url = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/$/, '');
  const key = (
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ''
  ).trim();
  const bucket = (import.meta.env.VITE_RESUME_BUCKET || DEFAULT_BUCKET).trim();

  return { url, key, bucket };
};

const encodeObjectPath = (path) =>
  path
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

const getPublicObjectUrl = (path) => {
  const { url, bucket } = getConfig();
  return `${url}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`;
};

export const isResumeCloudConfigured = () => {
  const { url, key, bucket } = getConfig();
  return Boolean(url && key && bucket);
};

export const getResumeMetadata = async () => {
  if (!isResumeCloudConfigured()) return null;

  const response = await fetch(
    `${getPublicObjectUrl(METADATA_OBJECT)}?v=${Date.now()}`,
    { cache: 'no-store' }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Unable to read current resume metadata (${response.status}).`);
  }

  const metadata = await response.json();

  if (!metadata?.path) return null;

  return {
    ...metadata,
    publicUrl: `${getPublicObjectUrl(metadata.path)}?download=${encodeURIComponent(
      metadata.fileName || 'Karuppasamy-A-Resume.pdf'
    )}&v=${encodeURIComponent(metadata.updatedAt || Date.now())}`
  };
};

const uploadObject = async ({ path, body, contentType, accessToken, upsert = false }) => {
  const { url, key, bucket } = getConfig();

  const response = await fetch(
    `${url}/storage/v1/object/${encodeURIComponent(bucket)}/${encodeObjectPath(path)}`,
    {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': contentType,
        'cache-control': '3600',
        'x-upsert': upsert ? 'true' : 'false'
      },
      body
    }
  );

  if (!response.ok) {
    let detail = '';
    try {
      const payload = await response.json();
      detail = payload?.message || payload?.error || payload?.statusCode || '';
    } catch {
      detail = await response.text().catch(() => '');
    }

    throw new Error(
      detail
        ? `Resume storage error: ${detail}`
        : `Resume storage request failed (${response.status}).`
    );
  }

  return response.json().catch(() => ({}));
};

export const uploadResumeToCloud = async (file, accessToken) => {
  if (!isResumeCloudConfigured()) {
    throw new Error('Supabase resume storage is not configured.');
  }

  if (!accessToken) {
    throw new Error('Your admin session is missing. Please sign in again.');
  }

  if (!file) {
    throw new Error('Please choose a PDF file first.');
  }

  const timestamp = new Date().toISOString();
  const safeStamp = timestamp.replace(/[-:.TZ]/g, '').slice(0, 14);
  const objectPath = `Karuppasamy-A-Resume-${safeStamp}.pdf`;

  await uploadObject({
    path: objectPath,
    body: file,
    contentType: 'application/pdf',
    accessToken,
    upsert: false
  });

  const metadata = {
    path: objectPath,
    fileName: file.name || 'Karuppasamy-A-Resume.pdf',
    updatedAt: timestamp,
    size: file.size || 0
  };

  const metadataBlob = new Blob(
    [JSON.stringify(metadata, null, 2)],
    { type: 'application/json' }
  );

  await uploadObject({
    path: METADATA_OBJECT,
    body: metadataBlob,
    contentType: 'application/json',
    accessToken,
    upsert: true
  });

  return {
    ...metadata,
    publicUrl: `${getPublicObjectUrl(objectPath)}?download=${encodeURIComponent(
      metadata.fileName
    )}&v=${encodeURIComponent(timestamp)}`
  };
};

export const getLatestResumeUrl = async () => {
  const metadata = await getResumeMetadata();
  return metadata?.publicUrl || null;
};
