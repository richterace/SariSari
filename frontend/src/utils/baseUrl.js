// utils/baseUrl.js
const getBaseUrl = () => {
  // Use default to localhost:5000
  return "http://localhost:5000";
};

export default getBaseUrl;

// // import.meta.env.VITE_API_URL ||


// // utils/baseUrl.js
// const getBaseUrl = () => {
//   // Check if the environment variable is defined and non-empty
//   const apiUrl = import.meta.env.VITE_API_URL;

//   // If the apiUrl is provided and valid, use it, otherwise default to localhost:5000
//   return apiUrl && apiUrl !== "http://localhost:5000" ? apiUrl : "http://localhost:5000";
// };

// export default getBaseUrl;
