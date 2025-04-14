import React, { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";
import useTimer from "../hooks/useTimer";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import WordOption from "./WordOption";
import { parseQuestionText } from "../utils/helpers";

const QuestionScreen = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    selectWord,
    removeWord,
    allBlanksFilled,
    goToNextQuestion,
    getAvailableWords,
  } = useQuiz();

  const [parsedQuestion, setParsedQuestion] = useState([]);
  const TIME_PER_QUESTION = 30;

  // Set up timer
  const { time, status, startTimer, resetTimer } = useTimer(
    TIME_PER_QUESTION,
    goToNextQuestion // Auto-proceed when time ends
  );

  // Parse question when it changes
  useEffect(() => {
    if (currentQuestion) {
      setParsedQuestion(parseQuestionText(currentQuestion.question));
      resetTimer();
      startTimer();
    }
  }, [currentQuestion, resetTimer, startTimer]);

  // Get available words (not yet selected)
  const availableWords = getAvailableWords();

  // Handler for word selection
  const handleWordSelect = (word) => {
    // Find the first empty blank
    const blankElements = parsedQuestion.filter(
      (part) => part.type === "blank"
    );
    for (let i = 0; i < blankElements.length; i++) {
      if (!userAnswers[blankElements[i].index]) {
        selectWord(word, blankElements[i].index);
        break;
      }
    }
  };

  // Handler for removing a word from a blank
  const handleRemoveWord = (blankIndex) => {
    if (userAnswers[blankIndex]) {
      removeWord(blankIndex);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Timer time={time} status={status} />
        <button
          className="btn btn-secondary text-sm"
          onClick={() => goToNextQuestion()}
        >
          Quit
        </button>
      </div>

      <ProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="question-container">
        <h2 className="text-xl font-medium text-center mb-6">
          Select the missing words in the correct order
        </h2>

        <div className="text-lg leading-relaxed mb-8">
          {parsedQuestion.map((part, idx) => {
            if (part.type === "text") {
              return <span key={idx}>{part.content}</span>;
            } else {
              // It's a blank
              const word = userAnswers[part.index];
              return (
                <span
                  key={idx}
                  className={`inline-block min-w-[120px] h-8 border-b-2 border-gray-400 mx-1 text-center ${
                    word ? "border-primary text-primary cursor-pointer" : ""
                  }`}
                  onClick={() => handleRemoveWord(part.index)}
                >
                  {word || ""}
                </span>
              );
            }
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {currentQuestion.options.map((word) => {
            const isSelected = Object.values(userAnswers).includes(word);
            return (
              <WordOption
                key={word}
                word={word}
                isSelected={isSelected}
                onSelect={handleWordSelect}
                disabled={isSelected}
              />
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            onClick={goToNextQuestion}
            disabled={!allBlanksFilled()}
          >
            <span className="flex items-center">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
