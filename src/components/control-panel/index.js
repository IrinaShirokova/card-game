import React, {useEffect, useState} from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import StepList from '../step-list';
import {secondsToTime} from "../../api/game-data";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        padding: "10px",
        "& .MuiButton-containedSecondary": {
            width: "100%"
        },
        "& h2": {
            paddingTop: "20px",
            paddingBottom: "20px",
            textAlign: "center"
        }
    }
  }));

export const LeftControlPanel = ({seconds, steps, onStartGame, startDisabled}) => {
    const classes = useStyles();
    const [timeLeftString, setTimeLeftString] = useState("");

    useEffect(() => {
            let time = secondsToTime(seconds);
            let timeStr = (time["h"] < 10 ? '0' + time["h"] : time["h"]) + ':' + 
                        (time["m"] < 10 ? '0' + time["m"] : time["m"]) + ':' + 
                        (time["s"] < 10 ? '0' + time["s"] : time["s"]);
            setTimeLeftString(timeStr);
      }, [seconds]);

    return (
    <Paper variant="outlined" className={classes.root}>
        <Button onClick={onStartGame} variant="contained" color="secondary" disabled={startDisabled}>
            СТАРТ
        </Button>
        <Typography component="h3" variant="h3" color="textSecondary">
            {timeLeftString}
        </Typography>
        {steps && steps.length > 0 &&
            <StepList title="Ваши ходы" steps={steps}/>
        }
    </Paper>
    )};

export default LeftControlPanel;