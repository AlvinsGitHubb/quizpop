import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('There was an error fetching the questions!', error));
  }, []);

  const deleteQuestion = (id) => {
    axios.delete(`http://localhost:8080/questions/${id}`)
      .then(response => setQuestions(questions.filter(question => question.id !== id)))
      .catch(error => console.error('There was an error deleting the question!', error));
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
              <td>{question.questionText}</td>
              <td>{question.options.join(', ')}</td>
              <td>{question.answer}</td>
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
