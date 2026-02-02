import axios from 'axios';
import Papa from 'papaparse';

export const getCourses = async () => {
  // The 't=' parameter ensures Vercel and browsers always fetch the newest data
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSeH9R1oMJkubXANeloUhWiVQv4cUDrIeGjUIl91RR5D1BgLB2nwuqsUMIcMi4DakR6gAj7TZfgnh/pub?gid=0&single=true&output=csv&t=${new Date().getTime()}`; 
  
  try {
    const response = await axios.get(SHEET_URL);
    const parsedData = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().trim()
    });
    return parsedData.data;
  } catch (error) {
    console.error("Critical Error: Unable to fetch Google Sheet data.", error);
    return [];
  }
};