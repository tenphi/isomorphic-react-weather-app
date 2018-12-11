import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';
import routes from './app.routes';

const App = () => {

  return (
    <div className="app">
      Demo of the React Weather App
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </div>
  );
};

export default App;
