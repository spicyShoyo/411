/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';

import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import myTheme from './theme';
import Colors from 'material-ui/lib/styles/colors';

import NavBar from './Views/NavBar';
import HeaderView from './Views/HeaderView'
import HeaderImageGallery from './Views/HeaderImageGallery'

const muiTheme = getMuiTheme(myTheme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <section>
        <NavBar title="Bacchanalia"/>
        <HeaderImageGallery />
        <HeaderView />
      </section>
    );
  }
}

export default ThemeDecorator(muiTheme)(Main);
