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

const colorLookUp=["OrangeRed", "PowderBlue", "SkyBlue", "SpringGreen", "Tomato", "Turquoise"];

export default class virtualizedView extends React.Component {

  mixins: [AuthMixin];

  constructor(props) {
      super(props);
      this.getData = this.getData.bind(this)
  };

  getData(group) {
    let data = {
      nodes: [
          //{id: 1, label: 'Node 1', title: 'I have a popup!'},
        ],
      edges: [
          //{from: 1, to: 2},
        ]
    };
    let dic={};
    let headDic={};
    let counter=1;
    for(let i=0; i<group.length&&i<6; ++i) {
      for(let j=0; j<group[i].length; ++j) {
        if((group[i][j].drinkname!=="undefined")&&(group[i][j].drinkname!=="")&&!(dic[group[i][j].drinkname])) {
          dic[group[i][j].drinkname]=counter;
          data.nodes.push({
            id: counter,
            label: `${group[i][j].drinkname}`,
            color: `${colorLookUp[i]}`
          });
          counter+=1;
        }
      }
    }
    for(let i=0; i<group.length&&i<6; ++i) {
      let headIdx=dic[group[i][0].drinkname];
      for(let j=0; j<group[i].length; ++j) {
        headIdx=dic[group[i][j].drinkname];
        if(headDic[headIdx]) {
          continue;
        }else {
          headDic[headIdx]=[1];
          break;
        }
      }
      console.log(headIdx);
      for(let j=0; j<group[i].length; ++j) {
        if(headIdx!==dic[group[i][j].drinkname]) {
          data.edges.push({
            from: headIdx,
            to: dic[group[i][j].drinkname]
          })
        }
      }
    }
    console.log(data);
    return data;
  };

  render() {
    let res=this.props.location;
    let group=JSON.parse(res.query.drinks).drinknames;
    let data=this.getData(group)

    return (
      <section>
      <div style={styles.container}>
        <NavBar
          title="Bacchanalia"
          transparent={false} />
        <div style={styles.div}>
        <Dd data={data}/>
        </div>

      </div>
      <GridView/>
      </section>
    );
  }
};
