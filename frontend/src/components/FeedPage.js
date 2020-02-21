import React from 'react';
import { withRouter } from "react-router";
import {feedReplays} from '../Requests'


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
        <h1>Feed Page !</h1>
    );
  }
}


export default withRouter(FeedPage);
