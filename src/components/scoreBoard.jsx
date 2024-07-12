import React from "react"
import ScoreEntry from "./scoreEntry"
import TotalScore from "./totalScore"
import styles from "../styles/scoreBoard.module.css"

function ScoreBoard({
  scores,
  bonusScore,
  totalScore,
  handleClick,
  welcomeHasShown,
  isLeaderboard,
}) {
  return (
    <div className={styles.scoreBoard}>
      {isLeaderboard ? <TotalScore name="LEADERBOARD"/> : null}
      {Object.keys(scores).map((key) => (
        <ScoreEntry
          key={key}
          name={key}
          score={scores[key][1]} // scores[key][1] is the scoring function
          finalScore={isLeaderboard ? scores[key] : scores[key][0]} // scores[key][0] is the final score
          handleClick={() => handleClick(key)}
          welcomeHasShown={welcomeHasShown}
          isLeaderboard={isLeaderboard}
        />
      ))}
      {isLeaderboard ? null : (
        <>
          <TotalScore name="Bonus" score={bonusScore} />
          <TotalScore name="TOTAL SCORE" score={totalScore} />
        </>
      )}
    </div>
  )
}

export default ScoreBoard
