import React from 'react';

import {parsedReplays} from '../Requests'
import FileUploadButton from './FileUploadButton';
import {replayParseUpload} from '../Requests'
import ReplayPreview from './ReplayPreview'

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.handleReplayParsed = this.handleReplayParsed.bind(this)
    this.state = {
      replays: []
    }
  }

  componentDidMount(){
    parsedReplays()
    .then((replays) => {
      this.setState({replays: replays})
    })
    .catch(err => console.error(err))
  }

  handleReplayParsed(json){
    this.setState((state, props) => ({
      replays: [json, ...state.replays]
    }));
  }

  render(){
    return (
      <>
        <FileUploadButton fetchPostRequest={(formData) => replayParseUpload(formData)} targetURL="/api/parse" onSuccess={this.handleReplayParsed} text="Parse a replay"/>
        {this.state.replays.map(replay => <ReplayPreview replay={replay}/>)}
      </>
    );
  }
}


export default HomePage;
