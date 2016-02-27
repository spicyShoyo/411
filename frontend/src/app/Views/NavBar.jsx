import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  title: {
    cursor: 'pointer',
  },
  bar: {
    textAlign: 'left',
    position: 'fixed',
    top: 0
  },
  button: {
    margin: 8,
  },
};

const Buttons = () => (
  <div>
    <FlatButton label="Log in"
      backgroundColor={Colors.lightBlue600}
      style={styles.button}
      />
    <FlatButton label="Sign up"
      backgroundColor={Colors.lightBlue800}
      style={styles.button} />
  </div>
);

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
      iconElementRight={<Buttons />}
      zDepth={0}
    />
  }
}

export default TopAppBar;
