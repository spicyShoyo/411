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
import SignupView from './views/signup-view'
import LoginView from './views/login-view'
import Snackbar from 'material-ui/lib/snackbar';
import IntroTagView from './Views/intro-tag-view';
import SearchView from './Views/search-view';
import DrinkSearchView from './Views/drink-search-view';

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signupModalOpen : false,
      loginModalOpen : false,
      warningInvoked: false,
      warningMessage: ""
    }
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
    this.setWarning = this.setWarning.bind(this)
  }

  componentDidMount() {
    UIDispatcher.on(UIEvents.LOGIN_DIALOG_OPEN, this.toggleLoginModal);
  }

  toggleSignupModal() {
    this.setState({signupModalOpen : !this.state.signupModalOpen})
  }

  toggleLoginModal() {
    this.setState({loginModalOpen: !this.state.loginModalOpen})
  }

  toggleWarning() {
    this.setState({warningInvoked: !this.state.warningInvoked})
  }

  setWarning(message) {
    this.setState({warningMessage: message})
    this.toggleWarning()
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
        <NavBar
          title="Bacchanalia"
          transparent={true}
          signupBtnTap={this.toggleSignupModal}
          loginBtnTap={this.toggleLoginModal}/>

        { this.props.children }

        <Snackbar
          open={this.state.warningInvoked}
          message={this.state.warningMessage}
          autoHideDuration={4000}
          onRequestClose={this.toggleWarning}
        />
        <IntroTagView icon="glyphicon glyphicon-user"
        text="Bacchanalia Bacchanalia Bacchanalia Bacchanalia Bacchanalia"
        />
        <IntroTagView icon="glyphicon glyphicon-play"
        text="Bacchanalia Bacchanalia Bacchanalia Bacchanalia Bacchanalia"
        />
        <IntroTagView icon="glyphicon glyphicon-info-sign"
        text="Bacchanalia Bacchanalia Bacchanalia Bacchanalia Bacchanalia"
        />
    <DrinkSearchView />
      </section>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
