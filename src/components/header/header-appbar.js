import React from 'react';
import PropTypes from 'prop-types';
import './header-appbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import TabAndPanel from '../tabs/tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import TabComponent from '../tabs/tab';

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
  const [color, setColor] = React.useState('default');
  const appBarStyle = { background: 'linear-gradient(90deg, #4598DC, #B06AB3 )'}
  const handleChange = (event) => {
    setColor(event.target.checked ? 'blue' : 'default');
  };
  const handleOpen = ()=> {
    console.log('Clicked')
  }

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
