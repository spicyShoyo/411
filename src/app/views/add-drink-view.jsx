import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import api from '../api.jsx';

const defaultCategory = "";
const defaultGlass = "";

export default class AddDrinkView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drinkName: "",
      category: "",
      glass: "",
      hintText: "Search for Ingredient",
      drinkNameError: "",
      ingredientNames: [],
      categorySource: [],
      glassSource: [],
      ingredientSource: [],
      buttons: []};
      this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
      this.categoryUpdateInput = this.categoryUpdateInput.bind(this);
      this.categoryNewRequest = this.categoryNewRequest.bind(this);
      this.glassUpdateInput = this.glassUpdateInput.bind(this);
      this.glassNewRequest = this.glassNewRequest.bind(this);
      this.ingredientUpdateInput = this.ingredientUpdateInput.bind(this);
      this.ingredientNewRequest = this.ingredientNewRequest.bind(this);
  }

  handleEnterKeyDown(t) {
    if (t === '')
      this.setState({drinkName: "Drink name cannot be empty!"})
  }

  categoryUpdateInput(t) {
    this.setState({categorySource: []});
    if (t === '')
      return;
    api.categoryTyped(t).then(res => {
      let resArr = res["categories"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["category"]);
        console.log(resArr[i]["category"]);
      }
      this.setState({categorySource: newArr});
    })
  };

  categoryNewRequest(t) {
    if (t !== '')
      this.setState({category: t});
  }

  glassUpdateInput(t) {
    this.setState({glassSource: []});
    if (t === '')
      return;
    api.glassTyped(t).then(res => {
      let resArr = res["glasses"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["glass"]);
        console.log(resArr[i]["glass"]);
      }
      this.setState({glassSource: newArr});
    })
  };

  glassNewRequest(t) {
    if (t !== '')
      this.setState({glass: t});
  }

  ingredientUpdateInput(t) {
    this.setState({ingredientSource: []});
    if (t === '')
      return;
    api.ingredientTyped(t).then(res => {
      let resArr = res["ingredients"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["ingredientname"]);
        console.log(resArr[i]["ingredientname"]);
      }
      this.setState({ingredientSource: newArr});
    })
  };

  ingredientNewRequest(t) {
    if (t !== '') {
      api.addDrink(this.state.drinkName, t, this.state.category, this.state.glasss);
      this.setState({ingredientNames: this.state.ingredientNames.concat(t)});
      this.state.buttons.push(<div> <RaisedButton label={t}
                                            style={styles.button}>
                              </RaisedButton>
                              </div>);
      }
  }

  render() {
    return (
      <section>
      <TextField hintText="Enter New Drink Name"
                 onEnterKeyDown={this.handleEnterKeyDown}
                 errorText={this.state.drinkNameError}
      />
      <br/>
      <AutoComplete hintText="Search Category"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.categorySource}
                    onUpdateInput={this.categoryUpdateInput}
                    onNewRequest={this.categoryNewRequest}
      />
      <br/>
      <AutoComplete hintText="Search Glass"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.glassSource}
                    onUpdateInput={this.glassUpdateInput}
                    onNewRequest={this.glassNewRequest}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.ingredientSource}
                    onUpdateInput={this.ingredientUpdateInput}
                    onNewRequest={this.ingredientNewRequest}
      />
      <br/>
      {this.state.buttons
      }
      </section>
    );
  }
}
