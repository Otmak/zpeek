import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



class Gendata extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : [],
      accordionActive: ''
    }
  }

  getDateTime(e){
    let dateTimeValue = e.target.value
    let dateTimeId  = e.target.id
    // console.log(this)

    let epTime = new Date(dateTimeValue)
    let selectedEpochTime = epTime.getTime()/1000.0

    this.setState({[dateTimeId]: selectedEpochTime})
    console.log(dateTimeValue, dateTimeId, 'FROM PATH....', this)
  }

  async testMethod(e){
    e.preventDefault()
    const makeRequest = await fetch('/gendata', {
          method: 'POST',
          body: 'JSON.stringify(bodyData)',
          headers: {'Content-Type': 'application/json'}
      })
    const getPathData = await makeRequest.json()
    console.log(getPathData.gendata[0])
    this.setState({data : getPathData.gendata[0]})
  }


  async fetchGendata(){
    // 
  }


  handleExpand(panel){
    const {accordionActive} = this.state
    if ( panel === accordionActive ) {
      console.log('Panel active setting to inactive')
      this.setState({accordionActive : panel })
    }else {
      console.log('panel not active, setting to active....')
      this.setState({ accordionActive : panel })
    }
  }


  render(){
    const { data, accordionActive } = this.state
    // const loded =  Object.entries(data).map(([key, b]) => {
    //   // console.log(typeof key)
    //   // console.log(`${key} =====> ${b.labels}`)
    // })
    const timeStmp = (epTime)=>{
      let ntime = new Date(epTime * 1000)
      // console.log(typeof ntime)
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let pasrseTime = `${monthNames[ntime.getMonth()]} ${ntime.getDay()} ${ntime.getFullYear()} ${ntime.getHours()}:${ntime.getMinutes()}`
      // console.log(typeof pasrseTime)
      return pasrseTime
    }
// console.log(this)
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
        <div className='gendata-a-container'>
          
           <Timeline align="alternate">
          { 
            Object.entries(data).map(([i, b]) => (
         
              <TimelineItem key={i}>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {timeStmp(i)}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <FastfoodIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={5} >
                    <Typography variant="h6" component="h1">
                      {b.labels}
                    </Typography>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>         
            ))
          }
        </Timeline> 

        </div>
      </div>
    );
}}


export default Gendata;