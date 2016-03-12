import React from 'react';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class AddDrinkView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drinkName: "",
      hintText: "Search for Ingredient",
      drinkNameError: "",
      dataSource: []};
      this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
      this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  handleEnterKeyDown(t) {
    if (t === '')
      this.setState({drinkName: "Drink name cannot be empty!"})
  }

  handleUpdateInput(t) {
    this.setState({dataSource: []});
    if (t === '')
      return;
    api.ingredientTyped(t).then(res => {
      let resArr = res["ingredients"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["ingredientname"]);
        console.log(resArr[i]["ingredientname"]);
      }
      this.setState({dataSource: newArr});
    })
  };

  handleNewRequest(t) {
    if (t !== '')
      api.addDrink(this.state.drinkName, t);
  }

  render() {
    return (
      <section>
      <TextField hintText="Enter New Drink Name"
                 onEnterKeyDown={this.handleEnterKeyDown}
                 errorText={this.state.drinkNameError}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient 1"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient 2"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient 3"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient 4"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
      />
      <br/>
      <AutoComplete hintText="Add Ingredient 5"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleNewRequest}
      />
      <br/>
      </section>
    );
  }
}
