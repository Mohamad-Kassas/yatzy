import React, { useState } from "react";
import styles from "../styles/score_entry.module.css";

function ScoreEntry({ name, score, finalScore, handleClick }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={styles.scoreEntryContainer}
      onClick={() => {
        if (score !== 0) {
          setIsClicked(true);
          handleClick();
        }
      }}
    >
      <div className={styles.name}>{name}</div>
      <div
        className={isClicked || finalScore ? styles.scoreClicked : styles.score}
      >
        {finalScore ? finalScore : score !== 0 ? score : null}
      </div>
    </div>
  );
}

export default ScoreEntry;
