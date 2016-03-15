import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  headerView: {
    textAlign: 'center',
    paddingTop: '30vh',
  },
  headerBackground: {
    backgroundColor: "rgba(29, 87, 155, 0.3)",
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
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
  }

  render() {
    return <div style={styles.headerBackground} className='header-height'>
      <div style={styles.headerView}>
        <div style={styles.headerTextTitle}>Bacchanalia</div>
        <div style={styles.headerTextSubtitle}>By Yu Wang, Xiaohang Yu, Zhengchao Liu, Mengxiong Liu</div>
        <RaisedButton
          label="More"
          style={styles.mainButton}
          primary={true}
          onTouchTap={this.props.centralBtnTap}
        />
      </div>
    </div>
  }
}

export default HeaderView;
