import React, { useState, useEffect } from "react";
import ScoreEntry from "./scoreEntry";
import TotalScore from "./totalScore";
import styles from "../styles/scoreBoard.module.css";

function ScoreBoard({
  scores,
  dices,
  bonusScore,
  totalScore,
  resetTurnFunction,
  updateScores,
  welcomeHasShown,
}) {
  return (
    <div className={styles.scoreBoard}>
      {Object.keys(scores).map((key) => (
        <ScoreEntry
          key={key}
          name={key}
          score={scores[key][1](dices)} // scores[key][1] is the scoring function
          finalScore={scores[key][0]} // scores[key][0] is the final score
          handleClick={() => {
            if (scores[key][0]) return;
            const newScores = { ...scores }; // Copy the scores object
            newScores[key] = [scores[key][1](dices), scores[key][1]]; // Update the final score
            updateScores(newScores); // Update the scores object
            resetTurnFunction(); // Reset the turn
          }}
          welcomeHasShown={welcomeHasShown}
        />
      ))}
      <TotalScore name="Bonus" score={bonusScore} />
      <TotalScore name="TOTAL SCORE" score={totalScore} />
    </div>
  );
}

export default ScoreBoard;
