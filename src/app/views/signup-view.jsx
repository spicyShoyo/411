import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';
import Colors from 'material-ui/lib/styles/colors';
import api from '../api.jsx';

import UIEvents from './../utils/ui-events';
import UIDispatcher from './../utils/ui-dispatcher';
import UserStore from './../stores/user-store';

const styles = {
  container: {
    width: '100%',
    height: '50%',
    position: 'relative',
    width: '50%',
    minWidth: 300,
    maxWidth: 450,
    minHeight: 400,
    maxHeight: 600,
  },
  backgroundMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    backgroundImage: 'url("/Poly15.jpg")',
    backgroundSize: '100% auto',
  },
  view: {
    background: 'transparent',
    marginTop:-36,
  },
  titleView: {
    minHeight: '200px',
  },
  textField: {
    marginTop: -6,
    marginBottom: -6,
    width: '90%',
  }
}

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      confirmPassword: '',
      validate: false,
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.didFinishTextField = this.didFinishTextField.bind(this)
  }

  static get contextTypes() {
    return { router: React.PropTypes.object };
  }

  handleChange(event) {
    let temp = {}
    temp[event.target.id] = event.target.value
    this.setState(temp);
  }

  didFinishTextField(event) {
    if (typeof event.target.value !== 'string')
      return;
    let text = event.target.value
    switch (event.target.id) {
      case 'username':
        if (text.length !== 0 && text.length < 3)
          this.setState({usernameError: 'Username should have at least 3 characters!'})
        else
          this.setState({usernameError: ''})
        break;
      case 'password':
        if (text.length !== 0 && text.length < 6)
          this.setState({passwordError: 'Password length should be greater than 6 characters!'})
        else
          this.setState({passwordError: ''})
        break;
      case 'confirmPassword':
        if (text.length !== 0 && text !== this.state.password)
          this.setState({confirmPasswordError: 'Confirm password should match the password!'})
        else
          this.setState({confirmPasswordError: ''})
        break;
      default:
        break;
    }

    if (this.state.username.length > 3 && this.state.password.length >= 6 && this.state.password.value === this.state.confirmPassword.value)
      this.setState({validate: true})
    else
      this.setState({validate: false})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.doSubmit();
  }

  doSubmit() {
    if (this.state.validate === true) {
      api.signupRequest(this.state.username, this.state.password)
        .then(res => {
          console.log(res.token)
          UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, 'Sign up successful')
          UIDispatcher.emit(UIEvents.SIGN_UP_DIALOG_TOGGLE)
          UserStore.username = this.state.username;
          UIDispatcher.emit(UIEvents.LEFT_NAVBAR_TOGGLE);
          window.location.href = '/dashboard';
        }).catch(err => {
        console.log(`Error during login: ${err}`);
        UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, "Oops, we're experiencing a network problem")
      });
    }
    else {
      if (this.state.username.length < 3)
        this.setState({usernameError: 'Username should have at least 3 characters!'})
      if (this.state.password.length < 6)
        this.setState({passwordError: 'Password length should be greater than 6 characters!'})
    }
  }

  handleCancel() {
    this.setState({
      username: '',
      password:'',
      confirmPassword: '',
      validate: false,
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
    });
    UIDispatcher.emit(UIEvents.SIGN_UP_DIALOG_TOGGLE);
  }

  render() {
    return (
      <section>
        <Dialog
          contentStyle={styles.container}
          title="Sign Up"
          actions={[
            <FlatButton
              label="Cancel"
              primary={false}
              keyboardFocused={false}
              onTouchTap={this.handleCancel}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.doSubmit}
            />
          ]}
          modal={false}
          open={this.props.open}
          titleStyle={styles.titleView}
          onRequestClose={this.handleCancel}>
          <section style={styles.backgroundMask}>
          </section>
          <section style={styles.view}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                style={styles.textField}
                hintText="Username Field"
                floatingLabelText="Username"
                id="username"
                onChange={this.handleChange}
                onBlur={this.didFinishTextField}
                value={this.state.username}
                errorText={this.state.usernameError}
              />
              <TextField
                style={styles.textField}
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
                onBlur={this.didFinishTextField}
                value={this.state.password}
                errorText={this.state.passwordError}
              />
              <TextField
                style={styles.textField}
                hintText="Confirm Password Field"
                floatingLabelText="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={this.handleChange}
                onBlur={this.didFinishTextField}
                value={this.state.confirmPassword}
                errorText={this.state.confirmPasswordError}
              />
              <button type="submit" hidden />
            </form>
          </section>
        </Dialog>
      </section>
    );
  }
}

export default SignupView;
