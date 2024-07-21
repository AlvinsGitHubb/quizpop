import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  // Declare state for questions
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the backend when the component mounts
  useEffect(() => {
    console.log('Fetching questions...');
    axios.get('http://localhost:8080/question/allQuestions')
      .then(response => {
        console.log('Questions fetched:', response.data);
        // Update state with fetched questions
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Function to delete a question
  const deleteQuestion = (id) => {
    axios.delete(`http://localhost:8080/question/${id}`)
      .then(response => {
        console.log('Question deleted:', id);
        // Update state to remove deleted question
        setQuestions(questions.filter(question => question.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the question!', error);
      });
  };

  return (
    <div>
      <h3>Question List</h3>
      <Link to="/add" className="btn btn-primary">Add Question</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Question Text</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {questions.map(question => (
            <tr key={question.id}>
              <td>{question.questionTitle}</td>
              <td>{[question.option1, question.option2, question.option3, question.option4].join(', ')}</td>
              <td>{question.rightAnswer}</td>
              <td>
                <Link to={`/edit/${question.id}`} className="btn btn-primary">Edit</Link>
                <button onClick={() => deleteQuestion(question.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
