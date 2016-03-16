import React from 'react'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import AutoComplete from 'material-ui/lib/auto-complete'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import api from '../api.jsx'

const styles = {
  root: {
    margin:'auto',
    display: 'block',
    width:'60%',
  },

  dropBar: {
    width:'10%'
  },

  searchBar: {
    display: 'block',
    width:'96%'
  },

  sep: {
    margin:'auto',
  },
}

export default class DropDownMenuView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hintText: "Search for Drink",
      dataSource: [],
      value: 1};
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value})
    if (value === 2)
      this.setState({hintText: "Search for Ingredient"})
    else if (value === 1)
      this.setState({hintText: "Search for Drink"})
  }

  handleUpdateInput(t) {
    if (this.state.hintText === "Search for Drink") {
      if (t === '') {
          this.setState({dataSource: []})
      }
      api.drinkTyped(t).then(res => {
          let resArr = res["drinks"]
          let newArr = []
          for (let i = 0; i < resArr.length; ++i) {
              newArr.push(resArr[i]["drinkname"])
              console.log(resArr[i]["drinkname"])
          }
          this.setState({dataSource: newArr})
      })
    }
    else if (this.state.hintText === "Search for Ingredient") {
      if (t === '') {
          this.setState({dataSource: []})
      }
      api.ingredientTyped(t).then(res => {
          let resArr = res["ingredients"]
          let newArr = [];
          for (let i = 0; i < resArr.length; ++i) {
              newArr.push(resArr[i]["ingredientname"])
              console.log(resArr[i]["ingredientname"])
          }
          this.setState({dataSource: newArr})
      })
    }
  };

  render() {
    return (
      <section style={styles.root}>
      <Toolbar>
      <ToolbarGroup float="right">
      <DropDownMenu style={styles.dropBar} value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} primaryText="Drink"/>
        <MenuItem value={2} primaryText="Ingredient"/>
      </DropDownMenu>
      </ToolbarGroup>
            <ToolbarSeparator style={styles.sep}/>
      <ToolbarGroup float="left" >
      <AutoComplete
                    style={styles.searchBar}
                    hintText={this.state.hintText}
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
      />

      </ToolbarGroup>
      </Toolbar>
      </section>
    );
  }
}
