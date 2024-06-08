import React, { useState } from "react"
import FiveDice from "./five_dices"
import styles from "../styles/gameboard.module.css"

function Gameboard() {
  const [dices, setDices] = useState([0, 0, 0, 0, 0])
  const [keep, setKeep] = useState([false, false, false, false, false])
  const [rollsLeft, setRollsLeft] = useState(3)
  const [welcomeHasShown, setWelcomeHasShown] = useState(false)

  const roll = () => {
    if (rollsLeft === 0) return
    const newDices = dices.map((dice, index) => {
      if (keep[index]) {
        return dice
      } else {
        return Math.floor(Math.random() * 6) + 1
      }
    })
    setRollsLeft(rollsLeft - 1)
    setDices(newDices)
  }

  const toggleKeep = (index) => {
    const newKeep = [...keep]
    newKeep[index] = !newKeep[index]
    setKeep(newKeep)
  }

  const startButtonClick = () => {
    roll()
    setWelcomeHasShown(true)
  }

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
  )
}

export default Gameboard
