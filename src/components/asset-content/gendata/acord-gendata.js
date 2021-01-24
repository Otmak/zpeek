import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = [
    {
      id:1,
      name: 'Fromsty',
      age: 25,
      story : ' Hi all my name is haha i have been worrking here since I found it.'
    }, 
    {
      id:2,
      name: 'dupe',
      age: 23,
      story : ' Hi all my name is haha i have been worrking here since I found it.'
    },
    {
      id:3,
      name: 'Maongo',
      age: 24,
      story : ' Hi all my name is haha i have been worrking here since I found it.'
    }, 
    {
      id:4,
      name: 'plruo',
      age: 26,
      story : ' Hi all my name is haha i have been worrking here since I found it.'
    }
  ]

  return (
    <div className={classes.root}>

      {
        data.map( i => {
          const {id, name, age, story} = i
        return (
        <Accordion expanded={expanded === id } onChange={handleChange(id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{age}</Typography>
          <Typography className={classes.secondaryHeading}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {story}
          </Typography>
        </AccordionDetails>
      </Accordion>)

      })}
      
    </div>
  );
}
