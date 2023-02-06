// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../css/options.css';

// const Options = () => {
//   return <h1>Welcome to the options page!!!</h1>;
// };
// const container = document.querySelector('#options-root');
// ReactDOM.render(<Options />, container);

import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './app/app-context';
import App from './app/settings';

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
const container = document.querySelector('#options-root');
ReactDOM.render(<AppWrapper />, container);
