/**
 * Created by xiaobxia on 2017/10/19.
 */
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {message} from 'antd';
//需要鉴权
class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPath: false,
      hasCheckPath: false
    };
  }

  componentDidMount() {
    //请求
    setTimeout(() => {
      this.setState({hasPath: true, hasCheckPath: true});
    }, 200);
  }

  render() {
    console.log('in');
    if (!this.state.hasCheckPath) {
      return null;
    }
    let {component: RouteComponent, ...rest} = this.props;
    return (
      <Route {...rest} render={props => {
        if (this.state.hasPath) {
          return (<RouteComponent {...props}/>);
        } else {
          return (<Redirect to={{
            pathname: '/404'
          }}/>);
        }
      }}/>
    );
  }
}
export default PrivateRoute;
