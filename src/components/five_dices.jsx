import React, { useState } from "react"
import Dice from "./dice"
import styles from "../styles/five_dices.module.css"

import side1 from "../docs/design_system/Dice Images/side 1.png"
import side2 from "../docs/design_system/Dice Images/side 2.png"
import side3 from "../docs/design_system/Dice Images/side 3.png"
import side4 from "../docs/design_system/Dice Images/side 4.png"
import side5 from "../docs/design_system/Dice Images/side 5.png"
import side6 from "../docs/design_system/Dice Images/side 6.png"

function FiveDices({ dices, keep, toggleKeep}) {
  const diceImages = [side1, side2, side3, side4, side5, side6]

  const getDiceImage = (dice) => {
    return diceImages[dice - 1]
  }

  return (
    <div>
      <div className={styles.allDicesContainer}>
        <div className={styles.twoDiceContainer}>
          <Dice
            diceImage={getDiceImage(dices[0])}
            dice={dices[0]}
            keep={keep[0]}
            toggleKeep={() => toggleKeep(0)}
          />
          <Dice
            diceImage={getDiceImage(dices[1])}
            dice={dices[1]}
            keep={keep[1]}
            toggleKeep={() => toggleKeep(1)}
          />
        </div>
        <Dice
          diceImage={getDiceImage(dices[2])}
          dice={dices[2]}
          keep={keep[2]}
            toggleKeep={() => toggleKeep(2)}
        />
        <div className={styles.twoDiceContainer}>
          <Dice
            diceImage={getDiceImage(dices[3])}
            dice={dices[3]}
            keep={keep[3]}
            toggleKeep={() => toggleKeep(3)}
          />
          <Dice
            diceImage={getDiceImage(dices[4])}
            dice={dices[4]}
            keep={keep[4]}
            toggleKeep={() => toggleKeep(4)}
          />
        </div>
      </div>
    </div>
  )
}

export default FiveDices
