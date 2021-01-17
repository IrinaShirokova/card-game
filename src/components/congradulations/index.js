import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {secondsToTime} from "../../api/game-data";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        textAlign: "center",
        padding: 10,
        "& h1":{
          color: "#dc004e"
        },
        "& p":{
          fontSize: 20,
          "& > span": {
            color: "green",
            fontWeight: 600
          }
        }
    },
  }));

export const Congradulations = ({stepCount, secondsLeft}) => {
    const classes = useStyles();
    const [timeLeftString, setTimeLeftString] = useState("");

      useEffect(() => {
        let time = secondsToTime(secondsLeft);
        let timeStr = (time["h"] !== 0 ? time["h"] + ' ч. ' : '') + ' ' +
                      (time["m"] !== 0 ? time["m"] + ' мин. ' : '') + ' ' + 
                      (time["s"] + ' секунд ');
        setTimeLeftString(timeStr);
      }, [secondsLeft]);

    return (
        <div className={classes.root}>
            <h1>GAME OVER!</h1>
            <p>Примите наши поздравления! <br/> Вы справились за <span>{stepCount}</span> шагов <br/>
            и потратили всего навсего <span>{timeLeftString}</span> своего времени!
            </p>
        </div>
    )
}

export default Congradulations;