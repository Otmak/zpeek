import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css'
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TabSkeleton from '../skeletons/tabSkeleton';
import TextField from '@material-ui/core/TextField';
import AssetContainer from '../asset-content/asset-container';

// think aabout re-designing this to fit, added functionlly ty

class TabComponent extends Component {
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

  }

  filterAssetList = (e) => {
    return this.setState({ searchFeild: e.target.value})

  }

  parseNTimes(n) {
    const elemArr = []
    for ( let i = 0; i < n; i++) {
      elemArr.push(<TabSkeleton key={i} />)
      }
      return elemArr
  }

  // activeOnlyList(){
  //   if (this.state.active)
  // }

  render(){
    const { searchFeild, loading } = this.state;
    // console.log(this)
    const assetList = this.props.data
    const activeAssetsList = assetList.filter( asset=> asset.status == '1')
    const lowercaseSearchFilter = searchFeild.toLowerCase();
    const filterGpsId = assetList.filter(item=> {
      return item['gpsid'] === null ? '' : item['gpsid'].includes(lowercaseSearchFilter)
    })
    const filterAssetNumber = assetList.filter(item => {
      return item['assetNumber'].toLowerCase().includes(lowercaseSearchFilter)
    })

    const filteredData = assetList.filter(item => {
      return item['assetNumber'].toLowerCase().includes(lowercaseSearchFilter)
    })// add filter for searching GPSID


    return (
      <div className='tabs-container'>
        <Tabs>
          <TabList className='tabItem-container'>

            <TextField onChange={ this.filterAssetList } className='search-textfield' id="filled-search" label="Search" type="search" variant="filled" />
            {assetList.length <1 && this.parseNTimes(10)}
            { 
              filteredData.map( i=> 
                <Tab key={i.key}>
                  <List className='tabItem'>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className={ i.status == '1' ? 'active-assetList-avatar' : 'inactive-assetList-avatar'}>
                          {i.status == '1'? 'a' : 'i'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={i.assetNumber} secondary={i.type} />
                    </ListItem>
                  <Divider component="li" />
                  </List>
                </Tab>  
            )}
          </TabList>
            { 
              filteredData.map( i=> 
                <TabPanel key={i.key} className='tab-panel'>
                  <AssetContainer  assetData={{'asset': i.assetNumber, 'id': i.key, 'status': i.status, 'gpsid': i.gpsid}
                  }/>
                </TabPanel> )
            }
        </Tabs>
      </div>
    )
  }
}

export default TabComponent;



