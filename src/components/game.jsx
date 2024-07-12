import React, { useState } from "react"
import Gameboard from "./gameBoard"
import Scoreboard from "./scoreBoard"
import styles from "../styles/game.module.css"

function Game() {
  const [gameState, setGameState] = useState({
    dices: [0, 0, 0, 0, 0],
    keep: [false, false, false, false, false],
    rollsLeft: 3,
    scores: {
      Ones: [null, 0, "ones"],
      Twos: [null, 0, "twos"],
      Threes: [null, 0, "threes"],
      Fours: [null, 0, "fours"],
      Fives: [null, 0, "fives"],
      Sixes: [null, 0, "sixes"],
      "One Pair": [null, 0, "onePair"],
      "Two Pairs": [null, 0, "twoPairs"],
      "Three of a Kind": [null, 0, "threeOfAKind"],
      "Four of a Kind": [null, 0, "fourOfAKind"],
      "Small Straight": [null, 0, "smallStraight"],
      "Large Straight": [null, 0, "largeStraight"],
      "Full House": [null, 0, "fullHouse"],
      Chance: [null, 0, "chance"],
      Yatzy: [null, 0, "yatzy"],
    },
    bonusScore: null,
    totalScore: null,
    welcomeHasShown: false,
  })

  // Function to request a specific action be performed and fetch the game state afterwards from the server
  const fetchGameState = (action, index = null, key = null) => {
    const xhttp = new XMLHttpRequest()

    let url

    if (index !== null) {
      url = `http://localhost:8000/server.php?action=${action}&index=${index}`
    } else if (key !== null) {
      url = `http://localhost:8000/server.php?action=${action}&key=${key}`
    } else {
      url = `http://localhost:8000/server.php?action=${action}`
    }

    xhttp.open("GET", url, true)
    xhttp.withCredentials = true
    xhttp.setRequestHeader("Content-Type", "application/json")

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const response = JSON.parse(xhttp.responseText)
        setGameState(response)
      }
    }

    xhttp.send()
  }

  // Function to request the server to roll the dice
  const rollDice = () => {
    fetchGameState("roll")
  }

  // Function to request the server to toggle the keep status of a dice
  const toggleKeep = (index) => {
    fetchGameState("toggleKeep", index)
  }

  // Function to request the server to handle a click on the scoreboard
  const handleClick = (key) => {
    fetchGameState("handleClick", null, key)
  }

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.gameContainer}>
        <div className={styles.gameboardContainer}>
          <Gameboard
            dices={gameState.dices}
            keep={gameState.keep}
            rollsLeft={gameState.rollsLeft}
            welcomeHasShown={gameState.welcomeHasShown}
            roll={rollDice}
            toggleKeep={toggleKeep}
            startButtonClick={() => fetchGameState("start")}
          />
        </div>
        <div className={styles.scoreboardContainer}>
          <Scoreboard
            scores={gameState.scores}
            bonusScore={gameState.bonusScore}
            totalScore={gameState.totalScore}
            welcomeHasShown={gameState.welcomeHasShown}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Game
