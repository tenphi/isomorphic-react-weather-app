import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ staticContext = {} }) => {
  staticContext.status = 404;

  return <div>
    <div>
      <NavLink to="/">Back Home</NavLink>
    </div>
    Oops, something went wrong!
  </div>;
};
