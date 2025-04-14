import React from "react";
import { QuizProvider } from "./contexts/QuizContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <QuizProvider>
        <Dashboard />
      </QuizProvider>
    </div>
  );
}

export default App;
