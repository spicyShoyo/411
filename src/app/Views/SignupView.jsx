import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

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
    width: '90%',
  }
}

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'password':'',
      'confirmPassword': '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event){
    let temp = {}
    temp[event.target.id] = event.target.value
    this.setState(temp);
  }

  handleSubmit() {
    if (this.state.password !== this.state.confirmPassword)
      alert('fick you!')
    else
      this.props.afterSubmit()
  }

  render() {
    return (
      <section>
        <Dialog
          contentStyle={styles.container}
          title="Login"
          actions={[
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
              value={this.state.username}
            />
            <TextField
              style={styles.textField}
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <TextField
              style={styles.textField}
              hintText="Confirm Password Field"
              floatingLabelText="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
          </section>
        </Dialog>
      </section>
    );
  }
}

export default SignupView;
