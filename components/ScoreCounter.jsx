import { useState, useEffect } from "react";

function ScoreCounter({ score, setScoreModalState }) {
  const [displayedScore, setDisplayedScore] = useState(0);
  const [scoreState, setScoreState] = useState("neutral");
  var transitionAmount = 1;

  useEffect(() => {
    setTimeout(() => {
      setScoreState("neutral");
      var distance = Math.abs(displayedScore - score);

      if (distance > 100) {
        transitionAmount = 10;
      } else if (distance > 50) {
        transitionAmount = 5;
      } else if (distance > 10) {
        transitionAmount = 2;
      } else {
        transitionAmount = 1;
      }

      if (displayedScore < score) {
        setDisplayedScore(displayedScore + transitionAmount);
        setScoreState("positive");
      } else if (displayedScore > score) {
        setDisplayedScore(displayedScore - transitionAmount);
        setScoreState("negative");
      }
    }, 35);
  }, [displayedScore, score]);

  function OpenScoreModal() {
    setScoreModalState([
      {
        visibility: "visible",
      },
    ]);
  }

  return (
    <div
      className={`c-score-counter c-score-counter--${scoreState}`}
      onClick={() => OpenScoreModal()}
    >
      {displayedScore}
      <span>p</span>
    </div>
  );
}

export default ScoreCounter;
