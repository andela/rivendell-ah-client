import React from 'react';
import { Switch, Route } from 'react-router-dom';
import articlesPages from '../articles'; 
import authPages from '../auth';
const { AuthRoute } = authPages;

const { Article, UserArticles, EditArticle, NewArticle } = articlesPages;

const UserArticle = () => (
  <div>
    <Switch>
      <Route exact path='/articles' component={UserArticles} /> 
      <AuthRoute exact path='/articles/new' component={NewArticle} />
      <Route exact path='/articles/:slug' component={Article} />
      <AuthRoute exact path='/articles/:slug/edit' component={EditArticle} />
    </Switch>
  </div>
);

export default UserArticle;