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
    wasAlreadyHere: false,
    viewBothActiveAndInactive : false,
    weGot200 : false,
    accountCode : localStorage.getItem('entryCardAccount'), 
    passWord : localStorage.getItem('entryCardHash')
   }
  }

  componentDidMount() {
    // localStorage.clear();
    console.log('MOUNTED!=======>', this)
     this._isMounted = true;
     const { accountCode, passWord } = this.state
     const validate = (v) =>  v === '' || v === undefined || v === null ? false : true 
     // console.log('test', false && false)
     console.log('Component mounted =>' ,`account code : ${accountCode}, hash: ${passWord} `)

     if (validate(accountCode) && validate(passWord)){
      this.letsGetStarted()
      this.setState({wasAlreadyHere : true})
        }else{
          console.log('The data is null', this)
          return;
        }
  }


    componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(){
    console.log('UPDATED', this)

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


  async letsGetStarted(){
    const {accountCode, passWord} = this.state
    console.log('Submiting..' ,`account code : ${accountCode}, hash: ${passWord} `)
    const validate = (v) =>  v === '' || v === undefined || v === null ? false : true 

    if ( validate(accountCode) && validate(passWord)) {
      // console.log(`Account : ${accountCode}  password ${passWord}`)
      const bodyData = {
        'account' : accountCode,
        'hashed' : passWord
      }
      localStorage.setItem('entryCardAccount', accountCode)
      localStorage.setItem('entryCardHash', passWord)


      const makeRequest = await fetch('/assets', {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {'Content-Type': 'application/json'}
      })

      const getInitialData = await makeRequest.json()
      if ( makeRequest.status === 200 && !getInitialData.error) {//this._isMounted
        console.log(getInitialData)
        this.setState({ assets : getInitialData, weGot200 : true, wasAlreadyHere : false})
        
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
    const {assets, accountCode, passWord, weGot200, wasAlreadyHere } = this.state
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
        // { wasAlreadyHere &&  <AppContainer data={{'assetdata': assets }}/>}
    return (
      <div className='App'>
        { weGot200 &&  <AppContainer data={{'account': accountCode, 'hashed':passWord, 'assetdata': assets }}/>}
        { wasAlreadyHere &&  <AppContainer data={{'assetdata': assets }} /> }
        { !weGot200 && ! wasAlreadyHere ? <SignInFirst getFormData={(e)=>this.getGettingStartedData(e)} letsGetStarted={()=>this.letsGetStarted()}/>:''}
      </div>
  )}
}
