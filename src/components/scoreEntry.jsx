import React, { useEffect, useState } from "react"
import styles from "../styles/scoreEntry.module.css"

function ScoreEntry({
  name,
  score,
  finalScore,
  handleClick,
  welcomeHasShown,
  isLeaderboard,
}) {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (welcomeHasShown === false) {
      setIsClicked(false) // Reset the isClicked state
    }
  }, [welcomeHasShown])

  return (
    <div
      className={
        isLeaderboard
          ? styles.leaderboardEntryContainer
          : styles.scoreEntryContainer
      }
      onClick={() => {
        if (welcomeHasShown === false || isClicked === true) return
        setIsClicked(true) // Set the isClicked state to true
        handleClick() // Call the handleClick function
      }}
    >
      <div className={styles.name}>{name}</div>
      <div
        className={isClicked || finalScore ? styles.scoreClicked : styles.score} // Change the class based on the isClicked or finalScore state
      >
        {
          finalScore !== null
            ? finalScore
            : score !== 0 && !isClicked
            ? score
            : null // Show the finalScore if it's not null, show the score if it's not 0 and isClicked is false, otherwise show null
        }
      </div>
    </div>
  )
}

export default ScoreEntry
