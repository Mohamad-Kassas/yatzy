import React, { useState, useEffect } from "react";
import Gameboard from "./gameBoard";
import Scoreboard from "./scoreBoard";
import styles from "../styles/game.module.css";

function Game() {
  const [dices, setDices] = useState([0, 0, 0, 0, 0]);
  const [keep, setKeep] = useState([false, false, false, false, false]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [endTurn, setEndTurn] = useState(false);
  const [welcomeHasShown, setWelcomeHasShown] = useState(false);
  const [bonusScore, setBonusScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);

  // Function to roll the dices
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

  // Function to toggle the keep state of a dice
  const toggleKeep = (index) => {
    const newKeep = [...keep];
    newKeep[index] = !newKeep[index];
    setKeep(newKeep);
  };

  // Function to start the game
  const startButtonClick = () => {
    setTotalScore(null);
    roll();
    setWelcomeHasShown(true);
  };

  // ***** SCORING FUNCTIONS ***** //

  // Adds the sum of all ones
  const ones = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 1).length;
  };

  // Adds the sum of all twos
  const twos = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 2).length * 2;
  };

  // Adds the sum of all threes
  const threes = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 3).length * 3;
  };

  // Adds the sum of all fours
  const fours = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 4).length * 4;
  };

  // Adds the sum of all fives
  const fives = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 5).length * 5;
  };

  // Adds the sum of all sixes
  const sixes = (dices = [0, 0, 0, 0, 0]) => {
    return dices.filter((dice) => dice === 6).length * 6;
  };

  // Adds the sum of the highest pair
  const onePair = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    let max = 0;
    for (const key in counts) {
      if (counts[key] >= 2) {
        max = Math.max(max, key);
      }
    }

    return max * 2;
  };

  // Adds the sum of the two pairs
  const twoPairs = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    let sum = 0;
    let pairs = 0;
    for (const key in counts) {
      if (counts[key] >= 2) {
        sum += key * 2;
        pairs++;
      }
    }

    if (pairs === 2) {
      return sum;
    }

    return 0;
  };

  // Adds the sum of the three of a kind
  const threeOfAKind = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    for (const key in counts) {
      if (counts[key] >= 3) {
        return key * 3;
      }
    }

    return 0;
  };

  // Adds the sum of the four of a kind
  const fourOfAKind = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    for (const key in counts) {
      if (counts[key] >= 4) {
        return key * 4;
      }
    }

    return 0;
  };

  // Adds 15 if the dices are a small straight (1, 2, 3, 4, 5)
  const smallStraight = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (counts[1] && counts[2] && counts[3] && counts[4] && counts[5]) {
      return 15;
    }

    return 0;
  };

  // Adds 15 if the dices are a large straight (2, 3, 4, 5, 6)
  const largeStraight = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (counts[2] && counts[3] && counts[4] && counts[5] && counts[6]) {
      return 15;
    }

    return 0;
  };

  // Adds the sum of the full house (three of a kind and a pair)
  const fullHouse = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    const values = Object.values(counts);

    if (values.length === 2 && values.includes(3) && values.includes(2)) {
      return dices.reduce((acc, dice) => acc + dice, 0);
    }

    return 0;
  };

  // Adds the sum of all dices
  const chance = (dices = [0, 0, 0, 0, 0]) => {
    return dices.reduce((acc, dice) => acc + dice);
  };

  // Adds 50 if all dices are the same
  const yatzy = (dices = [0, 0, 0, 0, 0]) => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    const values = Object.values(counts);

    if (Object.keys(counts).length === 1 && dices[0] && values.includes(5)) {
      return 50;
    }

    return 0;
  };

  // Function to calculate the bonus
  const bonus = () => {
    const sum =
      scores.Ones[0] &&
      scores.Twos[0] &&
      scores.Threes[0] &&
      scores.Fours[0] &&
      scores.Fives[0] &&
      scores.Sixes[0];
    return sum >= 63 ? 50 : 0;
  };

  // ***** END OF SCORING FUNCTIONS ***** //

  // Object to store the scores
  const [scores, setScores] = useState({
    Ones: [null, ones],
    Twos: [null, twos],
    Threes: [null, threes],
    Fours: [null, fours],
    Fives: [null, fives],
    Sixes: [null, sixes],
    "One Pair": [null, onePair],
    "Two Pairs": [null, twoPairs],
    "Three of a Kind": [null, threeOfAKind],
    "Four of a Kind": [null, fourOfAKind],
    "Small Straight": [null, smallStraight],
    "Large Straight": [null, largeStraight],
    "Full House": [null, fullHouse],
    Chance: [null, chance],
    Yatzy: [null, yatzy],
  });

  // Function to reset the turn
  const resetTurn = () => {
    setKeep([false, false, false, false, false]);
    setRollsLeft(3);
    setEndTurn(true);
  };

  // Function to end the game
  const endGame = () => {
    setWelcomeHasShown(false);
  };

  useEffect(() => {
    if (
      scores.Ones[0] !== null &&
      scores.Twos[0] !== null &&
      scores.Threes[0] !== null &&
      scores.Fours[0] !== null &&
      scores.Fives[0] !== null &&
      scores.Sixes[0] !== null
    ) {
      setBonusScore(bonus()); // Calculate bonus
    }

    if (
      Object.values(scores).every((scoreList) => scoreList[0] !== null) &&
      bonusScore !== null
    ) {
      setTotalScore(
        Object.values(scores).reduce((acc, score) => acc + score[0], 0) +
          bonusScore
      ); // Calculate total score
      endGame(); // End the game
    }
  }, [scores]);

  useEffect(() => {
    if (endTurn) {
      // If the turn has ended
      roll(); // Roll the dices
      setEndTurn(false); // Reset the endTurn state
    }
  }, [endTurn]);

  useEffect(() => {
    if (welcomeHasShown === false) {
      // If the game has ended
      setDices([0, 0, 0, 0, 0]); // Reset the dices
      setRollsLeft(3); // Reset the rollsLeft
      setKeep([false, false, false, false, false]); // Reset the keep state
      setScores({
        // Reset the scores
        Ones: [null, ones],
        Twos: [null, twos],
        Threes: [null, threes],
        Fours: [null, fours],
        Fives: [null, fives],
        Sixes: [null, sixes],
        "One Pair": [null, onePair],
        "Two Pairs": [null, twoPairs],
        "Three of a Kind": [null, threeOfAKind],
        "Four of a Kind": [null, fourOfAKind],
        "Small Straight": [null, smallStraight],
        "Large Straight": [null, largeStraight],
        "Full House": [null, fullHouse],
        Chance: [null, chance],
        Yatzy: [null, yatzy],
      });
      setBonusScore(null); // Reset the bonus score
    }
  }, [welcomeHasShown]);

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
            scores={scores}
            dices={dices}
            bonusScore={bonusScore}
            totalScore={totalScore}
            resetTurnFunction={resetTurn}
            updateScores={setScores}
            welcomeHasShown={welcomeHasShown}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
