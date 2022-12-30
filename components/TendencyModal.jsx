import { useEffect, useState } from "react";

function TendencyModal({
  tendencyList,
  setTendencyList,
  tendencyModalState,
  setTendencyModalState,
  currentTendencyView,
}) {
  const [currentTitle, setCurrentTitle] = useState("test");
  const [currentCost, setCurrentCost] = useState(5);

  const displayedTendency = tendencyList.find(
    (tendency) => tendency.id === tendencyModalState[0].id
  );

  useEffect(() => {
    if (displayedTendency) {
      setCurrentTitle(displayedTendency.title);
      setCurrentCost(displayedTendency.cost);
    } else {
      setCurrentTitle(`New ${currentTendencyView} tendency`);
      setCurrentCost(5);
    }
  }, [displayedTendency, currentTendencyView]);

  function CloseTendencyModal() {
    setTendencyModalState([
      {
        id: 0,
        visibility: "hidden",
        editMode: false,
      },
    ]);
  }

  function CreateOrUpdateTendency() {
    if (tendencyModalState[0].editMode) {
      const index = tendencyList.findIndex(
        (tendency) => tendency.id === tendencyModalState[0].id
      );
      tendencyList[index].title = currentTitle;
      tendencyList[index].cost = currentCost;
      setTendencyList([...tendencyList]);
    } else {
      setTendencyList([
        ...tendencyList,
        {
          title: currentTitle,
          cost: currentCost,
          id: tendencyModalState[0].id,
          type: currentTendencyView,
        },
      ]);
    }

    CloseTendencyModal();
  }

  function DeleteTendency(id) {
    const index = tendencyList.findIndex((tendency) => tendency.id === id);
    tendencyList.splice(index, 1);
    setTendencyList([...tendencyList]);
    CloseTendencyModal();
  }

  return (
    <>
      <div
        className={`c-tendency-modal c-tendency-modal--${tendencyModalState[0].visibility}`}
      >
        <div className="o-container">
          <h2>
            {tendencyModalState[0].editMode ? "Edit" : "Add"}{" "}
            {currentTendencyView} tendency
          </h2>

          <div className="c-tendency-modal__form-field">
            <label htmlFor="tendency-name">Tendency name</label>
            <input
              type="text"
              id="tendency-name"
              value={currentTitle}
              onChange={(e) => {
                setCurrentTitle(e.target.value);
              }}
            />
          </div>

          <div className="c-tendency-modal__form-field">
            <label htmlFor="tendency-cost">
              Tendency {currentTendencyView === "positive" ? "reward" : "cost"}
            </label>
            <input
              type="number"
              id="tendency-cost"
              value={currentCost}
              onChange={(e) => {
                setCurrentCost(e.target.value);
              }}
            />
          </div>

          <button
            className="c-button"
            onClick={() => {
              CreateOrUpdateTendency();
            }}
          >
            {tendencyModalState[0].editMode ? "Edit" : "Add"}{" "}
            {currentTendencyView} tendency
          </button>

          {tendencyModalState[0].editMode && (
            <button
              onClick={() => {
                DeleteTendency(tendencyModalState[0].id);
              }}
              className="c-button"
            >
              Delete
            </button>
          )}
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
