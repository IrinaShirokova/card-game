import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardIcon from '../card-icon';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "100px",
        height: theme.spacing(12),
        textAlign: "center",
        cursor: "pointer"
    }
  }));

const Card = ({open, iconId, onCardClick}) => {
    const classes = useStyles();
    return <Paper onClick={onCardClick} className={classes.root} elevation={3}>
        {open && <CardIcon iconId={iconId}/>}
    </Paper>
}

export default Card;