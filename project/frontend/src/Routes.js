import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ProfilePage from './ProfilePage';
import ExaminationPage from './ExaminationPage';
import GeneralTest from './GeneralTest';
import Writing from './Writing';
import writings from './writings';
import writingsRead from './writingsRead'
import Logout from './Logout';
import Messages from './Messages';
import Settings from './Settings';
import UserProfile from './UserProfile';
import Search from './Search';
import SearchResult from './SearchResult'
import ExerciseList from './ExerciseList'
import Exercises from './Exercises'
import Exercise from './Exercise'
import progress from './Progress'

import SendExercise from './SendExercise'

class Routes extends React.Component {

  

  render() {
    
    return (
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/exam' component={ExaminationPage} />
          <Route path='/generalTest' component={GeneralTest} />
          <Route path='/writing' component={Writing} />
          <Route path='/logout' component={Logout} />
          <Route path='/messages' component={Messages} />
          <Route path='/settings' component={Settings} />
          <Route path='/user' component={UserProfile} />
          <Route path='/search' component={Search} />
          <Route path='/searchResult' component = {SearchResult} />
          <Route path='/exerciseList' component = {ExerciseList} />
          <Route path='/exercises' component = {Exercises} />
          <Route path='/exercise' component = {Exercise} />
          <Route path='/progress' component = {progress} />
          <Route path='/writingsList' component = {writings} />
          <Route path='/writings' component = {writingsRead} />
          <Route path='/sendexercise' component = {SendExercise} />
        </Switch>
      );
  }
}

export default Routes;
