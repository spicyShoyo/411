import React from 'react';

import { Paper } from 'material-ui/lib';
import { Card, CardMedia, CardText } from 'material-ui/lib/card';

export default class IntroTagView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { zDepth: 0 };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseExit = this.mouseExit.bind(this);
  }

  mouseEnter(event) {
    event.preventDefault();
    let i = window.setInterval(() => {
      if (this.state.zDepth >= 3)
        window.clearInterval(i);
      ++this.state.zDepth;
    }, 100);
  }

  mouseExit(event) {
    event.preventDefault();
    let i = window.setInterval(() => {
      if (this.state.zDepth <= 1)
        window.clearInterval(i);
      --this.state.zDepth;
    }, 100);
  }

  render() {
    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this.mouseEnter}
        onMouseExit={this.mouseExit}>
        <Card>
          <CardMedia>
            <img src={this.props.imageSrc} />
          </CardMedia>
          <CardText>
            {this.props.children}
          </CardText>
        </Card>
      </Paper>
    );
  }
}
