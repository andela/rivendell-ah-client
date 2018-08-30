import React from 'react';
import { Switch, Route } from 'react-router-dom';
import articlesPages from '../articles';
import EditProfile from './EditProfile';
import follows from '../follows'

const { Article, UserArticles, EditArticle } = articlesPages;
const { Followers, Following } = follows;



const Profile= () => (
  <div>
    <h2>The Profile of a User</h2>
    <Switch>
      <Route exact path='/:username/:slug' component={Article} />
      <Route exact path='/:username/new-article' component={EditArticle} />
      <Route exact path='/:username/:slug/edit' component={EditArticle} />
      <Route exact path='/:username/edit' component={EditProfile} />
      <Route exact path='/:username/articles' component={UserArticles} />
      <Route exact path='/:username/following' component={Following} />
      <Route exact path='/:username/followers' component={Followers} />
    </Switch>
  </div>
);

export default Profile;