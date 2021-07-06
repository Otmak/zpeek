import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import Button from '@material-ui/core/Button';
import './location.css';


export default class Location extends Component{
	_isMounted = false;
	constructor (props){
		super(props)
		this.state = {
			locationDetails : [],
			data : this.props.data,
			isComponentMounted : true,
			isLocationLoading : true
		}
	}

	componentDidMount(){
		this._isMounted = true;
		this.fetchLocationData()
		this.setState({isComponentMounted : true})
	}


	componentWillUnmount(){
		this._isMounted = false;
		console.log('Location COMPONENT UNMOUNTED')
		this.setState({isComponentMounted : false})
    }

  	async fetchLocationData() {

		console.log('fetching location...')
		this.setState({locationDetails : []})
		const { data : { id=null, gpsid=null, account, hashed }, isComponentMounted} = this.state


		console.log('State Cleared!...........',isComponentMounted)
		

		if (!isComponentMounted || gpsid === null){
			// console.log(` Location :- Either Component unmounted or gps null mouted?==>${isComponentMounted} gps==> ${gpsid}`)
			this.setState({isLocationLoading: false})
			return;
		}else{
			console.log('L :- setting state of Loading to TRUE ')
			this.setState({isLocationLoading : true})
			let bodyData = {
			'params': {
				'id': id,
				'gpsid': gpsid,
				'account':account,
				'hashed':hashed
				}}
			const makeRequest = await fetch('/location', {
		        method: 'POST',
		        body: JSON.stringify(bodyData),
		        headers: {'Content-Type': 'application/json'}
		    })
		    // console.log('End',makeRequest)
			const getLocationData = await makeRequest.json()
			console.log('Done making request',getLocationData, isComponentMounted)


			if (makeRequest.status === 200 && this._isMounted ) {
				if (getLocationData.error) {
					console.log('Error in server ',getLocationData.error )
					this.setState({isLocationLoading : false})
				}else{
					if (getLocationData && isComponentMounted && this._isMounted) {
						console.log('Location on the way!')
						this.setState({locationDetails : getLocationData.locationresponse, isLocationLoading : false})
						// console.log(getLocationData)
					}else{
						// this.setState({pathexists : false})
						console.log('Error AFTER 200 status on fetch')
					}
				}
			}else{
				console.log(`Error AFTER 200 status on fetch or Component is unmounted... COMP mounted?==>${this._isMounted}`)
				// this.setSate({gettingMani: false})
				return;
			}
		}

		return 'Done'
	}


	Locationdataresponse = ()=>{
		const {locationDetails, data, isLocationLoading} = this.state
		console.log(locationDetails.length)

  		if (locationDetails.length === 0) {
  			// console.log('No gps data')
  			return(
  				<div>
  					{ isLocationLoading &&
  						<div>
							<Skeleton style={{ height:80 }}/>
							<Skeleton style={{ height:30 }}/>
							<Skeleton style={{ height:30 }}/>
							<Skeleton />
  						</div> 
  					}
	  				{ !isLocationLoading && 
	  					<div>
		  					<Typography align='center'>No Location Data </Typography>
		  					<Button align='right' onClick={()=> this.fetchLocationData()} color="primary">Get Location</Button>
	  					</div>
	  				}
  				</div>
  				)
  		}else{
  			const getGPSDATA = locationDetails[0]
  			// console.log(getGPSDATA,getGPSDATA[0])
  			return (
  				<div>
	  				<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1">
								VEHICLE POWER
							</Typography>
						</Grid>
			        <Grid item>
			            <Typography gutterBottom variant="h6">
			            	{ locationDetails.power === "on" ? <LocalShippingOutlinedIcon style={{ color: "#29d28b" }}/> : <LocalShippingOutlinedIcon style={{ color: "red" }}/>}
			                { locationDetails.power}
			            	

			            </Typography>
			        </Grid>
				     <br/>

				    </Grid>
				    <Grid className='gps-grid-container' container alignItems="center">
						<Grid item xs>
						  <Typography color="textSecondary" variant="body2">
						  	SPEED
						  </Typography>
						</Grid>			          
						<Grid item>
						  <Typography color="textSecondary" variant="body2">
						  	{ locationDetails.speed }{ locationDetails.sunit}
						  </Typography>
						</Grid>
					</Grid>				    

					<Grid className='gps-grid-container' container alignItems="center">
						<Grid item xs>
						  <Typography color="textSecondary" variant="body2">
						  	TIME
						  </Typography>
						</Grid>			          
						<Grid item>
						  <Typography color="textSecondary" variant="body2">
						  	{locationDetails.time}
						  </Typography>
						</Grid>
					</Grid>
					<Grid className='gps-grid-container' container alignItems="center">
						<Grid item xs>
						  <Typography color="textSecondary" variant="body2">
						  	LAT/LON
						  </Typography>
						</Grid>			          
						<Grid item>
						  <Typography color="textSecondary" variant="body2">
						  	{locationDetails.lat}
						  	{locationDetails.lon}
						  </Typography>
						</Grid>
					</Grid>

	  			  <div className=''>
			        <Button onClick={()=> this.fetchLocationData()} color="primary">Get Location</Button>
			      </div>
  				</div>
  			)
  		}
  	}

	render(){

		const {locationDetails, isLocationLoading} = this.state
		const functionn = ()=> this.fetchLocationData()
		console.log('LOCATION:',this)

		return(
			<div>
				{ isLocationLoading &&  
					<div>
						<Skeleton style={{ height:80 }}/>
						<Skeleton />
						<Skeleton />
						
  					</div>  
  				}
				{!isLocationLoading &&
					<div>
						{this.Locationdataresponse()}
					</div>
				}
			</div>
		)}
}