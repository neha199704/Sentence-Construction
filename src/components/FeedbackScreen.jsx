import React, { useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import { parseQuestionText } from "../utils/helpers";

const FeedbackScreen = () => {
  const { results, score, totalQuestions, restartQuiz } = useQuiz();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Toggle expanded question
  const toggleQuestion = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={restartQuiz}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-center">
            Sentence Construction
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-36 h-36 rounded-full flex items-center justify-center border-4 border-primary overflow-hidden">
            {score >= 90 ? (
              <div className="text-4xl font-bold text-primary text-green-400">
                {score}
              </div>
            ) : score >= 70 ? (
              <div className="text-4xl font-bold text-primary text-amber-400">
                {score}
              </div>
            ) : (
              <div className="text-4xl font-bold text-primary text-red-500">
                {score}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full border border-gray-200 left-1/2 transform -translate-x-1/2">
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>
        </div>

        <div className="text-center mb-8 max-w-lg">
          {score >= 90 ? (
            <p className="text-lg">
              Excellent job! Your command of sentence construction is
              outstanding. Keep up the great work!
            </p>
          ) : score >= 70 ? (
            <p className="text-lg">
              While you correctly formed several sentences, there are a couple
              of areas where improvement is needed. Pay close attention to
              sentence structure and word placement to ensure clarity and
              correctness.
            </p>
          ) : (
            <p className="text-lg">
              You have room for improvement. Focus on understanding how
              different words relate to each other in sentences, and practice
              more to develop your skills.
            </p>
          )}
        </div>

        <button
          className="btn btn-primary mb-8  bg-[#453FE1] p-4 text-white rounded-sm"
          onClick={restartQuiz}
        >
          Go to Dashboard
        </button>
      </div>

      <div className="px-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Review Your Responses</h2>

        <div className="space-y-6">
          {results.map((result, index) => {
            const isExpanded = expandedQuestion === result.questionId;
            const parsedQuestion = parseQuestionText(result.question);

            return (
              <div
                key={result.questionId}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() => toggleQuestion(result.questionId)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          result.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium">Prompt</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={
                        result.isCorrect
                          ? "text-green-600 mr-2"
                          : "text-red-600 mr-2"
                      }
                    >
                      {result.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 bg-gray-50 border-t">
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Your answer:</h3>
                      <div className="text-lg leading-relaxed">
                        {parsedQuestion.map((part, idx) => {
                          if (part.type === "text") {
                            return <span key={idx}>{part.content}</span>;
                          } else {
                            // It's a blank
                            const word = result.userAnswer[part.index];
                            const isCorrect =
                              word === result.correctAnswer[part.index];
                            return (
                              <span
                                key={idx}
                                className={`inline-block min-w-[120px] h-8 border-b-2 mx-1 text-center align-bottom ${
                                  isCorrect
                                    ? "text-green-600 border-green-600"
                                    : "text-red-600 border-red-600"
                                }`}
                              >
                                {word || ""}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>

                    {!result.isCorrect && (
                      <div>
                        <h3 className="font-medium mb-2">Correct answer:</h3>
                        <div className="text-lg leading-relaxed">
                          {parsedQuestion.map((part, idx) => {
                            if (part.type === "text") {
                              return <span key={idx}>{part.content}</span>;
                            } else {
                              // It's a blank
                              const word = result.correctAnswer[part.index];
                              return (
                                <span
                                  key={idx}
                                  className="inline-block min-w-[120px] h-8 border-b-2 mx-1 text-center align-bottom text-green-600 border-green-600"
                                >
                                  {word}
                                </span>
                              );
                            }
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;
