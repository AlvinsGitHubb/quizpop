import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateQuestion = (props) => {
  const [question, setQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    answer: ''
  });

  const { id } = props.match.params;

  useEffect(() => {
    axios.get(`http://localhost:8080/question/${id}`)
      .then(response => setQuestion(response.data))
      .catch(error => console.error('There was an error fetching the question!', error));
  }, [id]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/question/${id}`, question)
      .then(response => {
        props.history.push('/');
      })
      .catch(error => console.error('There was an error updating the question!', error));
  };

  return (
    <div>
      <h3>Update Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <input type="text" className="form-control" value={question.questionText} onChange={e => setQuestion({ ...question, questionText: e.target.value })} />
        </div>
        {question.options.map((option, index) => (
          <div key={index} className="form-group">
            <label>Option {index + 1}:</label>
            <input type="text" className="form-control" value={option} onChange={e => handleOptionChange(index, e.target.value)} />
          </div>
        ))}
        <div className="form-group">
          <label>Answer:</label>
          <input type="text" className="form-control" value={question.answer} onChange={e => setQuestion({ ...question, answer: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
