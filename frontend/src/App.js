import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';
import FileUploader from './components/FileUploader';
import ReplayViewer from './components/ReplayViewer'
import FeedPage from './components/FeedPage'
import AuthContext from './AuthContext'
const url = process.env.REACT_APP_API_HOST + "/api/replay/"
const loginCheckUrl = process.env.REACT_APP_API_HOST + "/api/auth/login/success"
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
    fetch(url)
    .then((response) => response.json())
    .then((replays) => {
      this.setState({replays: replays})
    })
    .catch(err => console.error(err))
    fetch(loginCheckUrl)
    .then((response) => response.json())
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
          <a  href={`/api/auth/twitch`} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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
