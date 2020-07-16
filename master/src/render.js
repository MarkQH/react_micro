import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const reactRender = () => {
  return ReactDOM.render(<App />, document.getElementById('app'));
};
