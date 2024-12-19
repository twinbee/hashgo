import React, { useState } from 'react';
import { savePreferences, loadPreferences } from '../utils/localStorage';

const PreferencesSetup = ({ onPreferencesSaved }) => {
  const existingPrefs = loadPreferences() || {
    serverAddress: '',
    port: 21,
    username: '',
    password: '',
    nickname: '',
  };
  const [form, setForm] = useState(existingPrefs);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePreferences(form);
    onPreferencesSaved();
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', maxWidth: '400px' }}>
      <h2>Edit Preferences</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="serverAddress"
          placeholder="FTP Server Address"
          value={form.serverAddress}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="port"
          placeholder="Port"
          value={form.port}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="Nickname (optional)"
          value={form.nickname}
          onChange={handleChange}
        />
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesSetup;
