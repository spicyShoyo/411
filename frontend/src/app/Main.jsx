/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import myTheme from './theme'
import NavBar from './Views/NavBar'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  main: {
    margin: 0
  }
};

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <div>
        <NavBar />
        <div style={styles.container}>
          <Dialog
            open={this.state.open}
            title="Hello CS411 Teammates"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            This is React.js
          </Dialog>
          <h1>Bacchanalia</h1>
          <h2>By Yu Wang, Xiaohang Yu, Zhengchao Liu, Mengxiong Liu</h2>
          <RaisedButton
            label="More"
            primary={true}
            onTouchTap={this.handleTouchTap}
          />
        </div>
      </div>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
