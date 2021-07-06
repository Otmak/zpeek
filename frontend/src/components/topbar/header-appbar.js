import React, { useState } from 'react';
import './header-appbar.css';
import TestT from './test-t';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppContainer from '../app-container/app-container';
import Tooltip from '@material-ui/core/Tooltip';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import { SnackbarProvider, useSnackbar } from 'notistack';


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


export default function HeaderAppBar(props) {
  // console.log('PROPS INSIDE APPBARContainer COMP:' ,props)
  // const [color, setColor] = React.useState('default');
  const [open, setOpen] = useState(false);
  const [readySwapping, setreadySwapping] = useState(false);
  const [activeOnlyList, setList] = useState({activeOnly : false});
  const [values, setValues] = React.useState({
    account:'',
    password: '',
    accounError :false,
  });

  // const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   enqueueSnackbar('I love snacks.');
  // };

  // const handleClickVariant = (variant) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', { variant });
  // };

  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setreadySwapping(false);
  };
  const areWeReadyToSwap = () =>{
    setreadySwapping(true);
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

  };

  const handleKeyDown = (e) => {
    const validate = (v) =>  v.length === 7 && v !== ''? true : false
    if (e.key === "Enter" ) {
     // handleClickVariant('success')
      console.log(values.account)
      
     if (validate(values.account)){
      localStorage.setItem('entryCardAccount', values.account)
       window.location.reload()
     }else{
      console.log("this is sparta!!!!")

     }
    }
  }


  const appBarStyle = { background: 'linear-gradient(90deg, #4598DC, #B06AB3 )'}
  const swtich = {background: 'linear-gradient(45deg, #4598DC, #B06AB3 )'}
  // const handleChange = (event) => {
  //   setColor(event.target.checked ? 'blue' : 'default');
  // };


  const handleOpen = ()=> {
    console.log('Logout click', window)
    localStorage.clear();
    window.location.reload()
    // localStorage.clear();
  }
  const infoFromChild = (e)=>{
    // const list = {
    //   all : true,
    //   active : false
    // }
    setList({  ...activeOnlyList, [e.target.name]: e.target.checked })
    // console.log(e.target.checked)

  }
  console.log(values)
  //   const { account, pass, assetdata} = props.data
  // const activeAssetsList = assetdata.filter( asset=> asset.status === '1')
  // const allAssetsList = props.data

  return (
    <div className='header-appbar'>
      <React.Fragment>
        <ElevationScroll>
          <AppBar style={appBarStyle}>
            <Toolbar>
            <div >
              <IconButton
                aria-label="show more"
                aria-controls={'primary-search-account-menu-mobile'}
                aria-haspopup="true"
                onClick={handleOpen}
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </div>
            <div className='thebetween'/>
            {localStorage.getItem('entryCardAccount')} 
            {
              readySwapping ?
                <FormControl className={clsx(classes.margin, classes.textField)} >
                  <div>
                    <TextField
                      

                      id="standard-password-input"
                      label="Account code*"
                      type="text"
                      autoComplete="current-password"
                      onChange={handleChange('account')}
                      onKeyDown={handleKeyDown}
                  
                    />
                    <IconButton
                        aria-label="close button"
                        onClick={handleDrawerClose}
                        >
                        <CloseIcon />
                    </IconButton>
                  </div>
                </FormControl>
              :
              <Tooltip title='Click to Switch accounts' onClick={areWeReadyToSwap}>
                <Fab color='primary' aria-label='switch accounts' style={swtich}>
                  <SwapHorizRoundedIcon/>
                </Fab>
              </Tooltip>
            }
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>
    </div>
  );
}
