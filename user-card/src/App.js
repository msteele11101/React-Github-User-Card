import React from 'react';
import axios from 'axios';
import User from './Components/User';
import Followers from './Components/Followers';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      followers: [],
      followerText: ""
    }
  }

  componentDidMount() {
    this.getUser()
    this.getFollowers()
  }
  handleFollowerTextChange = e => {
    this.setState({ ...this.state, followerText: e.target.value });
  };
  handleFollowerFetch = e => {
    e.preventDefault();
   fetch(`https://api.github.com/users/${this.state.followerText}`)
      .then(res => res.json())
      .then(followerData => {
        if (followerData.status !== "error") {
          this.setState({ ...this.state, followers: followerData.data });
        }
      })
      .catch(err => console.log("handleFollowerFetch Error", err));
  };

  getUser= () => {
    axios.get(`https://api.github.com/users/msteele11101`)
      .then(res =>
        this.setState({
          username: res.data
        }))
        .catch(err => console.log(err))
  }

  getFollowers = () => {
    axios.get(`https://api.github.com/users/msteele11101/followers`)
      .then(res => this.setState({followers:res.data}))
      .catch(err => console.log(err))
  }

  render(){
    console.log(this.state)
    return (
      <div className="whole-container">
        <h1>GitHub User Cards</h1>
        <form>
          <input
            type="text"
            value={this.state.followerText}
            onChange={this.handleFollowerTextChange}
          />
          <button onClick={this.handleFollowerFetch}>Search Followers</button>
        </form>
        <div className="user-card">
        <User username={this.state.username} />
        </div>
        {this.state.followers.map(follower => <Followers name={follower.login} image={follower.avatar_url} html_url={follower.html_url}/>)}
      </div>
    )
  }
}

export default App;