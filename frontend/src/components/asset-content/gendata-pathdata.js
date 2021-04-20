import React, {Component} from 'react';
import './asset-content-container.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Path from './path/path';
import Gendata from './gendata/gendata';
import Mani from './mani/mani';// Header-for asset info

					// <div className='gendata-container'>
					// 	<Gendata data={id}/>
					// </div>


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>      
        </Box>
      )}
    </div>
  );
}


export default function GendataPathdata (props){
		console.log('****************',props)
	const {gpsid, id, account, hashed} = props.data
	const [value, setValue] = React.useState(0);

  	const handleChange = (event, e) => {
    	// console.log(e)
    	setValue(e);
 	 };
	return(
		<div>
	        <div className='gendata-container'>
				<Gendata data={id}/>
			</div>
	        <div className='path-container'>
				<Path data={id}/>
			</div>
		</div>
	)
}
