import React, { Component } from 'react';
import { Row, Col, Card, CardImg, CardSubtitle, CardTitle, CardBody, CardLink} from "reactstrap";
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
      console.log("set state data followers to the response.data")
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
        <Row className="row">
          {this.state.followers.map(follower => (
            <Card className="card" body inverse color="info" key={follower.id}>
              <CardImg src={follower.avatar_url} alt="user's avatar"/>
              <CardBody>
                <CardTitle>{follower.login}</CardTitle>
                <CardSubtitle><CardLink style={{color: "black"}} rel="noopener noreferrer" target="_blank" href={follower.html_url}>{follower.html_url}</CardLink></CardSubtitle>
              </CardBody>
            </Card>
          ))}
        </Row>
      </div>
      
    );
  }
}

export default App;
