import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import QuestionList from './Components/QuestionList';
import CreateQuestion from './Components/CreateQuestion';
import UpdateQuestion from './Components/UpdateQuestion';
import Quiz from './Components/Quiz';
import './App.css';

function App() {
  const location = useLocation(); // Get the current location (URL)

  return (
    <Router>
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
    </Router>
  );
}

export default App;
