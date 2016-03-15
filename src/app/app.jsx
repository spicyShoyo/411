import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main'; // Our custom react component
import Home from './home';
import Dashboard from './dashboard';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    );
  }

}

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<App />, document.getElementById('app'));
