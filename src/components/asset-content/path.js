import React, {Component} from 'react';
import './path.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class Path extends Component {
	constructor(props){
		super(props)
		this.fetchPathData = this.fetchPathData.bind(this)
		this.state = {
			data :[],
			pathexists : true,
			theId : this.props.data
		}
	}

	componentDidMount(){
	}

	async fetchPathData (params)  {
		let start = 1603971032
		let end = 1608230858
		let dbId = params
		console.log(this)
		this.setState({data : []})
		let bodyData = {
			'params': {
				'stime': start,
				'etime': end,
				'dbId' : dbId 
					}}
		const makeRequest = await fetch('/path', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })
	    console.log(this)
		const getPathData = await makeRequest.json()
		console.log(getPathData)
		if (makeRequest.status === 200) {
			if (getPathData.error) {
				console.log('Error in server bud')
				this.setState({pathexists : false})
			}else{
				if (getPathData.pathresponse[0].id == dbId) {
					this.setState({data : getPathData.pathresponse[0].events})
					console.log(getPathData.pathresponse[0].id, dbId)
				}else{
					this.setState({pathexists : false})
				}
			}
		}
		// console.log(makeRequest.status, getPathData)
		return 'Done'
	}
	render(){
		const {pathexists, theId, data, comingsoon} = this.state
		function createData(name, calories, fat, carbs, protein) {
		  return { name, calories, fat, carbs, protein };
		}
		// console.log('LOGGING data.. :',data)
		// console.log(data, this)
		return (
			<div>
				<button onClick={() => this.fetchPathData(theId)}> get path</button>
				   { data &&
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
   	   				              <TableCell align="right">{row.reasons}</TableCell>
   	   				              <TableCell align="right">{row.distance_traveled}</TableCell>
   	   				              <TableCell align="right">{row.lat}</TableCell>
   	   				              <TableCell align="right">{row.lng}</TableCell>
   	   				            </TableRow>
   	   				          ))}
   	   				        </TableBody>
   	   				      </Table>
   	   				    </TableContainer>
				   	}
			</div>
			)
	}
 }

export default Path;