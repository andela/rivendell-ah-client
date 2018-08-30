import React from 'react';
import { PropTypes } from 'prop-types';
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
          location={location}
        />
        ))
      }
    </Switch>
  </main>
);

export default Main;
