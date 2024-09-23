import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

const UpdateQuestion = () => {
  const { id } = useParams();  // Extract the question ID from the URL
  const [question, setQuestion] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the question by ID from the backend
    axios.get(`http://localhost:8080/question/${id}`)
      .then(response => {
        setQuestion(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching question:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes to update the question object state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prevQuestion => ({
      ...prevQuestion,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/question/${id}`, question)
      .then(response => {
        alert('Question updated successfully!');
      })
      .catch(error => {
        console.error('Error updating question:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Question Title:
            <input
              type="text"
              name="questionTitle"
              value={question.questionTitle}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Option 1:
            <input
              type="text"
              name="option1"
              value={question.option1}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Option 2:
            <input
              type="text"
              name="option2"
              value={question.option2}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Option 3:
            <input
              type="text"
              name="option3"
              value={question.option3}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Option 4:
            <input
              type="text"
              name="option4"
              value={question.option4}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Right Answer:
            <input
              type="text"
              name="rightAnswer"
              value={question.rightAnswer}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Update Question</button>
      </form>
      {/* "Back to Home" button */}
      <Link to="/" className="btn btn-secondary">Home</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateQuestion;
