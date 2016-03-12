import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    paddingTop: 64,
    width: '60%',
    minWidth: 375,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const tilesData = [
  {
    img: 'http://lorempixel.com/1200/480/city/1',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },
  {
    img: 'http://lorempixel.com/1200/480/city/2',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'http://lorempixel.com/1200/480/city/3',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'http://lorempixel.com/1200/480/city/4',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'http://lorempixel.com/1200/480/city/5',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://lorempixel.com/1200/480/city/6',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'http://lorempixel.com/1200/480/city/7',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'http://lorempixel.com/1200/480/city/8',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

class GridListView {
  constructor(props) {
    super(props)
    UIDispatcher.on(UIEvents.GRID_LIST_REFRESH, this.refreshDrinks);
    this.refreshDrinks = this.refreshDrinks.bind(this);
  }

  refreshDrinks() {
    
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cols={2}
          cellHeight={225}
          padding={1}
          style={styles.gridList}
        >
          {tilesData.map(tile => (
            <GridTile
              key={tile.img}
              title={tile.title}
              subtitle={tile.author}
              actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default GridListView;
