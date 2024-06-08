import React from "react"
import Gameboard from "./gameboard"
import Scoreboard from "./score_board"
import styles from "../styles/game.module.css"

function Game() {
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.gameContainer}>
        <div className={styles.gameboardContainer}>
          <Gameboard />
        </div>

        <div className={styles.scoreboardContainer}>
          <Scoreboard dices={[0, 0, 0, 0, 0]} />
        </div>
      </div>
    </div>
  )
}

export default Game
