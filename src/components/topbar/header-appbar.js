import React, { useState } from 'react';
import './header-appbar.css';
import TestT from './test-t';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppContainer from '../app-container/app-container';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    justifyContent: 'flex-start',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// ElevationScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   *
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
   
//   window: PropTypes.func,
// };

export default function HeaderAppBar(props) {
  // console.log('PROPS INSIDE APPBARContainer COMP:' ,props)
  // const [color, setColor] = React.useState('default');
  const [open, setOpen] = useState(false);
  const [activeOnlyList, setList] = useState({activeOnly : false});

  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const appBarStyle = { background: 'linear-gradient(90deg, #4598DC, #B06AB3 )'}
  // const handleChange = (event) => {
  //   setColor(event.target.checked ? 'blue' : 'default');
  // };
  const handleOpen = ()=> {
    console.log('Clicked')
  }
  const infoFromChild = (e)=>{
    // const list = {
    //   all : true,
    //   active : false
    // }
    setList({  ...activeOnlyList, [e.target.name]: e.target.checked })

    // console.log(e.target.checked)

  }
  console.log(props)
  //   const { account, pass, assetdata} = props.data
  // const activeAssetsList = assetdata.filter( asset=> asset.status === '1')
  // const allAssetsList = props.data

  console.log('IS THE LIST ACTIVE ONLY ?', activeOnlyList)


  return (
    <div className='header-appbar'>
      <React.Fragment>
        <ElevationScroll>
          <AppBar style={appBarStyle}>
            <Toolbar>
            <div className='thebetween'/>
            <div >
                <IconButton
                  aria-label="show more"
                  aria-controls={'primary-search-account-menu-mobile'}
                  aria-haspopup="true"
                  onClick={handleOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>
    </div>

  );
}
