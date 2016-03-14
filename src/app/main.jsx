/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';

import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import myTheme from './theme';
import Colors from 'material-ui/lib/styles/colors';

import NavBar from './views/navbar';
import SignupView from './views/signup-view';
import LoginView from './views/login-view';
import Snackbar from 'material-ui/lib/snackbar';
import AddDrinkView from './views/add-drink-view';
import LeftNavBar from './views/left-navbar';

import UIDispatcher from './utils/ui-dispatcher';
import UIEvents from './utils/ui-events';

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signupModalOpen : false,
      loginModalOpen : false,
      warningInvoked: false,
      navbarTransparent: true,
      warningMessage: ""
    }
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this);
    this.setWarningText = this.setWarningText.bind(this);
  }

  componentDidMount() {
    UIDispatcher.on(UIEvents.LOGIN_DIALOG_TOGGLE, this.toggleLoginModal);
    UIDispatcher.on(UIEvents.SIGN_UP_DIALOG_TOGGLE, this.toggleSignupModal);
    UIDispatcher.on(UIEvents.SNACKBAR_TOGGLE, this.setWarningText);
  }

  componentWillUnmount() {
    UIDispatcher.removeAllListeners(UIEvents.LOGIN_DIALOG_TOGGLE);
    UIDispatcher.removeAllListeners(UIEvents.SIGN_UP_DIALOG_TOGGLE);
    UIDispatcher.removeAllListeners(UIEvents.SNACKBAR_TOGGLE);
  }

  toggleSignupModal() {
    this.setState({signupModalOpen : !this.state.signupModalOpen})
  }

  toggleLoginModal() {
    this.setState({loginModalOpen: !this.state.loginModalOpen})
  }

  setWarningText(text) {
    if ('string' === typeof text) {
      this.setState({warningMessage: text});
      this.toggleWarning();
    }
  }

  toggleWarning() {
    this.setState({warningInvoked: !this.state.warningInvoked});
  }

  render() {
    return (
      <section>
        <SignupView
          open={this.state.signupModalOpen}
          afterSubmit={this.toggleSignupModal}
          invokeWarning={this.setWarning}
        />
        <LoginView
          open={this.state.loginModalOpen}
          afterSubmit={this.toggleLoginModal}
          invokeWarning={this.setWarning}
        />
        <LeftNavBar />
        <NavBar
          title="Bacchanalia"
          transparent={window.location.pathname === '/'} />

        { this.props.children }

        <Snackbar
          open={this.state.warningInvoked}
          message={this.state.warningMessage}
          autoHideDuration={5000}
          onRequestClose={this.toggleWarning}
        />
      </section>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
