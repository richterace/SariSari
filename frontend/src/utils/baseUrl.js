// utils/baseUrl.js
const getBaseUrl = () => {
  // Use env var if provided, otherwise default to localhost:5000
  return import.meta.env.VITE_API_URL || "http://localhost:5000";
};

export default getBaseUrl;
