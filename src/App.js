import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GameField from './components/game-field';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      height: "100%",
      "& h3": {
          paddingTop: "20px",
          paddingBottom: "20px",
          textAlign: "center"
      }
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography component="h3" variant="h3">Игра "Память"</Typography>
      <GameField/>     
    </Container>
  );
}

export default App;
