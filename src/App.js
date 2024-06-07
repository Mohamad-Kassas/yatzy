import './App.css';
import ScoreBoard from './components/score_board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard dices={[4,4,4,3,3]} />
      </header>
    </div>
  );
}

export default App;
