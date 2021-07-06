import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://otuma.io/">
        otuma.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInFirst(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    shallAll: true,
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };
  const [sub, setSub] = useState(false);


  function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

  const getFormData = (e) => {
    console.log(e.target.name,':',e.target.value)
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem('showAllAssets', state.shallAll)
    console.log(state)
  };

  const letsGetStarted = (e)=>{
    handleClick(SlideTransition);
    e.preventDefault()
    console.log('fetching... your data', e)

  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
         ZPeekv2
          <Avatar className={classes.avatar}>

          </Avatar>
  
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              onChange={props.getFormData}
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account code"
              name="accountCode"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              onChange={props.getFormData}
              margin="normal"
              required
              fullWidth
              name="passWord"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Switch
              checked={state.shallAll}
              onChange={handleChange}
              color="primary"
              name="shallAll"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /> 
            { state.shallAll? 'Active only' : 'Both Active/inactive'}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {
                props.letsGetStarted();
              }}
              onMouseDown={handleClick(SlideTransition)}
              color="primary"
              className={classes.submit}
            >
              { console.log('*****submitting.....****',state) }
              { !sub ? 'P👀k' : 'Wait...'}
            </Button>
            <Snackbar
              open={state.open}
              TransitionComponent={state.Transition}
              message="Loging in please wait..."
              key={state.Transition.name}
            />
  
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
