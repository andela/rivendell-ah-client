import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import authPages from './auth';
import UserRoute from './user/UserRoute';
import ArticleRoute from './articles/ArticleRoutes';
import subcategoryPages from './subcategory';
import NotFound from './NotFound';

const { Signup, Login } = authPages;
const {Article, SubcategoryArticles} =subcategoryPages;

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route path='/articles' component={ArticleRoute} />
      <Route path='/@:username' component={UserRoute} />
      <Route exact path='/:subcategory' component={SubcategoryArticles} />
      <Route exact path='/:subcategory/:slug' component={Article} />
      <Route path='*' component={NotFound} />
    </Switch>
  </main>
);

export default Main;