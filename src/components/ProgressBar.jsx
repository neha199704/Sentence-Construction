import React from "react";

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // Create an array representing each question
  const questionDots = Array.from({ length: totalQuestions }, (_, index) => {
    const status =
      index === currentQuestion
        ? "current"
        : index < currentQuestion
        ? "completed"
        : "upcoming";

    return { index, status };
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">
          Question {currentQuestion + 1}/{totalQuestions}
        </div>
      </div>

      <div className="flex space-x-1">
        {questionDots.map((dot) => (
          <div
            key={dot.index}
            className={`h-1 flex-1 rounded-full ${
              dot.status === "completed"
                ? "bg-[#F2A531]"
                : dot.status === "current"
                ? "bg-gray-400"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
