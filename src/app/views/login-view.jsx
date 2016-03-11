import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';
import Colors from 'material-ui/lib/styles/colors';
import api from '../api.jsx';

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
    backgroundImage: 'url("/Poly32.jpg")',
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
      validate: false,
      usernameError: '',
      passwordError: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.didFinishTextField = this.didFinishTextField.bind(this)
    this.warningDidClosed = this.warningDidClosed.bind(this)
  }

  handleChange(event) {
    let temp = {}
    temp[event.target.id] = event.target.value
    this.setState(temp);
  }

  didFinishTextField(event) {
    let text = event.target.value
    switch (event.target.id) {
      case 'username':
        if (text.length <= 3)
          this.setState({usernameError: 'Username should have at least 3 characters!'})
        else
          this.setState({usernameError: ''})
        break;
      case 'password':
        if (text.length < 6)
          this.setState({passwordError: 'Password length should be greater than 6 characters!'})
        else
          this.setState({passwordError: ''})
        break;
      default:
        break;
    }
    if (this.state.username.length > 3 && this.state.password.length >= 6)
      this.setState({validate: true})
  }

  handleSubmit() {
    if (this.state.validate === true) {
      api.loginRequest(this.state.username, this.state.password)
      .then((res) => {
        console.log(res.token)
        this.props.invokeWarning("Log In Succeed!")
        this.props.afterSubmit()
      }).catch((err) => {
        this.props.invokeWarning("Submission failed! Please check your username and password entered!")
      })
    }
    else {
      this.props.invokeWarning("Submission failed! Please check your username and password entered!")
    }
  }

  handleCancel() {
    this.setState({
      username: '',
      password:'',
      validate: false,
      usernameError: '',
      passwordError: '',
    })
    this.props.afterSubmit()
  }

  warningDidClosed() {
    this.setState({warningInvoked: false})
  }

  render() {
    return (
      <section>
        <Dialog
          contentStyle={styles.container}
          title="Login"
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
              onTouchTap={this.handleSubmit}
            />,
          ]}
          modal={false}
          open={this.props.open}
          titleStyle={styles.titleView}
        >
          <section style={styles.backgroundMask}>
          </section>
          <section style={styles.view}>
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
          </section>
        </Dialog>
      </section>
    );
  }
}

export default SignupView;