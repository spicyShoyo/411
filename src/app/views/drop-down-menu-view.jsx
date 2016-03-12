import React from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class DropDownMenuView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hintText: "Search for Drink",
      dataSource: [],
      value: 2};
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
    if (value === 1)
      this.setState({hintText: "Search for Ingredient"});
    else if (value === 2)
      this.setState({hintText: "Search for Drink"});
  }

  handleUpdateInput(t) {
    if (this.state.hintText === "Drink") {
      if (t === '') {
          this.setState({dataSource: []});
      }
      api.drinkTyped(t).then(res => {
          let resArr = res["drinks"];
          let newArr = [];
          for (let i = 0; i < resArr.length; ++i) {
              newArr.push(resArr[i]["drinkname"]);
              console.log(resArr[i]["drinkname"]);
          }
          this.setState({dataSource: newArr});
      })
    }
    else if (this.state.hintText === "Ingredient") {
      if (t === '') {
          this.setState({dataSource: []});
      }
      api.ingredientTyped(t).then(res => {
          let resArr = res["ingredients"];
          let newArr = [];
          for (let i = 0; i < resArr.length; ++i) {
              newArr.push(resArr[i]["ingredientname"]);
              console.log(resArr[i]["ingredientname"]);
          }
          this.setState({dataSource: newArr});
      })
    }
  };

  render() {
    return (
      <section>
      <DropDownMenu value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} primaryText="Ingredient"/>
        <MenuItem value={2} primaryText="Drink"/>
      </DropDownMenu>
      <AutoComplete hintText={this.state.hintText}
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
      />
      </section>
    );
  }
}
