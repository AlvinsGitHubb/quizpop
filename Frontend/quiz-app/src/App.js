import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h2 className="text-center">Quiz Application</h2>
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/add" element={<CreateQuestion />} />
          <Route path="/edit/:id" element={<UpdateQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
