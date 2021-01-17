import React, {useEffect, useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardGrid from '../card-grid';
import gamedata from "../../api/game-data";
import LeftControlPanel from '../control-panel';
import Congradulations from '../congradulations';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
  }));

  const GameField = () => {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [steps, setSteps] = useState([]);
    const [firstCardOpen, setFirstCardOpen] = useState(null);
    const [secondCardOpen, setSecondCardOpen] = useState(null);
    const [currentHideCard, setCurrentHideCard] = useState(-1);
    const [gameOver, setGameOver] = useState(false);
    const [intervalGame, setIntervalGame] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);
    const [timerPair, setTimerPair] = useState(null);

    useEffect(() => {
      setCards(gamedata.generateCardArray());
    }, []);

    useEffect(() => {
      if (firstCardOpen !== null) {          
          checkGameStep();               
      } else {
        clearTimeout(timer);
        clearTimeout(timerPair);
      }
    }, [firstCardOpen, secondCardOpen]);

    useEffect(() => {
      gameover();
    }, [currentHideCard]);

    const shuffleCards = () => {
      const shuffled = cards.sort(() => Math.random() - 0.5);
      console.log(shuffled);
    }

    const startGame = useCallback(() => {
      setSeconds(0);
      setSteps([]);
      setIntervalGame(null);   
      shuffleCards();  
      
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      setIntervalGame(interval);      
    }, [seconds, intervalGame, steps, cards]);

    const swipeCard = useCallback((card) => {
      clearTimeout(timer);
      clearTimeout(timerPair);
      if (firstCardOpen !== null) {
        if (secondCardOpen === null) {
          if (firstCardOpen.id !== card.id) {
            setSecondCardOpen(card);
          } else {
            setFirstCardOpen(null);
          }
        }
      } else {
        setFirstCardOpen(card);
        setSecondCardOpen(null);
      }
    },[firstCardOpen, secondCardOpen]);

    const checkGameStep = () => {    
      if (firstCardOpen !== null && secondCardOpen !== null &&
          firstCardOpen.id !== secondCardOpen.id && 
          firstCardOpen.iconId === secondCardOpen.iconId) {
          createStepLog(firstCardOpen.id, secondCardOpen.id, true);
          let newCards = cards;
          newCards.map(c => {
            if (c.iconId === firstCardOpen.iconId) {
              c.visible = false;  
              setCurrentHideCard(c.id);   
            }           
          });
          setCards(newCards); 
          closeCardPair();                     
      } else if (firstCardOpen !== null && secondCardOpen === null) { 
        let t = setTimeout(() => {
          setFirstCardOpen(null);
        }, 5000);
        setTimer(t);  
      } else {
        createStepLog(firstCardOpen.id, secondCardOpen.id, false);   
        closeCardPair();                
      }            
    }

    const closeCardPair = () => {      
      let t = setTimeout(() => {
        setFirstCardOpen(null);
        setSecondCardOpen(null);  
      }, 1000);
      setTimerPair(t);
    };

    const createStepLog = (firstId, secondId, success) => {
      let newStep = {
        id: steps.length + 1,
        firstCard: firstId, 
        secondCard: secondId,
        success: success
      };
      let newSteps = steps;
      newSteps.push(newStep);
      setSteps(newSteps);
    }

    const gameover = () => {
      if (cards.length > 0 && !gameOver && steps.length > 0) {          
        let res = cards.findIndex(c => c.visible === true);
        if (res === -1) {
          setGameOver(true);
          clearInterval(intervalGame);
        }
      }
    }
  
    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={2}>
        <Grid item xs={4}>
          <LeftControlPanel steps={steps} 
                            seconds={seconds}
                            startDisabled={intervalGame !== null}
                            onStartGame={startGame}/>
        </Grid>
        <Grid item xs={8}>
            {!gameOver 
                ? <CardGrid cards={cards}
                          started={intervalGame !== null}
                          firstCardOpenId={firstCardOpen?.id}
                          secondCardOpenId={secondCardOpen?.id}
                          onCardClick={swipeCard}/>
                : <Congradulations secondsLeft={seconds} stepCount={steps.length}/>
            }
        </Grid>
        </Grid>
      </div>
    );
  };

  export default GameField;