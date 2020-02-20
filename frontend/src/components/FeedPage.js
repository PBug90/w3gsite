import React from 'react';
import { withRouter } from "react-router";

const url =process.env.REACT_APP_API_HOST + "/api/feed/"

class FeedPage extends React.Component {
  constructor(props){
    super(props);
    this.handleReplayParsed = this.handleReplayParsed.bind(this)
    this.state = {
      replays: []
    }
  }

  componentDidMount(){
    fetch(`${url}${this.props.match.params.feedid}`)
    .then((response) => response.json())
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
