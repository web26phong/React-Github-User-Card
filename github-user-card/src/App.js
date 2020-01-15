import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Card, CardImg, CardSubtitle, CardTitle, CardBody, CardLink} from "reactstrap";
import axios from "axios";
import './App.css';

class App extends Component {
  state = {
    followers: [],
    searchText: "",
    user: "phongdottech"
  }

  componentDidMount() {
    console.log("app did mount")
    axios
    .get(`https://api.github.com/users/PHONGdotTech/followers`)
    .then(res => {
      console.log(res)
      console.log("because component did mount, setState followers to the response.data")
      this.setState({
        followers: res.data
      })
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleChanges = e => {
    this.setState({
      searchText: e.target.value
    });
  };


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchText === "") {
      console.log("search button was clicked, but no user was entered in search field. no axios call")
    }else {
      axios
      .get(`https://api.github.com/users/${this.state.searchText}/followers`)
      .then(res => {
        this.setState({
          followers: res.data,
          user: this.state.searchText
        })
      })
      .catch(err => console.log(err));
      }
  }

  render() {
    console.log("app rendered")
    
    return (
      <div className="App">
        
        <FormGroup className="searchform">
          <Label for="search">Enter a GitHub User's Profile Name</Label>
          <span className="searchformtextbutton">
            <Input
            onChange={this.handleChanges}
            className="searchinput"
            type="search"
            name="search"
            id="search"
            placeholder="type a name to search"
            />
            <Button onClick={this.handleSubmit} title="Shows searched user's followers">Show followers!</Button>
          </span>
        </FormGroup>
        <p>Currently displaying {this.state.user}'s followers.</p>
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
