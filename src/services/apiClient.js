import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchRepos = (query) => {
    if (!query) {
        return Promise.reject(new Error("Search query cannot be empty."));
    }
    return apiClient.get(`/search?q=${encodeURIComponent(query)}`);
};

export const getAnalysisData = (owner, repoName) => {
    if (!owner || !repoName) {
        return Promise.reject(new Error("Owner and repoName are required."));
    }
    return apiClient.get(`/analyze/${owner}/${repoName}`);
};

export const getOverallSummary = (owner, repoName, readme, repoData) => {
    if (!owner || !repoName) {
        return Promise.reject(new Error("Owner and repoName are required."));
    }
    const payload = {
        readme: readme, // Send null or string as received
        repo_data: repoData || {}, // Send empty object if null/undefined
    };
    return apiClient.post(`/summarize/overall/${owner}/${repoName}`, payload);
};

export const summarizeItem = (owner, repoName, itemType, itemNumber, itemContext) => {
    if (!owner || !repoName || !itemType || !itemNumber || !itemContext) {
        return Promise.reject(new Error("Missing required parameters for item summary."));
    }
    return apiClient.post(`/summarize/item/${owner}/${repoName}/${itemType}/${itemNumber}`, itemContext);
};

export const analyzeError = (owner, repoName, errorMessage, issues, dependencies) => {
     if (!owner || !repoName || !errorMessage) {
        return Promise.reject(new Error("Missing required parameters for error analysis."));
    }
    const payload = {
        error_message: errorMessage,
        issues: issues || [],
        dependencies: dependencies || [],
    };
    return apiClient.post(`/analyze/error/${owner}/${repoName}`, payload);
};

// Generic error handler 
// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle specific error codes globally if desired
//     console.error("API call failed:", error.response || error.message);
//     return Promise.reject(error);
//   }
// );

export default apiClient; 