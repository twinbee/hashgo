import { createClient } from 'webdav';

// Connect to WebDAV server
export const connectToWebDav = (preferences) => {
  return createClient(preferences.serverAddress, {
    username: preferences.username,
    password: preferences.password,
  });
};

// Fetch a file from the backend
export const fetchFile = async (filePath) => {
  const response = await fetch(`http://localhost:3001/ftp/fetch?path=${encodeURIComponent(filePath)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch file');
  }
  return await response.text();
};

// Upload a file to the backend
export const uploadFile = async (filePath, content) => {
  const response = await fetch(`http://localhost:3001/ftp/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath, content }),
  });
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return await response.json();
};