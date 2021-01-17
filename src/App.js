import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GameField from './components/game-field';

function App() {
  return (
    <Container>
      <Typography component="h1" variant="h4">Игра в карточки</Typography>
      <GameField/>     
    </Container>
  );
}

export default App;
