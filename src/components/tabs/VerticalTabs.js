import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabpanel'

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 700,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  // console.log(props)
  // console.log(id)
  // {props.assets.map(i => <Tab label="Item One" {...a11yProps(i.id)} />) }
    // {Object.entries(props.assets).map(([k, v]) => <Tab  label="Item One" {...a11yProps(v.id)} />) }
  // Object.entries(props.assets).map(([k, v]) => console.log(v.id,'==', v.index) )

  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const data = props.assets
console.log(React.useState(1), 'LOGGING>>> ', value)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {Object.entries(data).map(([k, v]) => <Tab key={k} label={v.assetNumber} value={v.id}/>) }
      </Tabs>
      {Object.entries(data).map(([k, v]) => <TabPanel key={k} value={value} index={v.index}> otuma</TabPanel> ) }
    </div>
  );
}
