import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Switch } from 'react-router-dom';
import routes from './app.routes';
import MapComponent from './components/map';
import CopyrightComponent from './components/copyright';

const App = ({ history }) => {
  return (
    <div id="app">
      <MapComponent history={history} />
      <Switch>
        {renderRoutes(routes)}
      </Switch>
      <CopyrightComponent/>
    </div>
  );
};

export default App;
