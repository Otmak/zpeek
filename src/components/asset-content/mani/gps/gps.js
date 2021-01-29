import React, {Component} from 'react';
import './gps.css';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default class GPS extends Component {
	_isMounted = false;		
	constructor(props){
	super(props)
	this.state = {
	  data : this.props.data,
	  gpsData : [],
	  isGPSLoading : true,
	  isComponentMounted : true,
	  isParamEmpty : false
	}
	}

  componentDidMount(){
  	this._isMounted = true;
  	this.fetchGpsData()
  	this.setState({isComponentMounted : true})
  }

  componentWillUnmount(){
  	this._isMounted = false;
  	this.setState({isComponentMounted : false})
  }


  async fetchGpsData() {
	// console.log('fetching gps...')
	const { data : { id=null, gpsid=null, account, hashed }, isComponentMounted} = this.state
	this.setState({gpsData : [] })
		console.log('fetching.. ', gpsid)

	if ( !isComponentMounted || gpsid === null ){
		// console.log(`GPS :- Either Component unmounted or gps null mouted==>${isComponentMounted} gps==> ${gpsid}` )
		this.setState({isGPSLoading: false, isParamEmpty : true})
		return;
	}else{
		let bodyData = {
		'params': {
			'id': id,
			'gpsid': gpsid,
			'account': account, 
			'hashed': hashed
			}}
		const makeRequest = await fetch('/gpsunit', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })

	    // console.log('Status',makeRequest)
		const getGpsData = await makeRequest.json()
		// console.log(getManiData)

		if (makeRequest.status === 200 && this._isMounted ) {
			if (getGpsData.error) {
				console.log('Error in server bud')
				this.setState({isGPSLoading : false})
			}else{
				// console.log(getGpsData)
				this.setState({gpsData : getGpsData.gpsdata})
			}
		}else{
			// console.log(`Error after 200 or comp unmounted. is COMP mouted? ====> ${isComponentMounted}`)
			this.setSate({isGPSLoading: false})
		}
	}
	return 'Done'
	}

	gpsdataresponse = ()=>{
		const {gpsData, isGPSLoading, isParamEmpty} = this.state
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
  			return(
  				<div>
  					{ isGPSLoading && <span> Loading.... </span> }
	  				{ !isGPSLoading && isParamEmpty &&
	  					<div>
		  					<Typography align='center'>No gps data </Typography>
		  					<Button align='right' onClick={()=> this.fetchGpsData()} color="primary">Get gps</Button>
	  					</div>
	  				}
  				</div>
  				)
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
  	const {gpsData, isGPSLoading, isComponentMounted} = this.state
  	console.log('GPS :- ', this)
  	// console.log(`GPS:${gpsData}, is GPs loading?${gpsLoading}, is comp mounted?${isComponentMounted}`)

	return (
		<div>
			{ this.gpsdataresponse() }
		</div>
	  );
	}
}
