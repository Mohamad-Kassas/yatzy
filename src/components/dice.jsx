import React from "react";
import styles from "../styles/dice.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

function Dice({ diceImage, dice, keep, toggleKeep }) {
  return (
    <div className={styles.diceContainer} onClick={toggleKeep}>
      <div className={styles.iconContainer}>
        {keep ? (
          <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
        ) : (
          <FontAwesomeIcon icon={faLockOpen} className={styles.lockOpenIcon} />
        )}
      </div>
      <img
        className={styles.diceImage}
        src={diceImage}
        alt={`Dice side ${dice}`}
        draggable="false"
      />
    </div>
  );
}

export default Dice;
