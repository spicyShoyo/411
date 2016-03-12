/**
 * Created by @tourbillon on 3/12/16.
 */

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router';

const style = {
  textDecoration: 'none'
};

export default class NavLink extends React.Component {

  render() {
    if (!this.props.style)
      this.props = _.assign({}, this.props, {style});

    return (
      <Link {...this.props}>
        { this.props.children }
      </Link>);
  }

}