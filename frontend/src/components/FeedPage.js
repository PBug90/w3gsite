import React from 'react';
import { withRouter } from "react-router";
import {feedReplays} from '../Requests'
import Alert from 'react-bootstrap/Alert';

class FeedPage extends React.Component {
  constructor(props){
    super(props);
    this.handleReplayParsed = this.handleReplayParsed.bind(this)
    this.state = {
      replays: []
    }
  }

  componentDidMount(){
    feedReplays(this.props.match.feedid)
    .then((replays) => {
      this.setState({replays: replays})
    })
    .catch(err => console.error(err))
  }

  handleReplayParsed(json){
    this.setState((state, props) => ({
      replays: [...state.replays, json]
    }));
  }

  render(){
    return (
      <>
        <h1>Feed Page !</h1>
        <Alert dismissible variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again.
        </p>
      </Alert>
      </>
    );
  }
}


export default withRouter(FeedPage);
