import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      questionTitle,
      option1,
      option2,
      option3,
      option4,
      rightAnswer,
      difficultyLevel,
      category,
    };

    axios.post('http://localhost:8080/question/add', newQuestion)
      .then(response => {
        console.log('Question created:', response.data);
        navigate('/'); // Redirect to the question list
      })
      .catch(error => {
        console.error('There was an error creating the question!', error);
      });
  };

  return (
    <div>
      <h3>Add New Question</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Question Title</label>
          <input type="text" className="form-control" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Option 1</label>
          <input type="text" className="form-control" value={option1} onChange={(e) => setOption1(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Option 2</label>
          <input type="text" className="form-control" value={option2} onChange={(e) => setOption2(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Option 3</label>
          <input type="text" className="form-control" value={option3} onChange={(e) => setOption3(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Option 4</label>
          <input type="text" className="form-control" value={option4} onChange={(e) => setOption4(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Right Answer</label>
          <input type="text" className="form-control" value={rightAnswer} onChange={(e) => setRightAnswer(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Difficulty Level</label>
          <input type="text" className="form-control" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
