import React from 'react';
import { Provider } from 'react-redux'
import { IconStyle } from './src/assets/fonts/iconfont';
import { GlobalStyle } from './style';
import { renderRoutes } from "react-router-config";
import routes from './src/route';
import { BrowserRouter } from "react-router-dom";
import store from './src/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
