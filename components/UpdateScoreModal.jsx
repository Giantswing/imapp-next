import { useEffect, useState } from "react";

function UpdateScoreModal({
  score,
  setScore,
  scoreModalState,
  setScoreModalState,
  tendencyList,
  setTendencyList,
}) {
  const [newScore, setNewScore] = useState(score);
  return (
    <>
      <div
        className={`c-tendency-modal c-tendency-modal--${scoreModalState[0].visibility}`}
      >
        <div className="o-container">
          <h2>Update score manually</h2>

          <div className="c-tendency-modal__form-field">
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              value={newScore}
              onChange={(e) => {
                setNewScore(e.target.value);
              }}
            />
          </div>
          <div className="c-update-score-modal__form-field">
            <button
              className="c-button"
              onClick={() => {
                setScore(parseInt(newScore));
                setScoreModalState([
                  {
                    visibility: "hidden",
                  },
                ]);
              }}
            >
              Update score
            </button>
          </div>

          <div className="c-update-score-modal__form-field">
            <button
              className="c-button"
              onClick={() => {
                //reset iterations on tendencyList to 0 if maxIterations is not 0
                tendencyList.forEach((tendency) => {
                  if (tendency.maxIterations !== 0) {
                    tendency.iterations = 0;
                  }
                });
                setTendencyList([...tendencyList]);

                setScoreModalState([
                  {
                    visibility: "hidden",
                  },
                ]);
              }}
            >
              Reset all iterations
            </button>
          </div>
        </div>
      </div>

      <div
        className={`c-tendency-modal__bg c-tendency-modal__bg--${scoreModalState[0].visibility}`}
        onClick={() => {
          setScoreModalState([
            {
              visibility: "hidden",
            },
          ]);
        }}
      ></div>
    </>
  );
}

export default UpdateScoreModal;
