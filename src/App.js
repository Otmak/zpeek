import React, { Component } from 'react';
import AppContainer from './components/app-container/app-container';
import ElevateAppBar from './components/app-container/app-container';
import './App.css';


class App extends Component {
    constructor(){
    super()
    this.state = {
      assets: [],
      searchFeild: '',
      viewBothActiveAndInactive : false
     }
  }

  componentDidMount() {
    fetch('/assets')
    .then(res=> res.json() )
    .then(data => this.setState({ assets: data }))

  }

  bothActiveAndInactive(){
    //function to change view from active only to BothActive and inactive
  }

  
  render() {
    const {assets} = this.state
    const assetListLenghth = assets.length
    const activeAssetsList = assets.filter( asset=> asset.status == '1')
    // console.log(assetListLenghth)
    return (
      <div className='App'>
        <AppContainer assets={activeAssetsList} />
      </div>
    )
  }
}

export default App;