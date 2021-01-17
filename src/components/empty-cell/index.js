import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "80px",
        height: "80px",      
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  }));

const EmptyCell = () => {
    const classes = useStyles();
    return <div className={classes.root}/>
}

export default EmptyCell;