import React from "react"
import FiveDice from "./five_dices"
import styles from "../styles/gameboard.module.css"

function Gameboard() {
  return (
    <div className={styles.gameboardContainer}>
        <FiveDice />
    </div>
  )
}

export default Gameboard
