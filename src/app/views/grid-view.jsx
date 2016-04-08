import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import DrinkDetails from './drink-details';
import api from '../api.jsx';
import UserStore from '../stores/user-store'
import UIDispatcher from '../utils/ui-dispatcher'
import UIEvents from '../utils/ui-events'

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
      drinks: tilesData,
      likedDrinks: [],
      detailsDialogOpen: false,
      details: tilesData[0],
      ingredients:[],
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
  }

  async updateDrinks() {
    if (this.props.favoritePage === true) {
      let res = await api.getLikedDrink(UserStore.username);
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
                        .then(res => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, res.drinks))
                        .catch(err => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, `Network Error: ${err}`))
                    } else {
                      this.setState({likedDrinks: this.state.likedDrinks.reduce((a, c) => {
                        if (c === tile.drinkname) return a
                        else return a.concat([c])
                      }, [])})
                      api.unlikeADrink(UserStore.username, tile.drinkname)
                        .then(res => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, res.drinks))
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

const tilesData = [
    {
      "drinkname": "220 BTU",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Shot glass",
      "likes": 6,
      "num": 8,
      "url": "https://farm6.staticflickr.com/5007/5240760596_d2b5f91bbf.jpg",
      "featured": true
    },
    {
      "drinkname": "110 in the shade",
      "category": "Beer",
      "alcohol": "Alcoholic",
      "glass": "Any Glass",
      "likes": 0,
      "num": 1,
      "url": "https://farm1.staticflickr.com/89/219034347_1c81550694.jpg",
      "featured": false
    },
    {
      "drinkname": "'57 Chevy",
      "category": "Cocktail",
      "alcohol": "Alcoholic",
      "glass": "Cocktail glass",
      "likes": 0,
      "num": 2,
      "url": "https://farm8.staticflickr.com/7461/15884842307_e113bdf15e.jpg",
      "featured": false
    },
    {
      "drinkname": "1-900-FUK-MEUP",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Old-fashioned glass",
      "likes": 0,
      "num": 3,
      "url": "https://farm8.staticflickr.com/7455/12524857445_654def00b5.jpg",
      "featured": true
    },
    {
      "drinkname": "'57 Chevy #2",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Shot glass",
      "likes": 0,
      "num": 4,
      "url": "https://farm8.staticflickr.com/7032/6410752575_4443319c5c.jpg",
      "featured": false
    },
    {
      "drinkname": "187 URge",
      "category": "Cocktail",
      "alcohol": "Alcoholic",
      "glass": "Any Glass",
      "likes": 0,
      "num": 5,
      "url": "https://farm3.staticflickr.com/2911/13998977890_af88aaeb23.jpg",
      "featured": false
    },
    {
      "drinkname": "The \\Liquerice\" Dream\"\"\"",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Shot glass",
      "likes": 0,
      "num": 6,
      "url": "https://farm7.staticflickr.com/6025/6020293123_4fc00ac721.jpg",
      "featured": false
    },
    {
      "drinkname": "'57 Chevy with a White License Plate",
      "category": "Cocktail",
      "alcohol": "Alcoholic",
      "glass": "Highball glass",
      "likes": 0,
      "num": 7,
      "url": "https://farm3.staticflickr.com/2925/14297370851_a386791977.jpg",
      "featured": false
    },
    {
      "drinkname": "3 Wise Men",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Collins glass",
      "likes": 0,
      "num": 9,
      "url": "https://farm4.staticflickr.com/3700/13848283595_13148180d5.jpg",
      "featured": true
    },
    {
      "drinkname": "151 Florida Bushwacker",
      "category": "Milk / Float / Shake",
      "alcohol": "Alcoholic",
      "glass": "Beer mug",
      "likes": 0,
      "num": 10,
      "url": "https://farm5.staticflickr.com/4007/4591996564_7a4fc04a6e.jpg",
      "featured": false
    },
    {
      "drinkname": "155 Belmont",
      "category": "Cocktail",
      "alcohol": "Alcoholic",
      "glass": "White wine glass",
      "likes": 0,
      "num": 11,
      "url": "https://farm5.staticflickr.com/4067/4577576538_9466e1d7fd.jpg",
      "featured": false
    },
    {
      "drinkname": "252",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Shot glass",
      "likes": 0,
      "num": 12,
      "url": "https://farm7.staticflickr.com/6071/6131018441_36b917b647.jpg",
      "featured": true
    },
    {
      "drinkname": "3-Mile Long Island Iced Tea",
      "category": "Ordinary Drink",
      "alcohol": "Alcoholic",
      "glass": "Any Glass",
      "likes": 0,
      "num": 13,
      "url": "https://farm4.staticflickr.com/3275/2472177819_213d6a2ab8.jpg",
      "featured": false
    },
    {
      "drinkname": "24k nightmare",
      "category": "Shot",
      "alcohol": "Alcoholic",
      "glass": "Shot glass",
      "likes": 0,
      "num": 14,
      "url": "https://farm5.staticflickr.com/4052/4325529435_4237af5424.jpg",
      "featured": false
    },
    {
      "drinkname": "351 Special",
      "category": "Ordinary Drink",
      "alcohol": "Alcoholic",
      "glass": "Coffee mug",
      "likes": 0,
      "num": 15,
      "url": "https://farm3.staticflickr.com/2647/4128015511_37c11da1ed.jpg",
      "featured": false
    },
    {
      "drinkname": "357 Magnum",
      "category": "Ordinary Drink",
      "alcohol": "Alcoholic",
      "glass": "Any Glass",
      "likes": 0,
      "num": 16,
      "url": "https://farm6.staticflickr.com/5441/9027079270_3ecfd8e3b1.jpg",
      "featured": false
  },
];
