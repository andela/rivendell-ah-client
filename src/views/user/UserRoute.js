import React from 'react';
import { Switch, Route } from 'react-router-dom';
import profilePages from '../user';
import authPages from '../auth';
const { AuthRoute } = authPages;
const { EditProfile, Profile,Followers, Following } = profilePages;

const User = () => (
  <div>
    <Switch>
      <Route exact path='/:username' component={Profile} />
      <AuthRoute exact path='/:username/edit' component={EditProfile} />
      <Route exact path='/:username/following' component={Following} />
      <Route exact path='/:username/followers' component={Followers} />
    </Switch>
  </div>
);

export default User;