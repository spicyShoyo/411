import React from 'react';
import GridView from './views/grid-view'
import NavBar from './views/navbar'

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

import AuthMixin from './mixins/auth-mixin'
import CreateDrinkView from './views/create-drink-view'

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
    return (
      <div style={styles.container}>
        <NavBar
          title="Bacchanalia"
          transparent={false} />
        <div style={styles.div}>
        <GridView favoritePage={true}/>
        <CreateDrinkView/>
        </div>
      </div>
    );
  }
});
