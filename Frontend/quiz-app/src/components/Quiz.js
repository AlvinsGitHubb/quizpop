import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

const Quiz = () => {
  const [category, setCategory] = useState(''); // Initially empty
  const [numQ, setNumQ] = useState('');
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState('');

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const createResponse = await axios.post(`http://localhost:8080/quiz/create?category=${category}&numQ=${numQ}&title=${title}`);
      const createdQuizId = createResponse.data;

      setQuizId(createdQuizId);

      const getResponse = await axios.get(`http://localhost:8080/quiz/get/${createdQuizId}`);
      setQuestions(getResponse.data);
    } catch (err) {
      setError('There was an error creating or fetching the quiz!');
      console.error('Error:', err);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId ? { ...question, selectedAnswer: answer } : question
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const responses = questions.map(question => ({
      id: question.id,
      response: question.selectedAnswer
    }));

    try {
      const submitResponse = await axios.post(`http://localhost:8080/quiz/submit/${quizId}`, responses);
      alert(`Your score is: ${submitResponse.data}`);
    } catch (err) {
      setError('There was an error submitting the quiz!');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      {questions.length === 0 ? (
        // Only one "Start Quiz" button should be here
        <form onSubmit={handleCreateQuiz}>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="java">java</option>
              <option value="python">python</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number of Questions</label>
            <input
              type="number"
              className="form-control"
              value={numQ}
              onChange={(e) => setNumQ(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Start Quiz</button>
        </form>
      ) : (
        <div>
          <h3>{title} Quiz</h3>
          <form onSubmit={handleSubmit}>
            {questions.map(question => (
              <div key={question.id}>
                <h4>{question.questionTitle}</h4>
                {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={() => handleAnswerChange(question.id, option)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit Quiz</button>
          </form>
        </div>
      )}

      {/* "Back to Home" button */}
      <Link to="/" className="btn btn-secondary">Back to Home</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Quiz;
