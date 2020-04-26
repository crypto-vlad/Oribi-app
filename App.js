import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import MainNavigator from './src/navigation';
export default function App() {
  return (
    <Provider store={store}>
     <MainNavigator />
    </Provider>
  );
}