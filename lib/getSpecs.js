import axios from 'axios';
import Papa from 'papaparse';

/**
 * Fetches course data from a published Google Sheet CSV link.
 * @returns {Promise<Array>} Array of course objects.
 */
export const getCourses = async () => {
  // 1. YOUR PUBLISHED LINK HERE
  // Make sure you go to File > Share > Publish to web > Select "Courses" tab > Select "CSV"
// Replace your SHEET_URL line with this one:
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSeH9R1oMJkubXANeloUhWiVQv4cUDrIeGjUIl91RR5D1BgLB2nwuqsUMIcMi4DakR6gAj7TZfgnh/pub?gid=0&single=true&output=csv";  
  try {
    const response = await axios.get(SHEET_URL);
    
    // 2. PARSE CSV TO JSON
    const parsedData = Papa.parse(response.data, {
      header: true,           // Uses your first row (ID, Title, etc.) as keys
      skipEmptyLines: true,   // Prevents blank rows from breaking the UI
      transformHeader: (h) => h.toLowerCase().trim() // Forces headers to lowercase for consistency
    });

    // 3. RETURN DATA
    // This will return an array like: [{id: "1", title: "AI...", price: "Free"}, ...]
    return parsedData.data;

  } catch (error) {
    console.error("Critical Error: Unable to fetch Google Sheet data.", error);
    return []; // Return empty array so the website doesn't crash
  }
};