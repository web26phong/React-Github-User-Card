import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  state = {
    followers: []
  }

  componentDidMount() {
    console.log("app did mount")
    axios
    .get(`https://api.github.com/users/PHONGdotTech/followers`)
    .then(res => {
      console.log(res)
      this.setState({
        followers: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    console.log("app rendered")
    
    return (
      <div className="App">
        <div>
          {this.state.followers.map(follower => (
            <div key={follower.id} className="followerContainer">
              <div className="followerAvatar">
                <img src={follower.avatar_url} alt="user's avatar"/>
              </div>
              <div className="followerDetails">
                <p>{follower.login}</p>
                <p><a rel="noopener noreferrer" target="_blank" href={follower.html_url}>{follower.html_url}</a></p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    );
  }
}

export default App;
