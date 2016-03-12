import React from 'react';
import TextField from 'material-ui/lib/text-field';

class SearchView extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return <section className="SearchBox">
    <TextField
    hintText="Search for Drink"
    multiLine={true}
    rows={1}
    />
    </section>
  }
}

export default SearchView;
