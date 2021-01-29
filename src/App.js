import React, { Component } from 'react';
import AppContainer from './components/app-container/app-container';
import ElevateAppBar from './components/app-container/app-container';
import SignInFirst from './components/signin/signin'
import './App.css';

// add Tooltips all across app
//https://material-ui.com/components/snackbars/ use these bars to show a console log activity
// https://material-ui.com/components/dialogs/ this is for swapping account code and Full screen  gendata or path\
//https://material-ui.com/components/lists/ use this for layout of CONTROL MENU
export default class App extends Component {
  _isMounted = false;
  constructor(){
  super()
  this.state = {
    assets: [],
    searchFeild: '',
    viewBothActiveAndInactive : false,
    weGot200 : false
    // accountCode : '',
    // password : ''
   }
  }

  componentDidMount() {
     this._isMounted = true;
     const VIP = localStorage.getItem('alreadyHere')
     if (  VIP ) {
      this.setState({ weGot200 : true})

     }
  }


    componentWillUnmount() {
    this._isMounted = false;
  }


  getGettingStartedData(e){
    // console.log(`${e.target.name}, : ${e.target.value}`)
    // const {accountCode, password} this.state
    const handle = e.target.name
    const handleValue = e.target.value
    console.log( handle,':',handleValue)
    this.setState({ [handle] : handleValue })
    // console.log(e.target.name, )

  }


  async letsGetStarted(e){
    e.preventDefault()
    const validate = (v) =>  v === '' || v === undefined ? false : true 

      // if (v === '' || v === undefined) {
      //   // console.log('Your params are weak bruh')
      //   return false
      // }else{
      //   return true

      // }
      
    
    const {accountCode, passWord} = this.state
    // console.log(validate(accountCode) === validate(passWord), validate(accountCode), validate(passWord))
    if ( validate(accountCode) && validate(passWord)) {
      // console.log(`Account : ${accountCode}  password ${passWord}`)
      const bodyData = {
        'account' : accountCode,
        'hashed' : passWord
      }

      const makeRequest = await fetch('/assets', {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {'Content-Type': 'application/json'}
      })

      const getInitialData = await makeRequest.json()
      console.log(makeRequest.status)
      if ( makeRequest.status === 200 && !getInitialData.error) {//this._isMounted
        console.log(getInitialData)
        this.setState({ weGot200 : true, assets : getInitialData})
        
      }else {
        console.log('ERROR:',getInitialData)
      }
      // console.log('Making initial call with ....', accountCode, passWord)
    }else {
      console.log('the form is empty...')
      // console.log(`Account : ${accountCode}  password ${passWord}`)
    }
  }

  
  render() {
    const {assets, accountCode, passWord, weGot200 } = this.state
    // const assetListLenghth = assets.length
    // const activeAssetsList = assets.filter( asset=> asset.status == '1')
    console.log(`Is it 200? ${weGot200}`)
    console.log(this)


    // if ( weGot200 ) {
    //   return(
    //       <div className='App'>
    //         <AppContainer data={{'account': accountCode, 'pass':passWord }}/>
    //       </div>
    //   )} 

    return (
      <div className='App'>
        { weGot200 && <AppContainer data={{'account': accountCode, 'hashed':passWord, 'assetdata': assets }}/>}
        { !weGot200 && <SignInFirst getFormData={(e)=>this.getGettingStartedData(e)} letsGetStarted={(e)=>this.letsGetStarted(e)}/>}
      </div>
  )}
}
