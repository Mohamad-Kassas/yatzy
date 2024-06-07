import React, { useState } from "react"
import FiveDice from "./five_dices"
import styles from "../styles/gameboard.module.css"

function Gameboard() {
  const [dices, setDices] = useState([0, 0, 0, 0, 0])
  const [keep, setKeep] = useState([false, false, false, false, false])

  const roll = () => {
    const newDices = dices.map((dice, index) => {
      if (keep[index]) {
        return dice
      } else {
        return Math.floor(Math.random() * 6) + 1
      }
    })
    setDices(newDices)
  }

  const toggleKeep = (index) => {
    const newKeep = [...keep]
    newKeep[index] = !newKeep[index]
    setKeep(newKeep)
  }

  return (
    <div className={styles.gameboardContainer}>
      <FiveDice dices={dices} keep={keep} toggleKeep={toggleKeep} />
      <button className={styles.rollButton} onClick={roll}>
        Roll
      </button>
    </div>
  )
}

export default Gameboard
