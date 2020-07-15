import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function reactRender() {
  ReactDOM.render(<App />, document.getElementById('app'));
};
