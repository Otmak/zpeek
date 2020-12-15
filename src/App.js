import React, { Component } from 'react';
// import SignInSide from './components/signin/signin';
import VerticalTabs from './components/tabs/VerticalTabs';
import './App.css';

class App extends Component {
    constructor(){
    super()
    this.state = {
      assets: [],
      searchFeild: ''
     }
  }

  // componentDidMount() {
  //   fetch('/assets')
  //   .then(res=> res.json() )
  //   .then(data => this.setState({ assets: data }) )
  //   // console.log(monsters)
  // }
  render() {
    // console.log(this.state)
    return (
            <div className='App'>
                   <VerticalTabs assets={this.state.assets} />
            </div>
            )
  }
}

export default App;