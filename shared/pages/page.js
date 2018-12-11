import React from 'react';
import getUrlParams from '../utils/get-url-params';

class PageComponent extends React.Component {
  static defaultParams = {}

  state = {}

  constructor(props) {
    super(props);

    if (props.staticContext) {
      this.state = props.staticContext;
    } else if (window.__ROUTE_DATA__) {
      this.state = __ROUTE_DATA__;
      delete window.__ROUTE_DATA__;
    } else if (this.constructor.loadData) {
      const params = {
        ...this.constructor.defaultParams,
        ...getUrlParams(location.pathname, props.match.params),
      };

      Promise.resolve(this.constructor.loadData(params))
        .then(state => this.setState(state));
    }
  }

  render() {
    return <div className="page"></div>;
  }
}

export default PageComponent;
