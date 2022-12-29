import { useEffect, useState } from "react";

function UpdateScoreModal({ state }) {
  const [score, setScore] = useState(state[0].currentScore);
  const [visibility, setVisibility] = useState(state[0].visibility);

  useEffect(() => {
    setScore(state[0].currentScore);
    setVisibility(state[0].visibility);
  }, [state]);

  return (
    <>
      <div className={`c-tendency-modal c-tendency-modal--${visibility}`}>
        <div className="o-container">
          <h2>Update score manually</h2>
          <div className="c-tendency-modal__form">
            <div className="c-tendency-modal__form-field">
              <label htmlFor="score">Score</label>
              <input
                type="number"
                id="score"
                value={score}
                onChange={(e) => {
                  setScore(e.target.value);
                }}
              />
            </div>
            <div className="c-update-score-modal__form-field">
              <button
                className="c-tendency-modal__form-button"
                onClick={() => {
                  updateScore(score);
                }}
              >
                Update score
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`c-tendency-modal__bg c-tendency-modal__bg--${visibility}`}
        onClick={() => {
          setVisibility("hidden");
        }}
      ></div>
    </>
  );
}

export default UpdateScoreModal;
