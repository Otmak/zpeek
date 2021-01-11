import React, {Component, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CardWithAction from '../card/card-with-action';


export default function TabAndPanel(props) {
  console.log('PROPS IN TAB COMP:', props)
  const [loading, setLoading] = useState(false);
  console.log( 'PING:', loading,setLoading, useState)
  const assetList = props.data.assets
  // assetList.map(i=>console.log(i))
 
  function checkLoading(arg){
    if (arg[0] != undefined){
      console.log('******************************')
      return setLoading(false)
      
    }
    console.log('+++++++++++++++++++++++++++++++')
    setLoading(true)
    return checkLoading(arg)
  }
  // checkLoading(assetList)

  console.log('TESTING:',assetList[0], assetList.length)

  return (
    <div>
      <Tabs>
        <TabList className='tabItem-container'>
          { console.log('RETURN CALLED:',window.document)}
          { !loading &&
            assetList.map( i=> 
              <Tab key={i.key}>
                <List className='tabItem'>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar> 
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
            assetList.map( i=> 
              <TabPanel key={i.key} className='tab-panel'>
                <CardWithAction  assetData={{
                                                    'asset': i.assetNumber,
                                                    'id': i.key,
                                                    'status': i.status,
                                                    'gpsid': i.gpsid}
                }/>
              </TabPanel> )
          }
      </Tabs>
    </div>
    )

}



