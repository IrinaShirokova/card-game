import React from "react";
import Typography from '@material-ui/core/Typography';

export const StepItem = ({step}) => {
    return <Typography key={`card-item-${step.id}`} 
                variant="caption" display="block" 
                style={{color: step.success ? '#4caf50' : '#dc004e'}}>
                Шаг {step.id}. Карточки ({step.firstCard},{step.secondCard})
    </Typography>
}

export const StepList = ({title, steps}) => {
    return (<>
        <Typography component="h5" variant="h5">{title}</Typography>
        {steps && steps.map((step, idx) => <StepItem key={`step=${idx}`} step={step}/>)}
    </>)
}

export default StepList;