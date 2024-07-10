import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionList from './Components/QuestionList';
import CreateQuestion from './Components/CreateQuestion';
import UpdateQuestion from './Components/UpdateQuestion';

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
