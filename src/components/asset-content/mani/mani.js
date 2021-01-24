import React, {Component} from 'react';
import './mani-main.css';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Tablet from './tablet/tablet';
import GPS from './gps/gps';
import Location from './location/location';
import Accordion from '@material-ui/core/Accordion';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


//use the cip array to show Apps on a tablet
export default class Mani extends Component {
	constructor(props){
		super(props)
		this.state = {
			tabletMani: [],
			assetInfo : this.props.data,
			maniexists : false
		}
	}

	async fetchManiData() {

		console.log('fetching MANI')
		const { assetInfo : { id=null, gps=null }} = this.state

		if (gps === null){
			console.log('This asset has no GPSID')
		}else{
			let bodyData = {
			'params': {
				'id': id,
				'gpsid': gps
				}}
			const makeRequest = await fetch('/mani', {
		        method: 'POST',
		        body: JSON.stringify(bodyData),
		        headers: {'Content-Type': 'application/json'}
		    })
		    console.log('End',makeRequest)
			const getManiData = await makeRequest.json()
			console.log(getManiData)


			if (makeRequest.status === 200) {
				if (getManiData.error) {
					console.log('Error in server bud')
					this.setState({maniexists : false})
				}else{
					if (getManiData) {
						this.setState({tabletMani : getManiData.maniresponse})
						console.log(getManiData)
					}else{
						this.setState({maniexists : false})
					}
				}
			}
		}
		return 'Done'
	}

	render(){
		// console.log(this)
		const { assetInfo : { id=null, gps=null }, tabletMani=[]} = this.state
		console.log('asset info:', id,gps)
		console.log(this)
		return(
			<div className='mani-holder-container'>
				<Accordion className='main-asset-data-panel' key={id} defaultExpanded>
		          <AccordionSummary
		            expandIcon={<ExpandMoreIcon />}
		            aria-controls="panel1c-content"
		            id="panel1c-header"
		            className='left-helper'
		          > 
		            <div className='column'>
		              <TabletAndroidIcon />
		            </div>
		            <div className='column'>
		              <GpsFixedIcon/>
		            </div>
		          </AccordionSummary>

		          <AccordionDetails>
		            <div className='column left-helper'>
		            	<Tablet data={{'id':id,'gpsid':gps}}/>
		            </div>
		            <div className='column left-helper'>
		              <GPS data={{'id':id,'gpsid':gps}}/>
		            </div>
		            <div className='column helper'>
		              <Typography variant="caption"> Select your destination of choice <br />
		                <a href="#secondary-heading-and-columns" > Learn more</a>
		              </Typography> 
		              <br/>
		              <Chip label="location" onDelete={() => {}} />
		              <Location data={{'id':id,'gpsid':gps}}/>
		            </div>

		          </AccordionDetails>

		          <Divider />
		          <AccordionActions>
		        
		            <Button onClick={()=> this.fetchManiData()} size="small" color="primary">
		              Refresh
		            </Button>
		           </AccordionActions>
	           </Accordion>
			</div>
		)
	}
}
