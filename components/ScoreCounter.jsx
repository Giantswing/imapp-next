function ScoreCounter({ score }) {
  //score = score.toString().padStart(6, "0");
  return (
    <div className="c-score-counter">
      {score}
      <span>p</span>
    </div>
  );
}

export default ScoreCounter;
