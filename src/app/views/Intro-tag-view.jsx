import { Card, CardMedia } from 'material-ui/lib/card';

const styles = {
  paper: {

  }
};

export default class IntroTagView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { zDepth: 0 };
  }

  render() {
    return (
      <Paper
        style={styles.paper}
        zDepth={this.state.zDepth}>
        <Card>
          <CardMedia>
            <img src={this.props.imageSrc} />
          </CardMedia>
          {this.props.children}
        </Card>
      </Paper>
    );
  }
}
