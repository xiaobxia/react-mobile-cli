/**
 * Created by xiaobxia on 2017/11/6.
 */
import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom';
import {userRouter} from '../../router'

class UserLayout extends PureComponent {
  componentDidMount() {
    console.log('UserLayout mount');
  }

  render() {
    return (
      <div>
        {userRouter.map((item, index) => {
          return (
            <Route exact key={item.path} path={item.path} component={item.component}/>
          );
        })}
      </div>
    );
  }
}
export default UserLayout;
