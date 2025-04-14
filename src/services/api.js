import axios from "axios";
import mockData from "../utils/mockData";

// Base URL for the JSON server
const API_URL = "http://localhost:3000";

// Function to fetch questions from the API
export const fetchQuestions = async () => {
  try {
    return mockData.data.questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};
