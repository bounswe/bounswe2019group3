import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ProfilePage from './ProfilePage';
import ExaminationPage from './ExaminationPage';
import EnglishTest from './EnglishTest';
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={SignUp} />        
        <Route path='/profile' component={ProfilePage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/exam' component={ExaminationPage} />
        <Route path='/english' component={EnglishTest} />
      </Switch>
    );
  }
}

export default Routes;
