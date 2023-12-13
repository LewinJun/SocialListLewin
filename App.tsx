/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import Home from './src/pages/home';
import configStore from './src/store';

function App(): React.JSX.Element {
  return (
    <Provider store={configStore({})}>
      <Home />
    </Provider>
  );
}

export default App;
