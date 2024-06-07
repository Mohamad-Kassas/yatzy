import React, { useState, useEffect } from "react";
import ScoreEntry from "./score_entry";
import TotalScore from "./total_score";

function ScoreBoard({ dices }) {
  const [bonusScore, setBonusScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);

  const ones = () => {
    return dices.filter((dice) => dice === 1).length;
  };

  const twos = () => {
    return dices.filter((dice) => dice === 2).length * 2;
  };

  const threes = () => {
    return dices.filter((dice) => dice === 3).length * 3;
  };

  const fours = () => {
    return dices.filter((dice) => dice === 4).length * 4;
  };

  const fives = () => {
    return dices.filter((dice) => dice === 5).length * 5;
  };

  const sixes = () => {
    return dices.filter((dice) => dice === 6).length * 6;
  };

  const onePair = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    let max = 0;
    for (const key in counts) {
      if (counts[key] >= 2) {
        max = Math.max(max, key);
      }
    }

    return max * 2;
  };

  const twoPairs = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    let sum = 0;
    let pairs = 0;
    for (const key in counts) {
      if (counts[key] >= 2) {
        sum += key * 2;
        pairs++;
      }
    }

    if (pairs === 2) {
      return sum;
    }

    return 0;
  };

  const threeOfAKind = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    for (const key in counts) {
      if (counts[key] >= 3) {
        return key * 3;
      }
    }

    return 0;
  };

  const fourOfAKind = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    for (const key in counts) {
      if (counts[key] >= 4) {
        return key * 4;
      }
    }

    return 0;
  };

  const smallStraight = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (counts[1] && counts[2] && counts[3] && counts[4] && counts[5]) {
      return 15;
    }

    return 0;
  };

  const largeStraight = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (counts[2] && counts[3] && counts[4] && counts[5] && counts[6]) {
      return 15;
    }

    return 0;
  };

  const fullHouse = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (Object.keys(counts).length === 2) {
      return dices.reduce((acc, dice) => acc + dice);
    }

    return 0;
  };

  const chance = () => {
    return dices.reduce((acc, dice) => acc + dice);
  };

  const yatzy = () => {
    const counts = {};
    dices.forEach((dice) => {
      counts[dice] = (counts[dice] || 0) + 1;
    });

    if (Object.keys(counts).length === 1) {
      return 50;
    }

    return 0;
  };

  const scores = {
    Ones: [null, ones()],
    Twos: [null, twos()],
    Threes: [null, threes()],
    Fours: [null, fours()],
    Fives: [null, fives()],
    Sixes: [null, sixes()],
    "One Pair": [null, onePair()],
    "Two Pairs": [null, twoPairs()],
    "Three of a Kind": [null, threeOfAKind()],
    "Four of a Kind": [null, fourOfAKind()],
    "Small Straight": [null, smallStraight()],
    "Large Straight": [null, largeStraight()],
    "Full House": [null, fullHouse()],
    Chance: [null, chance()],
    Yatzy: [null, yatzy()],
  };

  const bonus = () => {
    const sum =
      scores.Ones[0] &&
      scores.Twos[0] &&
      scores.Threes[0] &&
      scores.Fours[0] &&
      scores.Fives[0] &&
      scores.Sixes[0];
    return sum >= 63 ? 50 : 0;
  };

  useEffect(() => {
    if (
      scores.Ones[0] &&
      scores.Twos[0] &&
      scores.Threes[0] &&
      scores.Fours[0] &&
      scores.Fives[0] &&
      scores.Sixes[0]
    ) {
      setBonusScore(bonus());
    }

    if (
      Object.values(scores).every((scoreList) => scoreList[0] !== null) &&
      bonusScore !== null
    ) {
      setTotalScore(
        Object.values(scores).reduce((acc, score) => acc + score[0], 0) +
          bonusScore
      );
    }
  }, [scores]);

  return (
    <div>
      {Object.keys(scores).map((key) => (
        <ScoreEntry
          key={key}
          name={key}
          score={scores[key][1]}
          finalScore={scores[key][0]}
          handleClick={() => {
            scores[key][0] = scores[key][1];
          }}
        />
      ))}
      <TotalScore name="Bonus" score={bonusScore} />
      <TotalScore name="TOTAL SCORE" score={totalScore} />
    </div>
  );
}

export default ScoreBoard;
