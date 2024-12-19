import React, { useState, useEffect } from 'react';
import PreferencesSetup from './components/PreferencesSetup';
import EditableGrid from './components/EditableGrid';
import { connectToWebDav, fetchFile, uploadFile } from './utils/ftpClient';
import { loadPreferences } from './utils/localStorage';

const App = () => {
  const [preferences, setPreferences] = useState(null);
  const [data, setData] = useState(null);
  const [client, setClient] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const prefs = loadPreferences();
    if (prefs) {
      setPreferences(prefs);
      const webdavClient = connectToWebDav(prefs);
      setClient(webdavClient);
    }
  }, []);

  const handlePreferencesSaved = () => {
    const prefs = loadPreferences();
    setPreferences(prefs);
    const webdavClient = connectToWebDav(prefs);
    setClient(webdavClient);
    setShowSettings(false); // Close settings modal after saving
  };

  const handleFetchData = async () => {
    try {
      const content = await fetchFile('/path/to/remote-file.tsv');
      console.log('File content:', content);
      setData(parseTsv(content)); // Replace with your parsing logic
    } catch (err) {
      console.error('Failed to fetch file:', err);
    }
  };
  
  const handleSaveData = async (updatedData) => {
    try {
      const content = toTsv(updatedData); // Replace with your conversion logic
      await uploadFile('/path/to/remote-file.tsv', content);
      console.log('File uploaded successfully');
    } catch (err) {
      console.error('Failed to upload file:', err);
    }
  };

  return (
    <div>
      <h1>HashGo App</h1>
      <button onClick={() => setShowSettings(true)}>Settings</button>
      {showSettings && (
        <PreferencesSetup onPreferencesSaved={handlePreferencesSaved} />
      )}
      {!showSettings && preferences && (
        <>
          <h2>Connected to WebDAV</h2>
          <button onClick={handleFetchData}>Fetch Events</button>
          {data ? (
            <EditableGrid data={data} onSave={(updatedData) => {
              const content = toTsv(updatedData);
              uploadFile(client, '/path/to/remote-file.tsv', content);
            }} />
          ) : (
            <p>No data loaded yet. Fetch events to begin editing.</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
