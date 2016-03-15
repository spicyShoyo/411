import React from 'react';
import GridView from './views/grid-view'
import DropDownMenuView from './views/drop-down-menu-view'

import NavBar from './views/navbar'

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

const styles = {
  container: {
    backgroundColor: '#f7f7f7'
  },
};

export default class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={styles.container}>
        <NavBar
          title="Bacchanalia"
          transparent={false} />
        <GridView />
      </div>
    );
  }
}
