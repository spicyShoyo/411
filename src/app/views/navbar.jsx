import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';

import UIEvents from './../utils/ui-events';
import UIDispatcher from './../utils/ui-dispatcher';

import UserStore from './../stores/user-store';

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
  }
};

class TopAppBar extends React.Component {
  constructor(props, context) {
    super(props, context)
    if (this.props.transparent === true)
      styles.bar.backgroundColor = 'rgba(0,0,0,0)'
    this.state = {name: UserStore.username};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleTap = this.handleTitleTap.bind(this);
  }

  componentDidMount() {
    UserStore.register(this.handleNameChange);
  }

  componentWillUnmount() {
    UserStore.remove(this.handleNameChange);
  }

  handleNameChange(name) {
    this.setState({ name: name });
  }

  handleTitleTap() {
    UIDispatcher.emit(UIEvents.LEFT_NAVBAR_TOGGLE);
  }

  render() {
    let rightElement;
    if (this.state.name.length === 0) {
      rightElement =
        <div>
          <FlatButton label="Log in"
            onTouchTap={() => UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE)}
            backgroundColor={Colors.lightBlue400}
            style={styles.button} />
          <FlatButton label="Sign up"
            onTouchTap={() => UIDispatcher.emit(UIEvents.SIGN_UP_DIALOG_TOGGLE)}
            backgroundColor={Colors.lightBlue600}
            style={styles.button} />
        </div>;
    }
    else
      rightElement =
        <FlatButton label={`${this.state.name}`} />
    return <AppBar style={styles.bar}
      title={<span style={styles.title}>{this.props.title}</span>}
      onLeftIconButtonTouchTap={this.handleTitleTap}
      onTitleTouchTap={this.handleTitleTap}
      iconElementRight={rightElement}
      zDepth={0}
    />
  }
}

export default TopAppBar;
