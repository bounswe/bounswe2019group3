import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ProfilePage from './ProfilePage';
import ExaminationPage from './ExaminationPage';
import GeneralTest from './GeneralTest';
import Writing from './Writing';
import Logout from './Logout';
import Messages from './Messages';
import Settings from './Settings';

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
        </Switch>
      );
  }
}

export default Routes;
