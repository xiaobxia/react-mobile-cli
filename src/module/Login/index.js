import React, {PureComponent} from 'react'
import {createForm} from 'rc-form';
import {InputItem, Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {consoleRender} from '@/util/consoleLog'
import {injectIntl} from 'react-intl';

class Login extends PureComponent {
  //生命周期mount
  componentDidMount() {
    console.log('Login mount');
  }

  render() {
    consoleRender('Login render');
    let locale = this.props.intl.formatMessage;
    console.log(locale({id: 'App.login'}))
    const {getFieldProps} = this.props.form;
    return (
      <div className="login-wrap">
        <InputItem
          {...getFieldProps('userCode')}
          type="text"
          className="login-input"
          placeholder="请输入用户名"
        ><i className="fa fa-user-o"/></InputItem>
        <InputItem
          {...getFieldProps('pwd')}
          className="login-input"
          type="text"
          placeholder="请输入用户密码"
        ><i className="fa fa-lock"/></InputItem>
        <Button className="login-btn">登录</Button>
      </div>
    );
  }
}

export default injectIntl(withRouter(createForm()(Login)));
