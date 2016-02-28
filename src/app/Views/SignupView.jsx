import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  container: {
    width: '50%',
    minWidth: 300,
    maxWidth: 800,
    height: '50%',
    minHeight: 300,
    maxHeight: 600,
  },
  headMask: {
    position: 'absolute',
    top:0,
    left:0,
    margin: 0,
    width: '100%',
    height: '61.8%',
    backgroundColor: Colors.blue500
  },
  view: {
  },
  textField: {
    width: '80%',
  }
}

class SignupView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Dialog
          contentStyle={styles.container}
          title="Login"
          actions={this.props.actions}
          modal={false}
          open={this.props.open}
        >
          <section style={styles.headMask}>
          </section>
          <section style={styles.view}>
            <TextField
              style={styles.textField}
              hintText="Username Field"
              floatingLabelText="Username"
            />
            <TextField
              style={styles.textField}
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
            />
          </section>
        </Dialog>
      </section>
    );
  }
}

export default SignupView;
