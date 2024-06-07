import React, { useState } from "react"
import Dice from "./dice"
import styles from "../styles/five_dices.module.css"

import side1 from "../assets/dice images/side 1.png"
import side2 from "../assets/dice images/side 2.png"
import side3 from "../assets/dice images/side 3.png"
import side4 from "../assets/dice images/side 4.png"
import side5 from "../assets/dice images/side 5.png"
import side6 from "../assets/dice images/side 6.png"

function FiveDices() {
  const [dices, setDices] = useState([0, 0, 0, 0, 0])
  const [keep, setKeep] = useState([false, false, false, false, false])

  const diceImages = [side1, side2, side3, side4, side5, side6]

  const getDiceImage = (dice) => {
    return diceImages[dice - 1]
  }

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

  return (
    <div>
      <button onClick={roll}>Roll</button>
      <div className={styles.allDicesContainer}>
        <div className={styles.twoDiceContainer}>
          <Dice
            diceImage={getDiceImage(dices[0])}
            dice={dices[0]}
            keep={keep[0]}
          />
          <Dice
            diceImage={getDiceImage(dices[1])}
            dice={dices[1]}
            keep={keep[1]}
          />
        </div>
        <Dice
          diceImage={getDiceImage(dices[2])}
          dice={dices[2]}
          keep={keep[2]}
        />
        <div className={styles.twoDiceContainer}>
          <Dice
            diceImage={getDiceImage(dices[3])}
            dice={dices[3]}
            keep={keep[3]}
          />
          <Dice
            diceImage={getDiceImage(dices[4])}
            dice={dices[4]}
            keep={keep[4]}
          />
        </div>
      </div>
    </div>
  )
}

export default FiveDices
