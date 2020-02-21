import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';
import FileUploader from './components/FileUploader';
import ReplayViewer from './components/ReplayViewer'
import FeedPage from './components/FeedPage'
import AuthContext from './AuthContext'
import {loginCheck, feedReplays} from './Requests'
class App extends React.Component {
  constructor(props){
    super(props);
    this.handleReplayParsed = this.handleReplayParsed.bind(this)
    this.state = {
      replays: [],
      user: null
    }
  }

  componentDidMount(){
    feedReplays('global')
    .then((replays) => {
      this.setState({replays: replays})
    })
    .catch(err => console.error(err))
    loginCheck()
    .then((json) =>{
      this.setState({user: json})
    })
  }

  handleReplayParsed(json){
    this.setState((state, props) => ({
      replays: [...state.replays, json]
    }));
  }

  render(){
    return (
      <Router>
        <AuthContext.Provider value={this.state.user}>
      <div className="container mx-auto">
        <h1 className="text-6xl">WarCraft III JavaScript Replay Parser</h1> 
        <div>
          {this.state.user === null ? 
          <a  href={`http://localhost:8080/api/auth/twitch`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Login
            </a>  : <h1>Logged in as {this.state.user.login}</h1>
            }       
            </div>
          <Switch>
          <Route path="/feed/:feedid">
            <FeedPage/>
          </Route>
          <Route path="/">
          <FileUploader onReplayParsed={this.handleReplayParsed}/>
            {this.state.replays.map((replay) => <ReplayViewer replay={replay}/>)}
          </Route>
        </Switch>
        </div>
        </AuthContext.Provider>
        </Router>
    );
  }
}


export default App;
