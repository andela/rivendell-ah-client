import { Switch, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/article' component={Article} />
      <Route path='*' component={NotFound} />
    </Switch>
  </main>
);

export default Main;