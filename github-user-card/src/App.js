import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
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
          <p key={follower.id}>{follower.login}</p>
          ))}
        </div>
        
      </div>
    );
  }
}

export default App;
