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

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signupModalOpen : false,
      loginModalOpen : false,
    }
    this.toggleSignupModal = this.toggleSignupModal.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
  }

  toggleSignupModal() {
    this.setState({
      signupModalOpen : !this.state.signupModalOpen
    })
  }

  toggleLoginModal() {
    this.setState({
      signupModalOpen : !this.state.signupModalOpen
    })
  }

  render() {
    return (
      <section>
        <SignupView
          open={this.state.signupModalOpen}
          afterSubmit={this.toggleSignupModal}
        />
        <NavBar
          title="Bacchanalia"
          signupBtnTap={this.toggleSignupModal}
          loginBtnTap={this.toggleLoginModal}/>
        <HeaderImageGallery />
        <HeaderView />
      </section>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
