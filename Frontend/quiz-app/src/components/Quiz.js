import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams(); // Get quiz ID from URL parameters
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/quiz/get/${id}`)
      .then(response => {
        setQuestions(response.data); // Adjust based on your response structure
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responses = questions.map(question => ({
      id: question.id,
      response: userAnswers[question.id]
    }));
    axios.post(`http://localhost:8080/quiz/submit/${id}`, responses)
      .then(response => {
        setScore(response.data);
        setIsSubmitted(true);
      })
      .catch(error => {
        console.error('There was an error submitting the quiz!', error);
      });
  };

  if (isSubmitted) {
    return (
      <div>
        <h2>Your Score: {score}/{questions.length}</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Quiz</h3>
      <form onSubmit={handleSubmit}>
        {questions.map(question => (
          <div key={question.id}>
            <h4>{question.questionTitle}</h4>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={question.option1}
                  onChange={() => handleAnswerChange(question.id, question.option1)}
                />
                {question.option1}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={question.option2}
                  onChange={() => handleAnswerChange(question.id, question.option2)}
                />
                {question.option2}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={question.option3}
                  onChange={() => handleAnswerChange(question.id, question.option3)}
                />
                {question.option3}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={question.option4}
                  onChange={() => handleAnswerChange(question.id, question.option4)}
                />
                {question.option4}
              </label>
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit Quiz</button>
      </form>
    </div>
  );
};

export default Quiz;
