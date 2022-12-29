function ScoreCounter({ score, setUpdateScoreModalState }) {
  function OpenScoreModal() {
    setUpdateScoreModalState([
      {
        visibility: "visible",
        currentScore: score,
      },
    ]);
  }

  return (
    <div className="c-score-counter" onClick={() => OpenScoreModal()}>
      {score}
      <span>p</span>
    </div>
  );
}

export default ScoreCounter;
