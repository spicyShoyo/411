import React from 'react';
import NavBar from './views/navbar';
import D3 from './views/d3-view';
import { AutoComplete, Badge, IconButton, FontIcon, RaisedButton } from 'material-ui/lib';
import api from './api';

import AuthMixin from './mixins/auth-mixin';
import UIDispatcher from './utils/ui-dispatcher';
import UIEvents from './utils/ui-events.jsx';

const styles = {
  div: {
    marginTop: 64,
    paddingTop: 24,
    textAlign: 'center'
  },
  title: {
    fontSize: '65px'
  },
  searchDiv: {
    display: 'inline',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%'
  },
  searchBox: {

  },
  searchButton: {
    marginLeft: 11
  },
  ingredientText: {
    backgroundColor: '#E6E6E6',
    padding: 5
  },
  ingredientSection: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '72%'
  },
  virSection: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  }
};

const colorLookUp=["OrangeRed", "PowderBlue", "SkyBlue", "SpringGreen", "Tomato", "Turquoise"];

export default React.createClass({

  mixins: [AuthMixin],

  getInitialState() {
    return {
      ingredientKey: 0,
      ingredientHash: {},
      ingredientSource: [],
      ingredientTags: [],
      visualizationData: {}
    };
  },

  getData(group) {
    let data = {
      nodes: [
        //{id: 1, label: 'Node 1', title: 'I have a popup!'},
      ],
      edges: [
        //{from: 1, to: 2},
      ]
    };
    let dic = {};
    let headDic = {};
    let counter = 1;
    for (let i = 0; i < group.length && i < 6; ++i) {
      for (let j = 0; j < group[i].length; ++j) {
        if ((group[i][j].drinkname !== "undefined") && (group[i][j].drinkname !== "")
            && !(dic[group[i][j].drinkname])) {
          dic[group[i][j].drinkname] = counter;
          data.nodes.push({
                            id: counter,
                            label: `${group[i][j].drinkname}`,
                            color: `${colorLookUp[i]}`
                          });
          counter += 1;
        }
      }
    }
    for (let i = 0; i < group.length && i < 6; ++i) {
      let headIdx = dic[group[i][0].drinkname];
      for (let j = 0; j < group[i].length; ++j) {
        headIdx = dic[group[i][j].drinkname];
        if (headDic[headIdx]) {
          continue;
        } else {
          headDic[headIdx] = [1];
          break;
        }
      }
      console.log(headIdx);
      for (let j = 0; j < group[i].length; ++j) {
        if (headIdx !== dic[group[i][j].drinkname]) {
          data.edges.push({
                            from: headIdx,
                            to: dic[group[i][j].drinkname]
                          })
        }
      }
    }
    console.log(data);
    return data;
  },

  ingredientUpdateInput(t) {
    this.setState({ingredientSource: []});
    if (t === '')
      return;
    api.ingredientTyped(t).then(res => {
      let resArr = res["ingredients"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["ingredientname"]);
      }
      this.setState({ingredientSource: newArr});
    })
  },

  ingredientNewRequest(t) {
    if (t !== '' && !this.state.ingredientHash.hasOwnProperty(t)) {
      let key = this.state.ingredientTags.length;
      let tag =
              <Badge
                  badgeContent={
                  <IconButton
                      onTouchTap={() => {
                        this.state.ingredientTags.splice(key, 1);
                        delete this.state.ingredientHash[t];
                        this.setState({ingredientTags: this.state.ingredientTags});
                      }}>
                    <FontIcon className="material-icons">close</FontIcon>
                  </IconButton>}
                  badgeStyle={styles.ingredientBadge}
                  key={key}
                  style={styles.ingredientBadge}>
                <div style={styles.ingredientText}>{t}</div>
              </Badge>;
      this.state.ingredientTags.push(tag);
      this.state.ingredientHash[t] = key;
      this.setState({ingredientTags: this.state.ingredientTags});
    }
  },

  submit() {
    api.searchDrinkByIngredient(Object.keys(this.state.ingredientHash)).then(res => {
      console.log(res);
      if(res.error==="Drinkname not found!") {
        UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, ':/ Please try another set of ingredients.')
      }else {
        let data = this.getData(res.drinknames);
        this.setState({visualizationData: data});
      }
    }).catch(err => UIDispatcher.emit(UIEvents.SNACKBAR_TOGGLE, err));
  },

  render() {
    return (
      <section>
        <NavBar
          title="Bacchanalia"
          transparent={false}/>
        <div style={styles.div}>
          <h1 style={styles.title}>Visualization</h1>
          <div style={styles.searchDiv}>
            <AutoComplete
              style={styles.searchBox}
              hintText="Add Ingredient"
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.state.ingredientSource}
              onUpdateInput={this.ingredientUpdateInput}
              onNewRequest={this.ingredientNewRequest} />
            <RaisedButton
              label="Search"
              primary={true}
              style={styles.searchButton}
              onTouchTap={this.submit}/>
          </div>
          <div style={styles.ingredientSection}>
            {this.state.ingredientTags}
          </div>
          <div style={styles.virSection}>
          <D3
            data={this.state.visualizationData}/>
        </div>
        </div>
      </section>
    );
  }
});
