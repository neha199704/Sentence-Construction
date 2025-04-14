import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const InstructionScreen = () => {
  const { startQuiz, totalQuestions } = useQuiz();

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sentence Construction
      </h1>

      <div className="mb-8">
        <p className="text-center text-gray-700 mb-4">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You will be presented with {totalQuestions} sentences with blank
              spaces.
            </li>
            <li>
              For each sentence, select the correct words from the options.
            </li>
            <li>
              Click on a filled blank to remove the word if you want to change
              your answer.
            </li>
            <li>
              You have <strong>30 seconds</strong> for each question.
            </li>
            <li>
              The timer will automatically move to the next question when it
              runs out.
            </li>
            <li>
              Press "Next" when you've filled all blanks to proceed to the next
              question.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium mb-2">Time Per Question</h3>
            <p className="text-2xl font-mono">30 sec</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium mb-2">Total Questions</h3>
            <p className="text-2xl font-mono">{totalQuestions}</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium mb-2">Coins</h3>
            <p className="text-2xl font-mono">
              <span className="text-secondary text-[#FFD700] ">
                <i class="fa-solid fa-circle"></i>
              </span>{" "}
              0
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end  ">
        <button
          className="btn btn-primary bg-[#453FE1] px-4 text-white rounded-sm "
          onClick={startQuiz}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default InstructionScreen;
