/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {consoleRender} from 'localUtil/consoleLog'
import {injectIntl} from 'react-intl';

class Dashboard extends PureComponent {
  //生命周期mount
  componentDidMount() {
    console.log('Dashboard mount');
  }

  render() {
    consoleRender('Dashboard render');
    let locale = this.props.intl.formatMessage;
    return (
      <div>dashboard</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
};
// withRouter要包在connect外面， 同时用form和withRouter包裹以后都会每次的props都是不一样的
export default injectIntl(withRouter(connect(mapStateToProps)(Dashboard)));
