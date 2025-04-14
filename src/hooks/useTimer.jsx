import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for handling countdown timer
 * @param {number} initialTime - Initial time in seconds
 * @param {function} onTimeEnd - Callback function when time ends
 * @returns {Object} - Timer state and controls
 */
const useTimer = (initialTime, onTimeEnd) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Start the timer
  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume the timer
  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setTime(initialTime);
    setIsActive(false);
  }, [initialTime]);

  // Timer status
  const getStatus = useCallback(() => {
    if (time <= 5) return "danger";
    if (time <= 10) return "warning";
    return "normal";
  }, [time]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            clearInterval(interval);
            if (onTimeEnd) onTimeEnd();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, onTimeEnd]);

  return {
    time,
    isActive,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    status: getStatus(),
  };
};

export default useTimer;
