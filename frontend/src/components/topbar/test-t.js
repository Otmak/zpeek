import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TestT(props) {
  const classes = useStyles();
  // const [state, setState] = useState({
  //   checkedA: true,
  //   checkedB: true,
  // });
  // const [checked, setChecked] = useState(['wifi']);

  console.log('from test-t', props)

  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
    	<FormGroup>
	      <ListItem>
	        <ListItemIcon>
	          <BluetoothIcon />
	        </ListItemIcon>

	        <FormControlLabel
		        control={
		          <Switch
		            edge="end"
		            onChange={props.data}
		            name='activeOnly'

		            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
		          />}
		          label='Active Only'
		          labelPlacement="start"
		          />
	   
	      </ListItem>
	    </FormGroup>
    </List>
  );
}
