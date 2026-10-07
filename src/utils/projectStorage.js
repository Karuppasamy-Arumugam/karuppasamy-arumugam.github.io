import { getSupabaseConfig } from './supabaseConfig';

const BUCKET = 'portfolio-media';
const IMAGE_FOLDER = 'projects';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const uploadImage = async (file, accessToken, imageType) => {
  if (!file) {
    throw new Error('Choose an image file first.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Choose an image file such as JPG, PNG, or WebP.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('The image must be smaller than 5 MB.');
  }

  if (!accessToken) {
    throw new Error('Please sign in again before uploading an image.');
  }

  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    throw new Error('Supabase URL or publishable key is missing.');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const objectPath = `${IMAGE_FOLDER}/${crypto.randomUUID()}.${extension}`;
  const encodedPath = objectPath
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

  const response = await fetch(
    `${url}/storage/v1/object/${BUCKET}/${encodedPath}`,
    {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': file.type,
        'x-upsert': 'false'
      },
      body: file
    }
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Could not upload the ${imageType}.`
    );
  }

  return `${url}/storage/v1/object/public/${BUCKET}/${encodedPath}`;
};

export const uploadProjectImage = (file, accessToken) =>
  uploadImage(file, accessToken, 'project image');

export const uploadProfileImage = (file, accessToken) =>
  uploadImage(file, accessToken, 'profile image');