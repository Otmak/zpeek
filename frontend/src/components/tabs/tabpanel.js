import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Drawer from '@material-ui/core/Drawer';
import './tabs.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TabSkeleton from '../skeletons/tabSkeleton';
import TextField from '@material-ui/core/TextField';
import AssetContainer from '../asset-content/asset-container';


// think aabout re-designing this to fit, added functionlly ty
//This is a dev file VerticalTabs prod

export default class SolidTab extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetList : this.props,
      searchFeild : '',
      loading : true,
      active : false
    }
  }
  // isLoading(arr, l){
  //   }

  componentDidMount(){
    this.setState({loading : false})
    // console.log(this)

  }

  filterAssetList = (e) => {
    return this.setState({ searchFeild: e.target.value})

  }

  componentDidUpdate(){
    console.log('This is updated',this)
  }

  parseNTimes(n) {
    // const func = ()=>{
    //   let avail = this
    //   console.log(avail)
    // }
    // const checker = setInterval(func, 2000)
    // const kill = setTimeout(()=>{
    //   clearTimeout(checker)
    // }, 10000)

    const elemArr = []
    for ( let i = 0; i < n; i++) {
      elemArr.push(<TabSkeleton key={i} />)
      }
      return elemArr
  }
  // async filterBothGPSandAsset () {
  //   console.log('From test', this)
  //   const { }


  //   // const masterArray = []
  //   // const gpsReturned = await assetList.filter(item => {
  //   // return item['assetNumber'].toLowerCase().includes(lowercaseSearchFilter)})

  //   // const assetReturned = await assetList.filter(item=> {
  //   // return item['gpsid'] === null ? '' : item['gpsid'].includes(lowercaseSearchFilter)
  //   // })

  //     // console.log(gpsReturned,assetReturned )
  //   }

  // activeOnlyList(){
  //   if (this.state.active)
  // }

  render(){
    const { searchFeild, loading } = this.state;
    console.log(this)
    const assetList = this.props.data.assetdata
    const {account, hashed} = this.props.data
    // const activeAssetsList = assetList.filter( asset=> asset.status == '1')
    const lowercaseSearchFilter = searchFeild.toLowerCase()


    const filterAssetOrGpsId = assetList.filter((item)=> {
      return item['assetgpsid'].toLowerCase().includes(lowercaseSearchFilter)
    })

    return (
      <div className='tabs-container-main-div'>
        <Tabs className='tabs-container'>
	        <Drawer
	        	variant="permanent"
	        	className="solid-tab-container"
	        >
	        <TextField position ='fixed' onChange={ this.filterAssetList } className='search-textfield' id="filled-search" label="Search" type="search" variant="filled" />
	          <TabList className='tabItem-container'>
	            {assetList.length <1 && this.parseNTimes(10)}
	            { 
	              filterAssetOrGpsId.map( i=> 
	                <Tab key={i.key}>
	                  <List className='tabItem'>
	                    <ListItem>
	                      <ListItemAvatar>
	                        <Avatar className={ i.status === '1' ? 'active-assetList-avatar' : 'inactive-assetList-avatar'}>
	                          {i.status === '1'? 'a' : 'i'}
	                        </Avatar>
	                      </ListItemAvatar>
	                      <ListItemText className='asset-list-text' primary={i.assetNumber} secondary={i.type} />
	                    </ListItem>
	                  <Divider component="li" />
	                  </List>
	                </Tab>  
	            )}
	          </TabList>
	        </Drawer>

            { 
              filterAssetOrGpsId.map( i=> 
                <TabPanel key={i.key} className='tab-panel'>
                  <AssetContainer  data={{'asset': i.assetNumber, 'id': i.key, 'status': i.status, 'gpsid': i.gpsid, 'account':account, 'hashed':hashed }
                  }/>
                </TabPanel> )
            }
        </Tabs>
      </div>
    )
  }
}





