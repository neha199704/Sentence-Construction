import axios from "axios";

// Base URL for the JSON server
const API_URL = "http://localhost:3000";

// Function to fetch questions from the API
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);

    // Check if the response contains the required data structure
    if (
      response.data &&
      response.data.status === "SUCCESS" &&
      response.data.data &&
      Array.isArray(response.data.data.questions)
    ) {
      return response.data.data.questions;
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);

    // If we're in development mode, return mock data as fallback
    if (import.meta.env.DEV) {
      const mockData = await import("../utils/mockData").then(
        (module) => module.default
      );
      console.log("Using mock data instead");
      return mockData.data.questions;
    }

    throw error;
  }
};
