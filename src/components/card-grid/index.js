import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "../card";
import EmptyCell from "../empty-cell";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxHeight: 592
    },
  }));

export const CardGrid = ({cards, onCardClick, firstCardOpenId, secondCardOpenId, started}) => {
    const classes = useStyles();
    return (<div className={classes.root}>
        <Grid container justify="center" spacing={2}>
            {cards && cards.map(cardItem => 
                <Grid key={`card-item-${cardItem.id}`} item xs={2}>
                    {cardItem.visible ?
                    <Card open={!started || cardItem.id === firstCardOpenId || cardItem.id === secondCardOpenId} 
                            iconId={cardItem.iconId}
                            onCardClick={() => onCardClick(cardItem)}/>
                            : <EmptyCell/>
                    }
                </Grid>)}
        </Grid>
    </div>)
};

export default CardGrid;