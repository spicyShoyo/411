import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

class TopAppBar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return <AppBar
      title="Nav Bar"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  }
}

export default TopAppBar;
