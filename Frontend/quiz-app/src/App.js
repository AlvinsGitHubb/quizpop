import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import Quiz from './components/Quiz';
import './App.css';

function App() {
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
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
          <Link to="/quiz/1" className="btn btn-primary">Start Quiz</Link> {/* Adjust quiz ID as needed */}
        </div>
      </div>
    </Router>
  );
}

export default App;
