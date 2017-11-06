/**
 * Created by xiaobxia on 2017/10/19.
 */
import md5 from 'md5';
import http from 'localUtil/httpUtil';
const APP_TOGGLE_COLLAPSED = 'APP_TOGGLE_COLLAPSED';
const APP_LOGIN = 'APP_LOGIN';
const APP_LOGIN_SUC = 'APP_LOGIN_SUC';
const APP_INSET_LOGIN = 'APP_INSET_LOGIN';
const APP_INSET_LOGIN_SUC = 'APP_INSET_LOGIN_SUC';
const APP_CHECK_LOGIN = 'APP_CHECK_LOGIN';
const APP_CHECK_LOGIN_SUC = 'APP_CHECK_LOGIN_SUC';
const APP_LOGOUT_SUC = 'APP_LOGOUT_SUC';
const APP_SHOW_GLOB_LOGIN = 'APP_SHOW_GLOB_LOGIN';
const APP_HIDE_GLOB_LOGIN = 'APP_HIDE_GLOB_LOGIN';

export const appActions = {
  appToggleCollapsed() {
    return {type: APP_TOGGLE_COLLAPSED};
  },
  appCheckLogin() {
    return (dispatch, getState) => {
      dispatch({type: APP_CHECK_LOGIN});
      return http.get('sys/checkLogin').then((data) => {
        dispatch({type: APP_CHECK_LOGIN_SUC, loginUser: data});
      });
    };
  },
  appLogin({user, password}) {
    return (dispatch, getState) => {
      dispatch({type: APP_LOGIN});
      return http.post('sys/login', {userCode: user, pwd: md5(password)}).then((data) => {
        if (data.login === true) {
          dispatch({type: APP_LOGIN_SUC, loginUser: data});
        } else {
          return data;
        }
      });
    };
  },
  appInsetLogin({user, password}) {
    return (dispatch, getState) => {
      //内部登录，减少状态变化
      return http.post('sys/login', {userCode: user, pwd: md5(password)}).then((data) => {
        dispatch({type: APP_INSET_LOGIN_SUC, loginUser: data});
      });
    };
  },
  appLogout() {
    return (dispatch, getState) => {
      return http.get('sys/logout').then((res) => {
        dispatch({type: APP_LOGOUT_SUC});
      });
    };
  },
  appHideGlobLogin() {
    return {
      type: 'APP_HIDE_GLOB_LOGIN'
    }
  }
};

//TODO 可类比vue中的mutation，区别在于在react中接受旧的state，修改后返回新的state
//TODO 不要直接对state做修改，而是对其副本做修改
//TODO state必须有默认值
//TODO 这里的state不是指整个state树，而是combineReducers中key对应的state
//TODO reducer是纯净的，不能有请求，个随机数据
const appStore = {
  loginUser: null,
  isGlobLoading: false,
  showGlobLogin: false,
  collapsed: localStorage.getItem('collapsed') === 'true'
};
export const appReducers = (state = appStore, action) => {
  //这里的state是glob内的state
  let data = Object.assign({}, state);
  //action是actions中返回的对象
  switch (action.type) {
    case APP_TOGGLE_COLLAPSED: {
      data.collapsed = !data.collapsed;
      if (data.collapsed) {
        localStorage.setItem('collapsed', 'true');
      } else {
        localStorage.removeItem('collapsed');
      }
      return data;
    }
    case APP_CHECK_LOGIN: {
      data.loginUser = null;
      data.isGlobLoading = true;
      return data;
    }
    case APP_CHECK_LOGIN_SUC: {
      data.isGlobLoading = false;
      if (action.loginUser.isLogin === true) {
        data.loginUser = action.loginUser;
        localStorage.setItem('userCode', action.loginUser.userCode);
      }
      return data;
    }
    case APP_LOGIN: {
      data.loginUser = null;
      return data;
    }
    case APP_LOGIN_SUC: {
      data.loginUser = action.loginUser;
      //登录页登录的初始化，内部登录不需要
      data.collapsed = false;
      localStorage.removeItem('collapsed');
      localStorage.setItem('userCode', action.loginUser.userCode);
      return data;
    }
    // case APP_INSET_LOGIN: {
    //   data.loginUser = null;
    //   return data;
    // }
    case APP_INSET_LOGIN_SUC: {
      data.loginUser = action.loginUser;
      localStorage.setItem('userCode', action.loginUser.userCode);
      return data;
    }
    case APP_LOGOUT_SUC: {
      data.loginUser = null;
      return data;
    }
    case APP_SHOW_GLOB_LOGIN: {
      data.showGlobLogin = true;
      return data;
    }
    case APP_HIDE_GLOB_LOGIN: {
      data.showGlobLogin = false;
      return data;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};


//不combineReducers，就没有命名空间了
// const globReducers = combineReducers({
//   glob: reducers
// });
//
// export default globReducers;
