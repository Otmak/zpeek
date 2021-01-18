// import React, { Component } from "react";
// import TextField from '@material-ui/core/TextField';

// class DateTimePicker extends Component  {
//   constructor(props){
//     super(props)
//     this.state = {
//       data : []
//     }
//   }

//   getDateTimeValue (e) {
//   	console.log('LOGGING EVENT....',e.target.id)
//   	let dateTimeValue = e.target.value
//   	let dateTimeId  = e.target.id

//   	return ()=> this.setSate({[dateTimeId]: dateTimeValue})

//   	// let dateTimeData = {
//   	// 	'starttime' : e.target.value,
//   	// 	'endtime': e.target.}

//   	// let sTimeId = e.target.id
//   	// let eTimeId = e.target.id
//     // console.log('FROM datetime','ID :', dateTimeId, '>>>>>>>>>>>>>>>.', 'TIME :', dateTimeValue, this)

//   }
//   componentDidUpdate(){
//   	console.log(this)
//   }

//   render(){
//   	  console.log(this)
//       return (
//         <div  >
// 				<TextField
// 					id="startDate"
// 					variant='outlined'
// 					label="Start"
// 					type="datetime-local"
// 					onChange={ (e) => this.getDateTimeValue}
// 					InputLabelProps={{ shrink: true,}}
// 				 />
// 				 <TextField
// 					id="endDate"
// 					variant='outlined'
// 					label="End"
// 					type="datetime-local"
// 					onChange={ (e) => this.getDateTimeValue(e)}
// 					InputLabelProps={{ shrink: true,}}
// 				 />

//        </div>
//       );
//   }

// }



// export default DateTimePicker;