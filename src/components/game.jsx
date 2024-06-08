import React, { useState } from "react";
import Gameboard from "./gameboard";
import Scoreboard from "./score_board";
import styles from "../styles/game.module.css";

function Game() {
  const [dices, setDices] = useState([0, 0, 0, 0, 0]);
  const [keep, setKeep] = useState([false, false, false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [welcomeHasShown, setWelcomeHasShown] = useState(false);

  const roll = () => {
    if (rollsLeft === 0) return;
    const newDices = dices.map((dice, index) => {
      if (keep[index]) {
        return dice;
      } else {
        return Math.floor(Math.random() * 6) + 1;
      }
    });
    setRollsLeft(rollsLeft - 1);
    setDices(newDices);
  };

  const toggleKeep = (index) => {
    const newKeep = [...keep];
    newKeep[index] = !newKeep[index];
    setKeep(newKeep);
  };

  const startButtonClick = () => {
    roll();
    setWelcomeHasShown(true);
  };

  const resetTurn = () => {
    setKeep([false, false, false, false, false]);
    setRollsLeft(3);
    roll();
  };

  const endGame = () => {
    setKeep([false, false, false, false, false]);
    setRollsLeft(3);
    setDices([0, 0, 0, 0, 0]);
    setWelcomeHasShown(true);
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.gameContainer}>
        <div className={styles.gameboardContainer}>
          <Gameboard
            dices={dices}
            keep={keep}
            rollsLeft={rollsLeft}
            welcomeHasShown={welcomeHasShown}
            roll={roll}
            toggleKeep={toggleKeep}
            startButtonClick={startButtonClick}
          />
        </div>

        <div className={styles.scoreboardContainer}>
          <Scoreboard
            dices={dices}
            resetTurnFunction={resetTurn}
            endGameFunction={endGame}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
