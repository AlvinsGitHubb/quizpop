import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';  // No need to import BrowserRouter here
import QuestionList from './components/QuestionList';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const location = useLocation();  // Now we can use useLocation here because the App is wrapped in Router in index.js

  return (
    <div className="App">
      <header className="App-header">
        <h2>Quiz Application</h2>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/add" element={<CreateQuestion />} />
          <Route path="/edit/:id" element={<UpdateQuestion />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
      
      {/* Only show the Start Quiz button on the home page ("/") */}
      {location.pathname === "/" && (
        <Link to="/quiz" className="btn btn-primary">Start Quiz</Link>
      )}
    </div>
  );
}

export default App;
