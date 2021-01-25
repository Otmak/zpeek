import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import './location.css';


export default class Location extends Component{
	constructor (props){
		super(props)
		this.state = {
			locationDetails : [],
			data : this.props.data,
			isComponentMounted : false
		}
	}

	componentDidMount(){
		this.fetchManiData()
		this.setState({isComponentMounted : false})
	}


	componentWillUnmount(){
		this.setState({isComponentMounted : false})
    }

  	async fetchManiData() {

		console.log('fetching location...')
		const { data : { id=null, gpsid=null }, isComponentMounted} = this.state
		this.setState({locationDetails : []})

		if (gpsid === null){
			console.log(` Location :- Either Component unmounted or gps null unmouted==>${isComponentMounted} gps==> ${gpsid}`)
			this.setState({gettingLocation: false})
			return;
		}else{
			let bodyData = {
			'params': {
				'id': id,
				'gpsid': gpsid
				}}
			const makeRequest = await fetch('/location', {
		        method: 'POST',
		        body: JSON.stringify(bodyData),
		        headers: {'Content-Type': 'application/json'}
		    })
		    console.log('End',makeRequest)
			const getLocationData = await makeRequest.json()
			// console.log(getLocationData)


			if (makeRequest.status === 200) {
				if (getLocationData.error) {
					console.log('Error in server ',getLocationData.error )
					this.setState({maniexists : false})
				}else{
					if (getLocationData) {
						this.setState({locationDetails : getLocationData.locationresponse})
						// console.log(getLocationData)
					}else{
						// this.setState({pathexists : false})
						console.log('Error AFTER 200 status on fetch')
					}
				}
			}else{
				this.setSate({gettingMani: false})
			}
		}

		return 'Done'
	}

	render(){

		const {locationDetails} = this.state
		console.log(locationDetails)
		return(
			<div>
				{
					locationDetails.power == 'on' ? <Chip className='chip-on' label='On'/> : <Chip className='chip-off' label='Off'/>
				}
			</div>
			)
	}
}