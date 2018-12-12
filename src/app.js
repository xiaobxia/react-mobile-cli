import React, {PureComponent} from 'react';
import axios from 'axios';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './style/lib/antd-mobile.scss';
import './style/index.scss';
import Nprogress from 'nprogress'
import {baseRouter} from '@/router'

/**
 * ***********国际化************
 **/
import {LocaleProvider, Modal} from 'antd-mobile';
import {addLocaleData, IntlProvider} from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
// 中文
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../locales/zh.json';

const appLocale = {
  messages: {
    ...zhMessages
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData
};
// 英文
// import antdEn from 'antd/lib/locale-provider/en_US';
// import appLocaleData from 'react-intl/locale-data/en';
// import enMessages from '../locales/en.json';
// const appLocale = {
//   messages: {
//     ...enMessages
//   },
//   antd: antdEn,
//   locale: 'en-US',
//   data: appLocaleData
// };


addLocaleData(appLocale.data);
console.log('app.js init');

//http拦截
axios.interceptors.request.use(function (config) {
  Nprogress.start();
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  Nprogress.done();
  let data = response.data;
  if (response.status === 0) {
    console.warn('[HTTP status=0]');
    return response;
  } else {
    //200
    if (data.status !== 0) {
      //有错误
      switch (data.status) {
        case 'USER_SESSION_TIMEOUT':
          console.log('USER_SESSION_TIMEOUT')
          break;
      }
    }
    return response;
  }
}, function (error) {
  Nprogress.done();
  console.log('http in error');
  let response = error.response;
  const {errorCode, errorMessage} = response.data || {};
  let errorMsg = 'Server Internal Error. Please contact Administrator!';
  if (errorMessage) {
    errorMsg = `${errorMessage}`;
  }
  console.log(errorCode, errorMsg);
  const msg = `${response.status} ${response.statusText}; \r\n${errorMsg}`;
  Modal.error({
    title: 'This is an error message',
    content: msg
  });
  // Do something with response error
  return Promise.reject(error);
});

//无状态组件
class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  //生命周期mount
  componentDidMount() {
    console.log('Index mount');
  }

  render() {
    return (
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <Router>
              <Switch>
                {baseRouter.map((item) => {
                  return (
                    <Route exact key={item.path} path={item.path} component={item.component}/>
                  );
                })}
                {/*<Route path="/" component={BasicLayout}/>*/}
                <Redirect to="/"/>
              </Switch>
            </Router>
        </IntlProvider>
      </LocaleProvider>
    )
  }
};

//渲染根元素
export default App;

