import React from 'react';
import GridView from './views/grid-view'
import NavBar from './views/navbar'

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

import AuthMixin from './mixins/auth-mixin'

const styles = {
  container: {
    backgroundColor: '#f7f7f7',
  },
  div: {
    marginTop: 64,
  },
};

export default React.createClass({

  mixins: [AuthMixin],

  render() {
    let { drinkname } = this.props.location.query;
    return (
      <div style={styles.container}>
        <NavBar
          title="Bacchanalia"
          transparent={false} />
        <div style={styles.div}>
        <GridView
          recommendPage={true}
          drinkname={drinkname}
        />
        </div>
      </div>
    );
  }
});
