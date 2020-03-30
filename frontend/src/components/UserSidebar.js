import React from 'react';
import {getUserFeeds, createFeed} from '../Requests'
import Button from 'react-bootstrap/Button'

class UserSidebar extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        feeds: []
      }
      this.createNewFeed = this.createNewFeed.bind(this)
    }

    componentDidMount(){
        getUserFeeds()
        .then((json) =>{
          this.setState({feeds: json})
        }).catch(err => {
            console.error(err)
        })
    }

    createNewFeed(){
        createFeed({name: `${Math.random()*10}-testfeed`})
        .then((json) => {
            this.setState((state,props) => ({
                feeds: [...this.state.feeds, json]
            }))
        })
        .catch(err => {
            console.error(err)
        })
    }

    render (){
        return (
            <div>
                <h4>Manage Feeds</h4>
                <div>
                    {this.state.feeds.length === 0 && <small>Looks like you got no feeds yet.</small>}
                    <ul>
                        {this.state.feeds.map((feed) => (<li>{feed.name}</li>))}
                    </ul>
                    <Button onClick={this.createNewFeed} variant="primary">Create Feed</Button>
                </div>
            </div>
        )
    }
}

export default UserSidebar