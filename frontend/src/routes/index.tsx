import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

import MenuDrawer from '../components/Drawer';
import Dashboard from '../pages/Dashboard';
import Scores from '../pages/Scores';
import Game from '../pages/Game';
import Championship from '../pages/Championship';
import ViewChampionship from '../pages/ViewChampionship';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <MenuDrawer>
      <Route path="/scores" component={Scores} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/game" component={Game} isPrivate />
      <Route path="/championship" component={Championship} isPrivate />
      <Route path="/view-championship" component={ViewChampionship} isPrivate />
    </MenuDrawer>
  </Switch>
);

export default Routes;
