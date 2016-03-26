import React from 'react';
import GridView from './views/grid-view'
import DropDownMenuView from './views/drop-down-menu-view'
import AddDrinkView from './views/add-drink-view'
import DrinkSearchByIngredientView from './views/drink-search-by-ingredient-view'
import DrinkSearchView from './views/drink-search-view'
import NavBar from './views/navbar'
import Dd from './views/d3-view'

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
    let a=this.props.location;
    console.log(a);
    return (
      <section>
      <div style={styles.container}>
        <NavBar
          title="Bacchanalia"
          transparent={false} />
        <div style={styles.div}>
        <Dd />
        {/*<DropDownMenuView style={styles.searchBar}/>
        <AddDrinkView/>
        <DrinkSearchByIngredientView/>
        <GridView/>*/}
        </div>

      </div>
      <GridView/>
      </section>
    );
  }
});
