import React, { Component } from 'react';
import TabComponent from '../tabs/tab';
import SolidTab from '../tabs/tabpanel';
import HeaderAppBar from '../topbar/header-appbar';
// import HeaderAppBar from '../header/header-appbar';



export default class AppContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : props.data

		}
	}

  // console.log('PROPS INSIDE APPBARContainer COMP:' ,props)
  //   componentDidMount() {
  //   	const { data } = this.props

  //   fetch('/assets')
  //   .then(res=> res.json() )
  //   .then(data => this.setState({ assets: data }))
  // }

  // async fetchInitialData() {

  	

  // }

  render(){
  	console.log(this)
  	const { data } = this.state
  	  return (
	    <div>
	      <HeaderAppBar assets={this.props.assets}/> 
	      <SolidTab data={data}> </SolidTab>
	   </div>  
  )}
}
