/**
 * Created by xiaobxia on 2017/11/6.
 */
import React, {PureComponent} from 'react'
import {createForm} from 'rc-form';
import {InputItem, Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {consoleRender} from 'localUtil/consoleLog'
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

const mapStateToProps = state => {
  return {
    app: state.app
  }
};

export default injectIntl(withRouter(createForm()(connect(mapStateToProps)(Login))));
