import React, {Component} from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


class Gendata extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }

  getDateTime(e){
    let dateTimeValue = e.target.value
    let dateTimeId  = e.target.id
    // console.log(this)

    let epTime = new Date(dateTimeValue)
    let selectedEpochTime = epTime.getTime()/1000.0

    this.setState({[dateTimeId]: selectedEpochTime})
    // console.log(dateTimeValue, dateTimeId, 'FROM PATH....', this)
  }

  async testMethod(e){
    e.preventDefault()
    const makeRequest = await fetch('/gendata', {
          method: 'POST',
          body: 'JSON.stringify(bodyData)',
          headers: {'Content-Type': 'application/json'}
      })
    const getPathData = await makeRequest.json()
    console.log(getPathData)

  }

  async fetchGendata(){
    // 
  }

  render(){
    return (
      <div>
        <form onSubmit={(e)=> this.testMethod(e)}>
          <TextField
            id="startDate"
            variant='outlined'
            label="Start"
            type="datetime-local"
            onChange={ (e) => this.getDateTime(e)}
            InputLabelProps={{ shrink: true,}}
          />
          <TextField
            id="endDate"
            variant='outlined'
            label="End"
            type="datetime-local"
            onChange={ (e) => this.getDateTime(e)}
            InputLabelProps={{ shrink: true,}}
           />
           <button> Get Gendata</button>
        </form>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                9:30 am
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} >
                <Typography variant="h6" component="h1">
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                10:00 am
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3}>
                <Typography variant="h6" component="h1">
                  Code
                </Typography>
                <Typography>Because it&apos;s awesome!</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <HotelIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} >
                <Typography variant="h6" component="h1">
                  Sleep
                </Typography>
                <Typography>Because you need rest</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <RepeatIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} >
                <Typography variant="h6" component="h1">
                  Repeat
                </Typography>
                <Typography>Because this is the life you love!</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    );}
}


export default Gendata;