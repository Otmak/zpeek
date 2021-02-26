import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './date-time-picker.css'

export default class DateTimePicker extends Component  {
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }

  // getDateTimeValue (e) {
  // 	console.log('LOGGING EVENT....',e.target.id)
  // 	let dateTimeValue = e.target.value
  // 	let dateTimeId  = e.target.id

  // 	return ()=> this.setSate({[dateTimeId]: dateTimeValue})

  // 	// let dateTimeData = {
  // 	// 	'starttime' : e.target.value,
  // 	// 	'endtime': e.target.}

  // 	// let sTimeId = e.target.id
  // 	// let eTimeId = e.target.id
  //   // console.log('FROM datetime','ID :', dateTimeId, '>>>>>>>>>>>>>>>.', 'TIME :', dateTimeValue, this)

  // }
  // componentDidUpdate(){
  // 	console.log(this)
  // }

  render(){
  	  // console.log(this.props)
      return (
		<div>
			<TextField
			id="startDate"
			variant='outlined'
			label="Start"
			type="datetime-local"
			onChange={this.props.getsdate}
			InputLabelProps={{ shrink: true,}}
		 	/>
		 	<TextField
			id="endDate"
			variant='outlined'
			label="End"
			type="datetime-local"
			onChange={ this.props.getedate}
			InputLabelProps={{ shrink: true,}}
			 />
			      <Button onClick={this.props.getdata} variant="outlined" color="primary" href="#outlined-buttons"> {this.props.label} </Button>
		</div>
    )}

}
