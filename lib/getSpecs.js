import axios from 'axios';
import Papa from 'papaparse';

// Base URL for your published Google Sheet
const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSeH9R1oMJkubXANeloUhWiVQv4cUDrIeGjUIl91RR5D1BgLB2nwuqsUMIcMi4DakR6gAj7TZfgnh/pub";

/**
 * Generic fetcher that targets a specific tab using its GID.
 * The 't=' param ensures we bypass Vercel/Browser cache for real-time updates.
 */
const fetchSheetTab = async (gid) => {
  const url = `${BASE_URL}?gid=${gid}&single=true&output=csv&t=${new Date().getTime()}`;
  try {
    const response = await axios.get(url);
    const parsedData = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().trim()
    });
    return parsedData.data;
  } catch (error) {
    console.error(`Critical Error: Unable to fetch tab ${gid}`, error);
    return [];
  }
};

// 1. Fetch Course Catalog (GID 0 is usually the first tab)
export const getCourses = () => fetchSheetTab("0");

// 2. Fetch Teacher Applications (Replace with your actual GID)
export const getApplications = () => fetchSheetTab("1019708412"); 

// 3. Fetch Student Enrollments (Replace with your actual GID)
export const getEnrollments = () => fetchSheetTab("823456789");