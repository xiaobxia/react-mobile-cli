/**
 * Created by xiaobxia on 2017/10/17.
 */
import 'babel-polyfill';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import {setAdaptive} from 'localUtil/environmentUtil'

setAdaptive();

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
