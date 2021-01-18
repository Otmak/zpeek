import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import TabAndPanel from '../tabs/tab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  // console.log('PROPS INSIDE APPBARContainer COMP:' ,props)
  const [color, setColor] = React.useState('default');
  const appBarStyle = { background: 'linear-gradient(90deg, #4598DC, #B06AB3 )'}
  const handleChange = (event) => {
    setColor(event.target.checked ? 'blue' : 'default');
  };
  const theme = React.useMemo(() => {
    if (color === 'blue') {
      return createMuiTheme({
        palette: {
          secondary: {
            main: 'blue',
            contrastText: '#fff',
          },
        },
      });
    }
    return createMuiTheme();
  }, [color]);
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar style={appBarStyle} >
          <Toolbar>
            <Typography variant="h6">Fix It!</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={color === 'blue'}
                      onChange={handleChange}
                      color="primary"
                      value="dynamic-class-name"
                    />
                  }
                  label="Blue"
                />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Toolbar />
      <Container>
        <TabComponent data={props.assets}> </TabComponent>
      </Container>
    </React.Fragment>
  );
}
