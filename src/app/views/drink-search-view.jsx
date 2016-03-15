import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import api from '../api.jsx';

export default class DrinkSearchView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    handleUpdateInput(t) {
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

    };

    render() {
        return (<AutoComplete filter={AutoComplete.caseInsensitiveFilter}
                              dataSource={this.state.dataSource}
                              onUpdateInput={this.handleUpdateInput}
                              floatingLabelText="Search Drink"
                              style={this.props.style}/>);
    }
}
