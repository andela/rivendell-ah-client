import React from 'react';
import { Switch } from 'react-router-dom';
import routes from '../configs/routes';

const Main = () => (
  <main>
    <Switch>
      {
        routes.map(route => (<route.type
          key={route.id}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
        ))
      }
    </Switch>
  </main>
);

export default Main;
