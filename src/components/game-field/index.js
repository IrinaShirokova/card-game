import React, {useEffect, useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from "../card";
import EmptyCell from "../empty-cell";
import gamedata from "../../api/game-data";

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
    const [timer, setTimer] = useState(null);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      setCards(gamedata.generateCardArray());
    }, []);

    useEffect(() => {
      if (firstCardOpen !== null 
        && secondCardOpen !== null 
        && firstCardOpen.id !== secondCardOpen.id) {          
          checkGameStep();               
        }
    }, [firstCardOpen, secondCardOpen]);

    useEffect(() => {
      gameover();
    }, [currentHideCard]);

    const shuffleCards = () => {
      let newCards = cards.sort(() => Math.random() - 0.5);
      setCards(newCards);
    }

    const startGame = useCallback(() => {
      shuffleCards();
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);     
    }, []);

    const swipeCard = useCallback((card) => {
      if (firstCardOpen !== null) {
        if (firstCardOpen.id !== card.id) {
          setSecondCardOpen(card);
        } else {
          closeCardPair();
        }
      } else {
        setFirstCardOpen(card);
        setSecondCardOpen(null);
      }
    },[firstCardOpen, secondCardOpen]);

    const checkGameStep = () => {    
      if (firstCardOpen.iconId === secondCardOpen.iconId) {
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
      } else {
        createStepLog(firstCardOpen.id, secondCardOpen.id, false);   
        let timer = setTimeout(() => {
          closeCardPair();  
        }, 5000);   
        return () => {
          clearTimeout(timer)
        }                   
      }               
    }

    const closeCardPair = () => {
        setFirstCardOpen(null);
        setSecondCardOpen(null);      
    }

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
        }
      }
    }
  
    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={2}>
        <Grid item xs={4}>
        <Button onClick={startGame} variant="contained" color="secondary">
          СТАРТ
        </Button>
        <Typography component="h2" variant="caption" color="secondary">
          ПРОШЛО {seconds} СЕКУНД
        </Typography>

          <Typography component="h2" variant="h5">Ход игры</Typography>
          {steps.map(step => <Typography key={`card-item-${step.id}`} 
                              variant="caption" display="block" 
                              style={{color: step.success ? '#4caf50' : '#dc004e'}}>
                Шаг {step.id}. Карточки ({step.firstCard},{step.secondCard})
            </Typography>)}
        </Grid>
        <Grid item xs={8} container justify="center" spacing={2}>
            {!gameOver ? 
                cards.map(cardItem => 
                    <Grid key={`card-item-${cardItem.id}`} item xs={2}>
                      {cardItem.visible ?
                        <Card open={cardItem.id === firstCardOpen?.id || cardItem.id === secondCardOpen?.id} 
                              iconId={cardItem.iconId}
                              onCardClick={() => swipeCard(cardItem)}/>
                              : <EmptyCell/>
                      }
                    </Grid>)
                :
                <div>
                  <h2>GAME OVER!</h2>
                  Примите наши поздравления! Вы справились за <strong>{steps.length}</strong> шагов!
                </div>
            }
        </Grid>
        </Grid>
      </div>
    );
  };

  export default GameField;