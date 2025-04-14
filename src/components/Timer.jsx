import React, { useEffect } from "react";
import { formatTime } from "../utils/helpers";

const Timer = ({ time, status, onTimeEnd }) => {
  useEffect(() => {
    if (time === 0 && onTimeEnd) {
      onTimeEnd();
    }
  }, [time, onTimeEnd]);

  // Apply different styling based on time remaining
  const getTimerClass = () => {
    if (status === "danger") return "timer-danger font-bold";
    if (status === "warning") return "timer-warning font-semibold";
    return "text-gray-700";
  };

  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-mono">
        <span className={getTimerClass()}>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Timer;
