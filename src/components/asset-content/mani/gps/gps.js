import React, {Component} from 'react';
import './gps.css';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default class GPS extends Component {

  constructor(props){
    super(props)
    this.state = {
      data : this.props.data,
      gpsData : [],
      gpsLoading : true
    }
  }

  componentDidMount(){
  	this.fetchManiData()
  }

  async fetchManiData() {
	console.log('fetching MANI')
	const { data : { id=null, gpsid=null }} = this.state

	if (gpsid === null){
		console.log('This asset has no GPSID')
		this.setState({gpsLoading: false})
	}else{
		let bodyData = {
		'params': {
			'id': id,
			'gpsid': gpsid
			}}
		const makeRequest = await fetch('/gpsunit', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })

	    // console.log('Status',makeRequest)
		const getGpsData = await makeRequest.json()
		// console.log(getManiData)

		if (makeRequest.status === 200) {
			if (getGpsData.error) {
				console.log('Error in server bud')
				this.setState({gpsLoading : false})
			}else{
				// console.log(getGpsData)
				this.setState({gpsData : getGpsData.gpsdata})
			}
		}else{
			this.setSate({gpsLoading: false})
		}
	}
	return 'Done'
	}

	gpsdataresponse = ()=>{
		const {gpsData} = this.state
  		const gpsList =  [
	  		{
	  			'name':'Asset DB ID',
				'id':'assetdbid'
			}, {
				'name':'Firmware',
				'id':'firmware'
			}, {
				'name':'Gps DB ID',
				'id':'gpsdbid'
	  		},{
	  			'name': 'Last Phone Home',
	  			'id': 'lastcallhome'
	  		},{
	  			'name': 'Last Inspection Date',
	  			'id': 'lastinspectiondate'
	  		},{
	  			'name': 'Last Position Date',
	  			'id': 'lastpositiondate'
	  		},{
	  			'name': 'Sim Card Number',
	  			'id': 'scid'
	  		}
  		]
  		// console.log('functin working')


  		if (gpsData[0] === undefined) {
  			// console.log('No gps data')
  			return(<Typography align='center'>No gps data </Typography>)
  		}else{
  			const getGPSDATA = gpsData[0]
  			// console.log(getGPSDATA,getGPSDATA[0])
  			return (
  				<div>
	  				<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1">
								GPS ID
							</Typography>
						</Grid>
			        <Grid item>
			            <Typography gutterBottom variant="h6">
			              {getGPSDATA['gpsid']}
			            </Typography>
			        </Grid>
				     <br/>

				    </Grid>
	  				{gpsList.map(i=>{
	  				// console.log('its working')
	  				return(
						<Grid className='gps-grid-container' key={i.id} container alignItems="center">
							<Grid item xs>
							  <Typography color="textSecondary" variant="body2">
							  	{i.name}
							  </Typography>
							</Grid>			          
							<Grid item>
							  <Typography color="textSecondary" variant="body2">
							  	{getGPSDATA[i.id] === null || getGPSDATA[i.id] === '' ? '-' : getGPSDATA[i.id]}
							  </Typography>
							</Grid>
						</Grid>
	  			 	)
	  			})}
  				</div>
  			)
  		}
  	}

  render(){
  	// const {gpsData} = this.state
  	console.log(this)

	return (
		<div>
			{this.gpsdataresponse()}
		</div>
	  );
	}
}
