import { Switch, Route } from 'react-router-dom';

const Article= () => (
  <div>
    <Switch>
      <Route exact path='/username' component={Profile} />
      <Route exact path='/username/:slug' component={GetArticle} />
      <Route exact path='/username/:slug/edit' component={Edit} />
      <Route exact path='/username/stories' component={Stories} />
      <Route exact path='/username/following' component={Following} />
      <Route path='*' component={NotFound} />
    </Switch>
  </div>
);

export default Article;