import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
		this.fetchManiData()
		this.setState({isComponentMounted : true})
	}


	componentWillUnmount(){
		this._isMounted = false;
		console.log('Location COMPONENT UNMOUNTED')
		this.setState({isComponentMounted : false})
    }

  	async fetchManiData() {

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
				// console.log(`Error AFTER 200 status on fetch or Component is unmounted... COMP mounted?==>${isComponentMounted}`)
				this.setSate({gettingMani: false})
				return;
			}
		}

		return 'Done'
	}

	render(){

		const {locationDetails, isLocationLoading} = this.state
		const functionn = ()=> this.fetchManiData()
		console.log('LOCATION:',this)
		return(
			<div>
				{ isLocationLoading && <span> Loading..... </span> }
				{!isLocationLoading &&
					<div> 

						{locationDetails.power === 'on' ? <Chip className='chip-on' label='On' onClick={functionn} /> : <Chip className='chip-off' label='Off'/> }
					</div>
				}
			</div>
		)}
}