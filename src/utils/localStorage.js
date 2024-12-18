// Save preferences to local storage
export const savePreferences = (preferences) => {
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
};

// Load preferences from local storage
export const loadPreferences = () => {
  const prefs = localStorage.getItem('userPreferences');
  return prefs ? JSON.parse(prefs) : null;
};
