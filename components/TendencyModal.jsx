import { useEffect, useState } from "react";

function TendencyModal({
  tendencyModalState,
  setTendencyModalState,
  currentTendencyView,
}) {
  const [title, setTitle] = useState("test");
  const [cost, setCost] = useState(5);
  const [editMode, setEditMode] = useState(false);

  function CloseTendencyModal() {
    setTendencyModalState([
      {
        title: "",
        cost: 0,
        id: 0,
        visibility: "hidden",
        editMode: false,
      },
    ]);
  }

  useEffect(() => {
    setTitle(tendencyModalState[0].title);
    setCost(tendencyModalState[0].cost);
    setEditMode(tendencyModalState[0].editMode);
  }, [tendencyModalState]);

  return (
    <>
      <div
        className={`c-tendency-modal c-tendency-modal--${tendencyModalState[0].visibility}`}
      >
        <div className="o-container">
          <h2>
            {editMode ? "Edit" : "Add"} {currentTendencyView} tendency
          </h2>

          <div className="c-tendency-modal__form">
            <div className="c-tendency-modal__form-field">
              <label htmlFor="tendency-name">Tendency name</label>
              <input
                type="text"
                id="tendency-name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label htmlFor="tendency-cost">
                Tendency{" "}
                {currentTendencyView === "positive" ? "reward" : "cost"}
              </label>
              <input
                type="number"
                id="tendency-cost"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />

              <button
                className="c-tendency-modal__form-button"
                onClick={() => {
                  addNewTendency(title, cost, tendencyModalState[0].id);
                }}
              >
                {editMode ? "Edit" : "Add"} {currentTendencyView} tendency
              </button>

              {editMode && (
                <button
                  onClick={() => {
                    deleteFunction(tendencyModalState[0].id);
                    closeModal();
                  }}
                  className="c-tendency-modal__form-button"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`c-tendency-modal__bg c-tendency-modal__bg--${tendencyModalState[0].visibility}`}
        onClick={() => CloseTendencyModal()}
      ></div>
    </>
  );
}

export default TendencyModal;
