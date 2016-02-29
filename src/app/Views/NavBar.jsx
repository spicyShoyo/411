import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import SignupView from './SignupView'

const styles = {
  title: {
    cursor: 'pointer',
  },
  bar: {
    textAlign: 'left',
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0)',
    top: 0
  },
  button: {
    color: Colors.white,
    margin: 8,
  },
};

class TopAppBar extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  handleTitleTap() {
    alert('Clicked Navigation Bar');
  }


  render() {

    return <AppBar style={styles.bar}
      title={<span style={styles.title}>{this.props.title}</span>}
      onTitleTouchTap={this.handleTitleTap}
      iconElementRight={
        <div>
          <FlatButton label="Log in"
            backgroundColor={Colors.lightBlue600}
            style={styles.button}
            />
          <FlatButton label="Sign up"
            onTouchTap={this.props.signupBtnTap}
            backgroundColor={Colors.lightBlue800}
            style={styles.button} />
        </div>
      }
      zDepth={0}
    />
  }
}

export default TopAppBar;
