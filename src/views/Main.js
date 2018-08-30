import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import authPages from './auth';
import Profile from './profile/Profile';
import SubcategoryArticles from './subcategory/SubcategoryArticles';
import NotFound from './NotFound'

const { Signup, Login } = authPages;

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='user/:username' component={Profile} />
      <Route exact path='subcategory/:subcategory' component={SubcategoryArticles} />
      <Route path='*' component={NotFound} />
    </Switch>
  </main>
);

export default Main;