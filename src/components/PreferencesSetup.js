
import React, { useState } from 'react';
import { savePreferences } from '../utils/localStorage';

const PreferencesSetup = ({ onPreferencesSaved }) => {
  const [form, setForm] = useState({
    serverAddress: '',
    port: 21,
    username: '',
    password: '',
    nickname: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePreferences(form);
    onPreferencesSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Setup Preferences</h2>
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
  );
};

export default PreferencesSetup;
