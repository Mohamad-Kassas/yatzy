import React from "react";
import styles from "../styles/dice.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function Dice({ diceImage, dice, keep }) {
  return (
    <div className={styles.diceContainer}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
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
