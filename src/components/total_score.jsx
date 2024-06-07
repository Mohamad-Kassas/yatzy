import React, { useState } from "react";
import styles from "../styles/total_score.module.css";

function TotalScore({ name, score }) {
  return (
    <div className={styles.totalScoreContainer}>
      <div className={styles.text}>{name}</div>
      <div className={styles.text}>{score}</div>
    </div>
  );
}

export default TotalScore;
