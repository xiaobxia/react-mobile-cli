import 'babel-polyfill';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import {setAdaptive} from '@/util/environmentUtil'

setAdaptive();

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
