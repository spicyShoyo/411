import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

const styles = {
  title: {
    cursor: 'pointer',
  },
  bar: {
    textAlign: 'left',
    position: 'fixed',
    top: 0
  }
};

class TopAppBar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    function handleTouchTap() {
      alert('Clicked Navigation Bar');
    }
    return <AppBar style={styles.bar}
      title={<span style={styles.title}>Bacchanalia</span>}
      onTitleTouchTap={handleTouchTap}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      zDepth={0}
    />
  }
}

export default TopAppBar;
