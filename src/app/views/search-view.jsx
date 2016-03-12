import React from 'react';
import TextField from 'material-ui/lib/text-field';
import api from '../api.jsx';

class SearchView extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    api.drinkTyped(event.target.value).then(res=> {
        for(let i in res["drinks"]) {
            console.log(i["drinkname"]);
        }
    })
  }

  render() {
    return <section className="SearchBox">
    <TextField
    hintText="Search for Drink"
    multiLine={true}
    rows={1}
    onChange={this.handleChange}
    />
    </section>
  }
}

export default SearchView;
