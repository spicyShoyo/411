import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

const styles={
  spinner: {
    position: 'fixed',
    bottom: '50px',
    right: '50px'
  }
}

export default React.createClass({
  render() {
    if(this.props.cond===true) {
      return <div style={styles.spinner}><CircularProgress /></div>
    }else {
      return null;
    }
  }
});
