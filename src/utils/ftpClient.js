import { createClient } from 'webdav';

// Connect to WebDAV server
export const connectToWebDav = (preferences) => {
  return createClient(preferences.serverAddress, {
    username: preferences.username,
    password: preferences.password,
  });
};

// Fetch a file
export const fetchFile = async (client, filePath) => {
  try {
    const content = await client.getFileContents(filePath, { format: 'text' });
    return content;
  } catch (err) {
    console.error('Error fetching file:', err);
    throw err;
  }
};

// Upload a file
export const uploadFile = async (client, filePath, content) => {
  try {
    await client.putFileContents(filePath, content, { overwrite: true });
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};
