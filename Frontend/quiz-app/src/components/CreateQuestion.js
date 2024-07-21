import React, { useState } from 'react';
import axios from 'axios';

const CreateQuestion = (props) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = { questionText, options, answer };
    axios.post('http://localhost:8080/question/add', question)
      .then(response => {
        props.history.push('/');
      })
      .catch(error => console.error('There was an error creating the question!', error));
  };

  return (
    <div>
      <h3>Create Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question Text:</label>
          <input type="text" className="form-control" value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </div>
        {options.map((option, index) => (
          <div key={index} className="form-group">
            <label>Option {index + 1}:</label>
            <input type="text" className="form-control" value={option} onChange={e => handleOptionChange(index, e.target.value)} />
          </div>
        ))}
        <div className="form-group">
          <label>Answer:</label>
          <input type="text" className="form-control" value={answer} onChange={e => setAnswer(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
