import React from 'react';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import store from './store';
import Router from './router';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <Router />
        </IntlProvider>
      </Provider>
    );
  }
}

export default hot(module)(App);
