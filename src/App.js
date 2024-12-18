
import React, { useState, useEffect } from 'react';
import PreferencesSetup from './components/PreferencesSetup';
import EditableGrid from './components/EditableGrid';
import { connectToWebDav, fetchFile, uploadFile } from './utils/ftpClient';
import { loadPreferences } from './utils/localStorage';

const App = () => {
  const [preferences, setPreferences] = useState(null);
  const [data, setData] = useState(null);
  const [client, setClient] = useState(null);

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
  };

  const handleFetchData = async () => {
    try {
      const content = await fetchFile(client, '/path/to/remote-file.tsv');
      setData(parseTsv(content));
    } catch (err) {
      console.error('Failed to fetch file:', err);
    }
  };

  const handleSaveData = async (updatedData) => {
    try {
      const content = toTsv(updatedData);
      await uploadFile(client, '/path/to/remote-file.tsv', content);
    } catch (err) {
      console.error('Failed to save file:', err);
    }
  };

  return (
    <div>
      {!preferences ? (
        <PreferencesSetup onPreferencesSaved={handlePreferencesSaved} />
      ) : (
        <>
          <button onClick={handleFetchData}>Fetch Events</button>
          {data && <EditableGrid data={data} onSave={handleSaveData} />}
        </>
      )}
    </div>
  );
};

export default App;
