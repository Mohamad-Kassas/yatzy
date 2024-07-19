import React from "react";
import FiveDice from "./fiveDices";
import styles from "../styles/gameBoard.module.css";

function Gameboard({
  dices,
  keep,
  rollsLeft,
  welcomeHasShown,
  roll,
  toggleKeep,
  startButtonClick,
}) {
  return (
    <div className={styles.gameboardContainer}>
      {welcomeHasShown ? (
        <>
          <FiveDice dices={dices} keep={keep} toggleKeep={toggleKeep} />
          <button className={styles.rollButton} onClick={roll}>
            Roll ({rollsLeft}/2)
          </button>
        </>
      ) : (
        <>
          <h1 className={styles.welcomeHeader}>Welcome to Yatzy!</h1>
          <p className={styles.introText}>
            Click the "Start" button to start the game. You can click on the
            dices to keep them. You have 2 rolls in total.
          </p>
          <button
            className={styles.rollButton}
            onClick={() => startButtonClick()}
          >
            Start
          </button>
        </>
      )}
    </div>
  );
}

export default Gameboard;
