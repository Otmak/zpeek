import React, {Component} from 'react';
import './tablet.css'
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';



export default class Tablet extends Component {

  constructor(props){
    super(props)
    this.state = {
      data : this.props.data,
      tabletMani : [],
      gettingMani : true,
      isComponentMounted : false
    }
  }

  componentDidMount(){
  	this.fetchManiData()
  	this.setState({isComponentMounted : true})
  	
  }

    componentWillUnmount(){
  	this.setState({isComponentMounted : false})
  }


  hoverAction(){
  	console.log('hover')
  }


  async fetchManiData() {

	console.log('fetching MANI')
	// const { assetInfo : { id=null, gps=null }} = this.state
	this.setState({tabletMani : []})
	console.log(this)
	const { data : { id=null, gpsid=null }, isComponentMounted} = this.state


	if (gpsid === null){
		console.log(` Tablet :- Either Component unmounted or gps null unmouted==>${isComponentMounted} gps==> ${gpsid}`)
		this.setState({gettingMani: false})
		return;
	}else{
		let bodyData = {
		'params': {
			'id': id,
			'gpsid': gpsid
			}}
		const makeRequest = await fetch('/mani', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })
	    console.log('End',makeRequest)
		const getManiData = await makeRequest.json()
		// console.log(getManiData)


		if (makeRequest.status === 200) {
			if (getManiData.error) {
				console.log('Error in server bud')
				this.setState({maniexists : false})
			}else{
				if (getManiData) {
					this.setState({tabletMani : getManiData.maniresponse})
					console.log(getManiData)
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


	validateData (){

  		const {tabletMani : {assetInfo, packageManifest, firmware}, gettingMani} = this.state
  		console.log('from tablet',packageManifest)
  		console.log('LOODING..', gettingMani)
  		if (packageManifest === undefined) {

  			console.log('Getting MANI?', gettingMani)
  			return (
  					<div>
  					<Typography align='center'>No Manifest Data </Typography>
  					<Button align='right' onClick={()=> this.fetchManiData()} color="primary">Get Mani</Button>
  					</div>
  				)
  		}else{

  			const som = ''
  			const tabletType = firmware.buildNumber.split('-')[0] === 'CONNECT'? 'CONNECT' : ''
  			const handleList = [
  				{
  					'name':'Asset ID',
  					'id':'assetId'
  				}, {
  					'name':'Ecu Vin',
  					'id':'ecuVin'
  				}, {
  					'name':'Tag Number',
  					'id':'tagNumber'
  				}]
  			// this.setState({gettingMani : false})
  			console.log('Still getting MANI', gettingMani)
  			return (
  				<div className='tablet-div-container'>
			      <div className=''>
			        <Grid container alignItems="center">
			          <Grid item xs>
			            <Typography gutterBottom variant="subtitle1">
			              {tabletType}
			            </Typography>
			          </Grid>
			          <Grid item>
			            <Typography gutterBottom variant="h6">
			              {`v ${firmware.versionCode}`}
			            </Typography>
			          </Grid>
			        

			        </Grid>
			      	{
			      		handleList.map( i =>{
			      			return (
			      				<Grid className='tablet-grid' key={i.id} container alignItems="center">
		  				          <Grid item xs>
		  					          <Typography color="textSecondary" variant="body2">
		  					          	{i.name}
		  					       	 </Typography>
		  					       </Grid>			          
		  					       <Grid item>
		  					          <Typography color="textSecondary" variant="body2">
		  					          	{ assetInfo[i.id]=== null ? '-' : assetInfo[i.id] }
		  					       	 </Typography>
		  					       </Grid>
		  					    </Grid>
	  					    )
			      		}
			      		)
			      	}
			      </div>
			      <Divider variant="middle" />
			      <div className=''>
			        <Typography gutterBottom variant="body1">
			          
			        </Typography>
			        <div> Apps : 
			          {
			          	packageManifest.apps.map( i=>(
	          		      <Chip
	          		      	key={i.zonarAppId}
					        label={i.label}
					        clickable
					        color="primary"
					        variant="outlined"
					        onMouseOver={()=>this.hoverAction()}
					      />
			          	))
			          }
			        </div>
			      </div>
			      <div className=''>
			        <Button onClick={()=> this.fetchManiData()} color="primary">Get Mani</Button>
			      </div>
	    		</div>
  				)
  		}
  	}

  render(){
  	// const {assetInfo, packageManifest} = this.state.tabletMani

  	console.log(this)
	return (
		<div>
			{this.validateData()}
		</div>
	  );
	}
}
