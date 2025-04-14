import React from "react";
import { useQuiz, QUIZ_STATES } from "../contexts/QuizContext";
import InstructionScreen from "./InstructionScreen";
import QuestionScreen from "./QuestionScreen";
import FeedbackScreen from "./FeedbackScreen";

const Dashboard = () => {
  const { quizState, isLoading, error } = useQuiz();

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render the appropriate screen based on the quiz state
  switch (quizState) {
    case QUIZ_STATES.INSTRUCTIONS:
      return <InstructionScreen />;
    case QUIZ_STATES.QUIZ:
      return <QuestionScreen />;
    case QUIZ_STATES.FEEDBACK:
      return <FeedbackScreen />;
    default:
      return <InstructionScreen />;
  }
};

export default Dashboard;
