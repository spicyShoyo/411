import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

let styles = {
  title: {
    cursor: 'pointer',
  },
  bar: {
    textAlign: 'left',
    position: 'fixed',
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
    if (this.props.transparent === true)
      styles.bar.backgroundColor = 'rgba(0,0,0,0)'
    this.handleTitleTap = this.handleTitleTap.bind(this);
  }
  
  handleTitleTap() {
  }

  render() {
    return <AppBar style={styles.bar}
      title={<span style={styles.title}>{this.props.title}</span>}
      onTitleTouchTap={this.handleTitleTap}
      iconElementRight={
        <div>
          <FlatButton label="Log in"
            onTouchTap={this.props.loginBtnTap}
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
