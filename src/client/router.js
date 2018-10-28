import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import HomeLayout from 'containers/HomeLayout';

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" name="home" component={HomeLayout} />
      </Switch>
    </BrowserRouter>
  );
}
