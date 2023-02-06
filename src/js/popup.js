import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './app/app-context';
import App from './app/index';

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
const container = document.querySelector('#app-root');
ReactDOM.render(<AppWrapper />, container);
