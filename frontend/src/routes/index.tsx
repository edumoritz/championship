import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '../pages/Dashboard';
import MenuDrawer from '../components/Drawer';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <MenuDrawer>
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </MenuDrawer>
  </Switch>
);

export default Routes;
