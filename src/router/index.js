import React from 'react'
import Bundle from '../component/bundle'
import Login from 'bundle-loader?lazy!@/module/Login'
import Index from 'bundle-loader?lazy!@/module/Index'
import Test from 'bundle-loader?lazy!@/module/Test'

//router4就得以这种方式懒加载
//其实model不需要按需加载，因为本来就不应该太大，应该由组件自己维护状态
let getComponent = (component) => {
  return (props) => {
    return (
      <Bundle load={component}>
        {(Container) => {
          return (<Container {...props}/>);
        }}
      </Bundle>
    );
  }
};

export const baseRouter = [
  {
    name: 'Index Home',
    path: '/',
    component: getComponent(Index)
  },
  {
    name: 'Login',
    path: '/auth/login',
    component: getComponent(Login)
  },
  {
    name: 'Register',
    path: '/auth/register',
    component: getComponent(Index)
  },
  {
    name: 'Test',
    path: '/test',
    component: getComponent(Test)
  }
];

export const authRouter = [
  {
    name: 'User',
    path: '/user',
    component: getComponent(Test)
  }
];
