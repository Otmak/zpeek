import React, {Component} from 'react';



export default class Location extends Component{
	constructor (props){
		super(props)
		this.state = {
			LocationDetails : [],
			data : this.props.data
		}
	}


	componentDidMount(){
		this.fetchManiData()
	}
  	async fetchManiData() {

		console.log('fetching location...')
		const { data : { id=null, gpsid=null }} = this.state
		this.setState({LocationDetails : []})

		if (gpsid === null){
			console.log('This asset has no GPSID')
			this.setState({gettingMani: false})
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
			console.log(getLocationData)


			if (makeRequest.status === 200) {
				if (getLocationData.error) {
					console.log('Error in server ',getLocationData.error )
					this.setState({maniexists : false})
				}else{
					if (getLocationData) {
						this.setState({LocationDetails : getLocationData.locationresponse})
						console.log(getLocationData)
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
		return(
			<div>
			</div>
			)
	}
}