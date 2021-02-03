import React, {Component} from 'react';
import './tablet.css';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';



export default class Tablet extends Component {
	_isMounted = false;
	constructor(props){
	super(props)
	this.state = {
	  data : this.props.data,
	  tabletMani : [],
	  gettingMani : true,
	  isComponentMounted : true
	}
	}

	componentDidMount(){
		this._isMounted = true;
		this.fetchManiData()
		this.setState({isComponentMounted : true})
		
	}

    componentWillUnmount(){
    	this._isMounted = false;
  }


  hoverAction(arg){
  	console.log('hover',arg)

  }


  async fetchManiData() {

	console.log('getting ready for tablet mani...')
	this.setState({tabletMani : []})
	// console.log(this)
	const { data : { id=null, gpsid=null, account, hashed }, isComponentMounted} = this.state


	if (!isComponentMounted || gpsid === null){//add !isComponentMounted ||
		console.log(` Tablet :- Either Component unmounted or gps null mouted==>${isComponentMounted} gps==> ${gpsid}`)
		this.setState({gettingMani: false})
		return;
	}else{
		let bodyData = {
		'params': {
			'id': id,
			'gpsid': gpsid,
			'account': account, 
			'hashed': hashed
			}}
		console.log('Seeting State GetMani to TRUE')
		this.setState({gettingMani : true})
		console.log(' State cleared, fetching tablet mani...')

		const makeRequest = await fetch('/mani', {
	        method: 'POST',
	        body: JSON.stringify(bodyData),
	        headers: {'Content-Type': 'application/json'}
	    })
	    // console.log('End',makeRequest)
		const getManiData = await makeRequest.json()
		console.log(getManiData)

		if (makeRequest.status === 200) {
			if (getManiData.error) {
				console.log('Error in server bud.....also setting State getMani to false')
				this.setState({gettingMani :false})
			}else{
				if (getManiData && this._isMounted ) {
					console.log(getManiData)
					this.setState({tabletMani : getManiData.maniresponse})
				}else{
					// this.setState({pathexists : false})
					console.log('Error AFTER 200 status on fetch')
					return;
				}
			}
		}else{
			console.log(`Error AFTER 200 status on fetch or Component is unmounted... (is COMP mounted? ${isComponentMounted}), id=${id}, fetched res id=${getManiData.maniresponse}`)
			return;
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
  						{gettingMani && <span> Loading... </span>}
	  					{ !gettingMani &&
	  						<div>
	  						<Typography align='center'>No Manifest Data </Typography>
	  						<Button align='right' onClick={()=> this.fetchManiData()} color="primary">Get mani</Button>
	  						</div>
	  				
	  					}
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
  			console.log('Still getting MANI?', gettingMani)
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
	  					    )})
			      	}
			      </div>
			      <Divider variant="middle" />
			      <div className=''>
			        <Typography gutterBottom variant="body1">
			          
			        </Typography>
			        <div> Apps : 
			          {
			          	packageManifest.apps.map( i=>{
			          		return (
			          			<Badge badgeContent={i.order}  key={i.zonarAppId}>
	  		          		      <Chip
	  						        label={i.label}
	  						        clickable
	  						        color="primary"
	  						        variant="outlined"
	  						        onMouseOver={()=>this.hoverAction(i)}
	  						      />
	  						    </Badge>
  				          	)})
			          }
			        </div>
			      </div>
			      <div className=''>
			        <Button onClick={()=> this.fetchManiData()} color="primary">Get Mani</Button>
			      </div>
	    		</div>
			)}
  	}

  render(){
  	const {gettingMani} = this.state
  	// console.log(this)
	return (
		<div>
			{this.validateData()}
		</div>
	)}
}
