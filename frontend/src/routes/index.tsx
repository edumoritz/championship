import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

import MenuDrawer from '../components/Drawer';
import Dashboard from '../pages/Dashboard';
import Scores from '../pages/Scores';
import Player from '../pages/Player';
import Game from '../pages/Game';
import Championship from '../pages/Championship';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <MenuDrawer>
      <Route path="/scores" component={Scores} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/player" component={Player} isPrivate />
      <Route path="/game" component={Game} isPrivate />
      <Route path="/championship" component={Championship} isPrivate />
    </MenuDrawer>
  </Switch>
);

export default Routes;
