import React from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import ReplayViewer from './components/ReplayViewer'

const url =process.env.REACT_APP_API_HOST + "/api/replay/"

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleReplayParsed = this.handleReplayParsed.bind(this)
    this.state = {
      replays: []
    }
  }

  componentDidMount(){
    fetch(url)
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
      <div className="container mx-auto">
        <h1 className="text-6xl">WarCraft III JavaScript Replay Parser</h1>
          <FileUploader onReplayParsed={this.handleReplayParsed}/>
          {this.state.replays.map((replay) => <ReplayViewer replay={replay}/>)}
      </div>
    );
  }
}


export default App;
