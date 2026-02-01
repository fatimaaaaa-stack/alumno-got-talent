import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const fetchCourses = async () => {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSeH9R1oMJkubXANeloUhWiVQv4cUDrIeGjUIl91RR5D1BgLB2nwuqsUMIcMi4DakR6gAj7TZfgnh/pubhtml?gid=0&single=true";
  const response = await axios.get(SHEET_URL);
  const parsedData = Papa.parse(response.data, { header: true });
  return parsedData.data; // This is now an array of your courses!
};