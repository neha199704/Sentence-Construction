/**
 * Formats a time in seconds to MM:SS format
 * @param {number} timeInSeconds - The time in seconds
 * @returns {string} - The formatted time string
 */
export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Parses a question string to identify blank spaces
 * @param {string} questionText - The question text with blank spaces
 * @returns {Array} - An array of text segments and blank indicators
 */
export const parseQuestionText = (questionText) => {
  // Make sure we're looking for the exact blank pattern
  const blankPattern = "_____________";
  const parts = questionText.split(blankPattern);

  return parts.reduce((acc, part, index) => {
    if (index === parts.length - 1) {
      return [...acc, { type: "text", content: part }];
    }
    return [
      ...acc,
      { type: "text", content: part },
      { type: "blank", index: index },
    ];
  }, []);
};

/**
 * Check if the answers match the correct answers
 * @param {Array} userAnswers - The user's answers
 * @param {Array} correctAnswers - The correct answers
 * @returns {boolean} - Whether the answers are correct
 */
export const checkAnswers = (userAnswers, correctAnswers) => {
  if (userAnswers.length !== correctAnswers.length) return false;

  return userAnswers.every((answer, index) => answer === correctAnswers[index]);
};

/**
 * Calculate the score based on correct answers
 * @param {Array} results - The results array with correct/incorrect flags
 * @returns {number} - The score as a percentage
 */
export const calculateScore = (results) => {
  const correctCount = results.filter((result) => result.isCorrect).length;
  return Math.round((correctCount / results.length) * 100);
};
