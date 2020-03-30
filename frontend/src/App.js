import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import FeedPage from './components/FeedPage'
import HomePage from './components/HomePage'
import AuthContext from './AuthContext'
import {loginCheck} from './Requests'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import UserSidebar from './components/UserSidebar'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    loginCheck()
    .then((json) =>{
      this.setState({user: json})
    })
    .catch(err => {

    })
  }

  render(){
    return (
      <Router>
        <AuthContext.Provider value={this.state.user}>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          WarCraft III JavaScript Replay Parser
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>        
        {this.state.user === null ? 
          <Button href={`${process.env.REACT_APP_API_HOST}/api/auth/twitch`}variant="outline-secondary">Login</Button> :  <Navbar.Text>
          Signed in as: {this.state.user.login}
        </Navbar.Text>
        }               
      </Navbar>
      <Container className="mt-3" fluid>
        <Row>
      <Col xs={3}>{this.state.user && <UserSidebar/>}</Col>
        <Col xs={6}>
          <Switch>
          <Route path="/feed/:feedid">
            <FeedPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        </Col>
        </Row>
        </Container>
        </AuthContext.Provider>
        </Router>
    
    );
  }
}


export default App;
