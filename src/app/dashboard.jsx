import React from 'react';
import GridView from './views/grid-view'
import DropDownMenuView from './views/drop-down-menu-view'

import DrinkSearchView from './views/drink-search-view'
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
    paddingTop: 24
  },
  searchBar: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '72%'
  }
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
        <DropDownMenuView style={styles.searchBar}/>
        <GridView/>
        </div>
      </div>
    );
  }
});
