import React, { Component } from 'react';
import ElevateAppBar from './components/app-container/app-container';
import './App.css';

class App extends Component {
    constructor(){
    super()
    this.state = {
      assets: [],
      searchFeild: ''
     }
  }

  componentDidMount() {
    fetch('/assets')
    .then(res=> res.json() )
    .then(data => this.setState({ assets: data }) )
  }
  render() {
    // console.log('LOGGING STATE:',this.state)
    return (
      <div className='App'>
        <ElevateAppBar assets={this.state.assets} />
      </div>
    )
  }
}

export default App;