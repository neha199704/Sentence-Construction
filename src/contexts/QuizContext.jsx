import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchQuestions } from "../services/api";
import { checkAnswers, calculateScore } from "../utils/helpers";

// Create context
const QuizContext = createContext();

// Quiz states
export const QUIZ_STATES = {
  LOADING: "loading",
  INSTRUCTIONS: "instructions",
  QUIZ: "quiz",
  FEEDBACK: "feedback",
};

export const QuizProvider = ({ children }) => {
  // State for quiz flow
  const [quizState, setQuizState] = useState(QUIZ_STATES.LOADING);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  // Fetch questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchQuestions();
        setQuestions(data);
        setQuizState(QUIZ_STATES.INSTRUCTIONS);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex] || null;

  // Start quiz
  const startQuiz = useCallback(() => {
    setQuizState(QUIZ_STATES.QUIZ);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults([]);
  }, []);

  // Handle selecting a word
  const selectWord = useCallback((word, blankIndex) => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };

      // If this word is already selected in another blank, remove it
      Object.keys(newAnswers).forEach((key) => {
        if (newAnswers[key] === word) {
          delete newAnswers[key];
        }
      });

      // Add the word to the current blank
      newAnswers[blankIndex] = word;

      return newAnswers;
    });
  }, []);

  // Remove a word from a blank
  const removeWord = useCallback((blankIndex) => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[blankIndex];
      return newAnswers;
    });
  }, []);

  // Check if all blanks are filled for current question
  const allBlanksFilled = useCallback(() => {
    if (!currentQuestion) return false;

    // Count how many blanks should be in the question
    const blankCount = currentQuestion.correctAnswer.length;

    // Check if we have that many answers
    return Object.keys(userAnswers).length === blankCount;
  }, [currentQuestion, userAnswers]);

  // Process user answers for current question
  const processCurrentAnswer = useCallback(() => {
    if (!currentQuestion) return;

    // Create an array of user answers in order
    const answersArray = [];
    for (let i = 0; i < currentQuestion.correctAnswer.length; i++) {
      answersArray.push(userAnswers[i] || null);
    }

    // Check if answers are correct
    const isCorrect = checkAnswers(answersArray, currentQuestion.correctAnswer);

    // Add result
    setResults((prev) => [
      ...prev,
      {
        questionId: currentQuestion.questionId,
        isCorrect,
        userAnswer: answersArray,
        correctAnswer: currentQuestion.correctAnswer,
        question: currentQuestion.question,
      },
    ]);

    return isCorrect;
  }, [currentQuestion, userAnswers]);

  // Move to next question
  const goToNextQuestion = useCallback(() => {
    processCurrentAnswer();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setUserAnswers({});
    } else {
      // If it's the last question, show the feedback screen
      finishQuiz();
    }
  }, [currentQuestionIndex, questions.length, processCurrentAnswer]);

  // Finish the quiz
  const finishQuiz = useCallback(() => {
    // Process the last answer if not already processed
    if (results.length < questions.length) {
      processCurrentAnswer();
    }

    // Calculate score
    const finalScore = calculateScore(results);
    setScore(finalScore);

    // Change state to feedback
    setQuizState(QUIZ_STATES.FEEDBACK);
  }, [processCurrentAnswer, questions.length, results]);

  // Restart the quiz
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults([]);
    setQuizState(QUIZ_STATES.INSTRUCTIONS);
  }, []);

  // Get available words (not yet selected)
  const getAvailableWords = useCallback(() => {
    if (!currentQuestion) return [];

    const selectedWords = Object.values(userAnswers);
    return currentQuestion.options.filter(
      (word) => !selectedWords.includes(word)
    );
  }, [currentQuestion, userAnswers]);

  // Value object for the provider
  const value = {
    quizState,
    questions,
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    results,
    isLoading,
    error,
    score,
    totalQuestions: questions.length,
    startQuiz,
    selectWord,
    removeWord,
    allBlanksFilled,
    goToNextQuestion,
    finishQuiz,
    restartQuiz,
    getAvailableWords,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook for accessing the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export default QuizContext;
