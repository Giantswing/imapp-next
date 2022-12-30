function ScoreCounter({ score, setScoreModalState }) {
  function OpenScoreModal() {
    setScoreModalState([
      {
        visibility: "visible",
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
