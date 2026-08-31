/**
 * API Configuration
 * 
 * This module builds the API base URL using Vite environment variables.
 * VITE_CODESPACE_NAME must be defined in .env.local or .env file:
 *   VITE_CODESPACE_NAME=your-codespace-name
 * 
 * If VITE_CODESPACE_NAME is set, the API will use:
 *   https://{VITE_CODESPACE_NAME}-8000.app.github.dev
 * 
 * Otherwise, it will fall back to:
 *   http://localhost:8000
 */

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Using localhost fallback. ' +
      'For Codespaces, define VITE_CODESPACE_NAME in .env.local'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Fetch data from an API endpoint
 * @param {string} endpoint - The endpoint path (e.g., 'users', 'activities')
 * @returns {Promise<Array>} Array of items from the API
 */
export async function fetchFromApi(endpoint) {
  try {
    const url = `${API_BASE_URL}/api/${endpoint}/`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated and array responses
    if (data.items && Array.isArray(data.items)) {
      return data.items;
    }
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching from /${endpoint}:`, error);
    return [];
  }
}
