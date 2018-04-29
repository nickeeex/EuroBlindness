import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainRoutes from './routes';

ReactDOM.render(
  React.createElement(MainRoutes, {}, null),
  document.getElementById('root')
);
