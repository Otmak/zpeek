import React, {Component} from 'react';
import './mani-main.css';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Tablet from './tablet/tablet';
import PhonelinkEraseIcon from '@material-ui/icons/PhonelinkErase';
import GpsOffIcon from '@material-ui/icons/GpsOff';
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
			maniexists : false,
			displayIt : true
		}
	}


	refresh(){
		this.setState({ displayIt : true })
	}


	render(){
		console.log('@@@@@@@@@@@@@@@@@@@',this)
		const { assetInfo : { id=null, gps=null, account, hashed }, displayIt} = this.state
		console.log(`asset id : ${id}, gpsid : ${gps}`)
		// console.log(this)
		return(
			<div>
			{ displayIt &&
				<div className='mani-holder-container'>
					<Accordion className='main-asset-data-panel' key={id} defaultExpanded>
			          <AccordionSummary
			            expandIcon={<ExpandMoreIcon />}
			            aria-controls="panel1c-content"
			            id="panel1c-header"
			            className='left-helper'
			          
			          > 
			            <div className='column'>
			              { gps === null ? <PhonelinkEraseIcon /> : <TabletAndroidIcon />}
			            </div>
			            <div className='column'>
			              {gps === null ? <GpsOffIcon/> : <GpsFixedIcon/> }
			            </div>
			          </AccordionSummary>

			          <AccordionDetails>
			            <div className='column left-helper'>
			            	<Tablet data={{'id':id,'gpsid':gps,'account': account, 'hashed': hashed}}/>
			            </div>
			            <div className='column left-helper'>
			              <GPS data={{'id':id,'gpsid':gps,'account': account, 'hashed': hashed}}/>
			            </div>
			            <div className='column helper'>
			              <Typography variant="caption"> Select your destination of choice <br />
			                <a href="#secondary-heading-and-columns" > Learn more</a>
			              </Typography> 
			              <br/>
			            
			              <Location data={{'id':id,'gpsid':gps,'account': account, 'hashed': hashed}}/>
			            </div>
			          </AccordionDetails>

			          <Divider />
			          <AccordionActions>
			        
			            <Button onClick={()=>this.refresh()} size="small" color="primary">
			              Refresh
			            </Button>
			           </AccordionActions>
		           </Accordion>
				</div>
			}
		</div>
	)}
}
