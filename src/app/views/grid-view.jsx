import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import DrinkDetails from './drink-details';
import api from '../api.jsx';
import UserStore from '../stores/user-store';
import UIDispatcher from '../utils/ui-dispatcher';
import UIEvents from '../utils/ui-events';
import Spinner from './spinner-view';

import _ from 'lodash';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    paddingTop: 36,
    width: '60%',
    minWidth: 375,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class GridListView extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      drinks: [],
      likedDrinks: [],
      detailsDialogOpen: false,
      details: null,
      ingredients:[],
      showSpinner: true
    }
    this.updateDrinks=this.updateDrinks.bind(this);
    this.updateDrinkTiles = this.updateDrinkTiles.bind(this);
  }

  componentWillMount() {
    this.updateDrinks();
  }

  componentDidMount() {
    UIDispatcher.on(UIEvents.UPDATE_GRID, this.updateDrinkTiles);
    UIDispatcher.on(UIEvents.DRINK_DETAILS_TOGGLE, () => this.setState({ detailsDialogOpen: !this.state.detailsDialogOpen }));
  }

  componentWillUnmount() {
    UIDispatcher.removeAllListeners(UIEvents.UPDATE_GRID);
    UIDispatcher.removeAllListeners(UIEvents.DRINK_DETAILS_TOGGLE);
  }

  updateDrinkTiles(res) {
    let resArr = res["drinks"];
    this.setState({ drinks: resArr });
    this.setState({
      showSpinner: false
    })
  }

  async updateDrinks() {
    if (this.props.favoritePage === true) {
      let res = await api.getLikedDrink(UserStore.username);
      this.updateDrinkTiles(res);
      res.drinks.forEach(drink => drink.featured = false);
      this.setState({ drinks: res.drinks });
    } else if (this.props.recommendPage === true) {
      let res = await api.similarDrink(UserStore.username, this.props.drinkname);
      this.updateDrinkTiles(res);
      res.drinks.forEach(drink => drink.featured = false);
      this.setState({ drinks: res.drinks });
    } else {
      let res = await api.clusterCenters(UserStore.username);
      //let res = await api.randomDrinks();
      this.updateDrinkTiles(res);
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Spinner
          cond={this.state.showSpinner}
          />
        <DrinkDetails
          open={this.state.detailsDialogOpen}
          details={this.state.details}
          ingredients={this.state.ingredients}
        />
        <GridList
          cols={2}
          cellHeight={225}
          padding={1}
          style={styles.gridList}
        >
          {this.state.drinks.map(tile => (
            <GridTile
              key={tile.url}
              title={tile.drinkname}
              subtitle={tile.category}
              actionIcon={
                <IconButton
                  onClick={() => {
                    if (this.state.likedDrinks.filter(n => n === tile.drinkname).length === 0) {
                      this.setState({likedDrinks: this.state.likedDrinks.concat([tile.drinkname])})
                      api.likeADrink(UserStore.username, tile.drinkname)
                        .then(res => {
                          let newDrinks=[]; //delete when liked
                          for(let i=0; i<this.state.drinks.length; ++i) {
                            if(this.state.drinks[i].drinkname!==tile.drinkname) {
                              newDrinks.push(this.state.drinks[i]);
                            }
                          }
                          this.setState({drinks:newDrinks});  //delete when liked done
                          UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, res.drinks);
                        })
                        .catch(err => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, `Network Error: ${err}`))
                    } else {
                      this.setState({likedDrinks: this.state.likedDrinks.reduce((a, c) => {
                        if (c === tile.drinkname) return a
                        else return a.concat([c])
                      }, [])})
                      api.unlikeADrink(UserStore.username, tile.drinkname)
                        .then(res => {
                          let newDrinks=[]; //delete when liked
                          for(let i=0; i<this.state.drinks.length; ++i) {
                            if(this.state.drinks[i].drinkname!==tile.drinkname) {
                              newDrinks.push(this.state.drinks[i]);
                            }
                          }
                          this.setState({drinks:newDrinks});  //delete when liked done
                          UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, res.drinks);
                        })
                        .catch(err => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, `Network Error: ${err}`))
                    }
                  }}>
                  <StarBorder color="white"/>
                </IconButton>
              }
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
            >
              <img src={tile.url} onClick={() => {
                api.getIngredient(tile.drinkname).then(res => {
                  this.setState({
                    detailsDialogOpen: true,
                    details: tile,
                    ingredients: res.ingredients
                  });
                })
              }} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default GridListView;
