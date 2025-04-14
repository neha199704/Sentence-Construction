import React from "react";

const WordOption = ({ word, isSelected, onSelect, disabled }) => {
  return (
    <button
      className={`px-4 py-2 bg-white border rounded-md shadow-sm transition-colors
        ${
          isSelected
            ? "bg-gray-100 border-primary text-primary"
            : "border-gray-300 hover:bg-gray-50"
        } 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => !disabled && onSelect(word)}
      disabled={disabled}
    >
      {word}
    </button>
  );
};

export default WordOption;
