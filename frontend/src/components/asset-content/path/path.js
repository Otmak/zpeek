import React, {Component} from 'react';
import './path.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateTimePicker from '../datetime/datetime-picker';
// import DateTimePicker from '../datetime/datetime-picker';

//add tooltip to help explain some functions
export default class Path extends Component {
	_isMounted = false;
	constructor(props){
		super(props)
		this.state = {
			data : [],
			pathexists : true,
			pathAnchorData : this.props.data,
			theId : this.props.data.id,
			startDate: new Date().setHours(0,0,0,0)/1000.0,
			endDate: new Date().setHours(23,59,0,0)/1000.0,
			isComponentMounted:true
		}
	}

	componentDidMount(){
		this._isMounted = true;
		// console.log('Mounted')
		// return this.fetchPathData() WORKS!
	
	}

	componentWillUnmount(){
		this._isMounted = false;
		this.setState({isComponentMounted : false})
  }

	// getDateTimeValue(e){
	// 	// consider getting the timestandp from submit to calculate how long your app takes
	// 	e.preventDefault()
	// 	console.log(this)
	// 	const {startDate, endDate, theId}  = this.state

	// 	const newDateCov = new Date() // can be used as NOW() time stamp
	// 	const defaultMidNightStart = newDateCov.setHours(0,0,0,0)
	// 	const defaultMidNightend = newDateCov.setHours(23,59,0,0)


	// 	console.log('Setting time to 00:00 :',defaultMidNightStart)
	// 	console.log('Setting time to 23:59 :',defaultMidNightend)


	// }

	getDateTime(e){

		let dateTimeValue = e.target.value
  		let dateTimeId  = e.target.id

  		console.log(dateTimeValue, dateTimeId)

  		let epTime = new Date(dateTimeValue)
		let selectedEpochTimeInMunites = epTime.getTime()/1000.0

  		this.setState({[dateTimeId]: selectedEpochTimeInMunites})
		
	}

	// convertTimeToEpoch(){
	// 	return ()=> {this.fetchPathData

	// }

	async fetchPathData ()  {
		// let start = 1603971032
		// let end = 1608230858
		const {pathAnchorData, theId, startDate, endDate, isComponentMounted} = this.state
		console.log('Start',this)

		let bodyData = {
			'params': {
				'stime': startDate,
				'etime': endDate,
				'pathAnchorData' : pathAnchorData 
					}}
		const makeRequest = await fetch('/path', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })
	    console.log('End',makeRequest)
		const getPathData = await makeRequest.json()
		console.log(getPathData)
		if (makeRequest.status === 200 && this._isMounted ) {
			if (getPathData.error) {
				console.log('Error in server bud')
				this.setState({pathexists : false})
			}else{
				if (getPathData.pathresponse[0].id == theId && this._isMounted) {
					this.setState({data : getPathData.pathresponse[0].events})
					console.log(getPathData.pathresponse[0].id, theId)
				}else{
					// this.setState({pathexists : false})
					return;
				}
			}
		}
		return 'Done'
	}


	render(){
		const { pathexists, theId, data, comingsoon } = this.state
		const pathReasonCodes = (reason) => {
			const referenceData = {
				0: 'r',
				1:	'Input 1 state change',
				2:	'Input 2 state change',
				3:	'Input 3 state change',
				4:	'Input 4 state change',
				5:	'Input 5 state change',
				6:	'Cold Start',
				7:	'Power Off',
				8:	'Geofence',
				9:	'Motion Stop',
				10:	'Motion Start',
				11:	'Standard Event',
				12:	'Power On',
				13:	'Panic'
			}

			const resultsArray = []
			if (typeof reason == 'string'){ 
				const reasonCodesArray = reason.split(',')
				for(let i=0; i<reasonCodesArray.length; i++ ){
					let inputResean = reasonCodesArray[i]
					// console.log('reason :',inputResean, '=>>>>>',referenceData[inputResean])

			  		if ( referenceData[inputResean] ){ // Put each input that exists in reference in resultsArray 
			  			resultsArray.push(referenceData[inputResean])
			 		 }	
				}
			}else{// if type not string
			console.log('Its a number or something other than string', reason)
			}
			return resultsArray
			}
		// console.log('LOGGING data.. :',data)
		// console.log(data, this)

		return (
			<React.Fragment>
				<DateTimePicker className='date-time-picker' getdata={ ()=> this.fetchPathData()} label='Get Path' getsdate={ (e) => this.getDateTime(e)} getedate={ (e) => this.getDateTime(e)}/>
				   { 
				   		<TableContainer component={Paper}>
   	   				      <Table className="classes.table" aria-label="simple table">
   	   				        <TableHead>
   	   				          <TableRow>
   	   				            <TableCell>Source</TableCell>
   	   				            <TableCell>Date Time&nbsp;(PST)</TableCell>
   	   				            <TableCell align="right">Speed&nbsp;(MPH)</TableCell>
   	   				            <TableCell align="right">Heading</TableCell>
   	   				            <TableCell align="right">Log Reason</TableCell>
   	   				            <TableCell align="right">Distance</TableCell>
   	   				            <TableCell align="right">Lat</TableCell>
   	   				            <TableCell align="right">Long</TableCell>
   	   				          </TableRow>
   	   				        </TableHead>
   	   				        <TableBody>
	   	   				        <TableRow>
	   	   				        {!pathexists && <TableCell align="center">No path Exists for this Asset</TableCell> }
	   	   				        </TableRow>
   	   				        </TableBody>
   	   				        <TableBody>
   	   				          {data.map((row) => (
   	   				            <TableRow key={row.time}>
   	   				              <TableCell component="th" scope="row">
   	   				                {row.source}
   	   				              </TableCell>
   	   				              <TableCell align="right">{row.time}</TableCell>
   	   				              <TableCell align="right">{row.speed}</TableCell>
   	   				              <TableCell align="right">{row.heading}</TableCell>
   	   				              <TableCell align="right">{pathReasonCodes(row.reasons)}</TableCell>
   	   				              <TableCell align="right">{row.distance_traveled}</TableCell>
   	   				              <TableCell align="right">{row.lat}</TableCell>
   	   				              <TableCell align="right">{row.lng}</TableCell>
   	   				            </TableRow>
   	   				          ))
   	   				          }
   	   				        </TableBody>
   	   				      </Table>
   	   				    </TableContainer>
				   	}
			</React.Fragment>
		)}
 }
