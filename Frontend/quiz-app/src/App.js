import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';

function App() {
  return (
    <Router>
      <div className="container">
        <h2 className="text-center">Quiz Application</h2>
        <Switch>
          <Route path="/" exact component={QuestionList} />
          <Route path="/add" component={CreateQuestion} />
          <Route path="/edit/:id" component={UpdateQuestion} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
