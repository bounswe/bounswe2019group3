import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import ProfilePage from './containers/ProfilePage';
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={SignUp} />        
        <Route path='/profile' component={ProfilePage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
      </Switch>
    );
  }
}

export default Routes;
