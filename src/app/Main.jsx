/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';

import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import myTheme from './theme';
import Colors from 'material-ui/lib/styles/colors';

import NavBar from './Views/NavBar';
import HeaderView from './Views/HeaderView'
import HeaderImageGallery from './Views/HeaderImageGallery'
import SignupView from './Views/SignupView'
import LoginView from './Views/LoginView'
import Snackbar from 'material-ui/lib/snackbar';

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signupModalOpen : false,
      loginModalOpen : false,
      warningInvoked: false,
    }
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
  }

  toggleSignupModal() {
    this.setState({
      signupModalOpen : !this.state.signupModalOpen
    })
  }

  toggleLoginModal() {
    this.setState({
      loginModalOpen: !this.state.loginModalOpen
    })
  }

  toggleWarning() {
    this.setState({
      warningInvoked: !this.state.warningInvoked
    })
  }

  render() {
    return (
      <section>
        <SignupView
          open={this.state.signupModalOpen}
          afterSubmit={this.toggleSignupModal}
          invokeWarning={this.toggleWarning}
        />
        <LoginView
          open={this.state.loginModalOpen}
          afterSubmit={this.toggleLoginModal}
          invokeWarning={this.toggleWarning}
        />
        <NavBar
          title="Bacchanalia"
          transparent={true}
          signupBtnTap={this.toggleSignupModal}
          loginBtnTap={this.toggleLoginModal}/>
        <HeaderImageGallery />
        <HeaderView
          centralBtnTap={this.toggleLoginModal}
        />
        <Snackbar
          open={this.state.warningInvoked}
          message='Cannot submit the request due to the error shown above!'
          autoHideDuration={4000}
          onRequestClose={this.toggleWarning}
        />
      </section>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
