import React, {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'
import {consoleRender} from '@/util/consoleLog'
import {injectIntl} from 'react-intl';

class Index extends PureComponent {
  //生命周期mount
  componentDidMount() {
    console.log('Index mount');
  }

  render() {
    consoleRender('Index render');
    let locale = this.props.intl.formatMessage;
    return (
      <div className='page-index'>dashboard</div>
    );
  }
}

// withRouter要包在connect外面， 同时用form和withRouter包裹以后都会每次的props都是不一样的
export default injectIntl(withRouter(Index));
