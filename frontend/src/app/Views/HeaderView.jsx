import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  headerView: {
    textAlign: 'center',
    paddingTop: 220,
  },
  header: {
    backgroundColor: Colors.lightBlue900,
    position: 'absolute',
    width: '100%',
    height: '61.8%',
  },
  headerTextTitle: {
    color: Colors.white,
    margin: 25,
    fontSize: 50
  },
  headerTextSubtitle: {
    color: Colors.white,
    margin: 30,
    fontSize: 18
  },
  mainButton: {
    width: 120,
  }
};

class HeaderView extends React.Component {
  constructor(props, context) {
    super(props, context)
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

    return <div style={styles.header}>
      <div style={styles.headerView}>
        <Dialog
          open={this.state.open}
          title="Hello CS411 Teammates"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          This is React.js
        </Dialog>
        <div style={styles.headerTextTitle}>Bacchanalia</div>
        <div style={styles.headerTextSubtitle}>By Yu Wang, Xiaohang Yu, Zhengchao Liu, Mengxiong Liu</div>
        <RaisedButton
          label="More"
          style={styles.mainButton}
          primary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    </div>
  }
}

export default HeaderView;
