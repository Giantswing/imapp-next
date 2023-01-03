import { useEffect, useState } from "react";
import Selectable from "/components/Selectable";

function TendencyModal({
  tendencyList,
  setTendencyList,
  tendencyModalState,
  setTendencyModalState,
  currentTendencyView,
  positiveFilterList,
  negativeFilterList,
}) {
  const [currentTitle, setCurrentTitle] = useState("test");
  const [currentCost, setCurrentCost] = useState(5);

  const [currentIterations, setCurrentIterations] = useState(0);
  const [currentMaxIterations, setCurrentMaxIterations] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("all");

  const [unlimitedUses, setUnlimitedUses] = useState(true);

  const [displayedTendency, setDisplayedTendency] = useState({});

  useEffect(() => {
    if (tendencyList)
      setDisplayedTendency(
        tendencyList.find(
          (tendency) => tendency.id === tendencyModalState[0].id
        )
      );
    else {
      tendencyList = [];
    }

    if (displayedTendency) {
      setCurrentTitle(displayedTendency.title);
      setCurrentCost(displayedTendency.cost);
      setCurrentIterations(displayedTendency.iterations);
      setCurrentMaxIterations(displayedTendency.maxIterations);
      setCurrentDuration(displayedTendency.duration);
      setCurrentCategory(displayedTendency.category);
      if (displayedTendency.maxIterations === 0) {
        setUnlimitedUses(true);
      } else setUnlimitedUses(false);
    } else {
      setCurrentTitle(`New ${currentTendencyView} tendency`);
      setCurrentCost(5);
      setCurrentIterations(0);
      setCurrentMaxIterations(5);
      setUnlimitedUses(true);
      setCurrentDuration(0);
      setCurrentCategory("all");
    }
  }, [
    tendencyModalState.visibility,
    displayedTendency,
    currentTendencyView,
    tendencyList,
    tendencyModalState,
  ]);

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
      tendencyList[index].iterations = unlimitedUses
        ? 0
        : parseInt(currentIterations);
      tendencyList[index].maxIterations = unlimitedUses
        ? 0
        : parseInt(currentMaxIterations);
      tendencyList[index].duration = parseInt(currentDuration);
      tendencyList[index].category = currentCategory;

      setTendencyList([...tendencyList]);
    } else {
      setTendencyList([
        ...tendencyList,
        {
          title: currentTitle,
          cost: currentCost,
          id: tendencyModalState[0].id,
          type: currentTendencyView,
          iterations: unlimitedUses ? 0 : parseInt(currentIterations),
          maxIterations: unlimitedUses ? 0 : parseInt(currentMaxIterations),
          duration: parseInt(currentDuration),
          category: currentCategory,
        },
      ]);
    }
  }

  function DeleteTendency(id) {
    const index = tendencyList.findIndex((tendency) => tendency.id === id);
    tendencyList.splice(index, 1);
    setTendencyList([...tendencyList]);
  }

  return (
    <>
      <div
        className={`c-tendency-modal c-tendency-modal--${tendencyModalState[0].visibility}`}
      >
        <div className="o-container">
          <div className="c-tendency-modal__id">{tendencyModalState[0].id}</div>
          <h2>
            {tendencyModalState[0].editMode ? "Edit" : "Add"}{" "}
            {currentTendencyView} tendency
          </h2>
          <div className="c-tendency-modal__form-field">
            <label htmlFor="tendency-name">Tendency name</label>
            <input
              type="text"
              id="tendency-name"
              value={currentTitle || ""}
              onChange={(e) => {
                setCurrentTitle(e.target.value);
              }}
            />
          </div>

          <div className="c-tendency-modal__group">
            <div className="c-tendency-modal__form-field">
              <label htmlFor="tendency-cost">
                Tendency{" "}
                {currentTendencyView === "positive" ? "reward" : "cost"}
              </label>
              <input
                type="number"
                id="tendency-cost"
                value={currentCost || ""}
                onChange={(e) => {
                  setCurrentCost(e.target.value);
                }}
              />
            </div>

            <div className="c-tendency-modal__form-field">
              <label htmlFor="tendency-duration">Duration</label>
              <input
                type="number"
                id="tendency-duration"
                value={currentDuration || ""}
                onChange={(e) => {
                  setCurrentDuration(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="c-tendency-modal__form-field">
            <div className="c-tendency-modal__form-field--checkbox">
              <input
                type="checkbox"
                id="tendency-unlimited-uses"
                checked={unlimitedUses}
                onChange={(e) => {
                  setUnlimitedUses(e.target.checked);
                }}
              />
              <p>Unlimited times a day</p>
            </div>
          </div>

          {!unlimitedUses && (
            <div className="c-tendency-modal__group">
              <div className="c-tendency-modal__form-field">
                <label htmlFor="tendency-current-iterations">Iterations</label>
                <input
                  type="number"
                  id="tendency-current-iterations"
                  value={currentIterations}
                  onChange={(e) => {
                    setCurrentIterations(e.target.value);
                  }}
                />
              </div>

              <div className="c-tendency-modal__form-field">
                <label htmlFor="tendency-max-iterations">Max</label>
                <input
                  type="number"
                  id="tendency-max-iterations"
                  value={currentMaxIterations}
                  onChange={(e) => {
                    setCurrentMaxIterations(e.target.value);
                    console.log(displayedTendency + " " + currentMaxIterations);
                  }}
                />
              </div>
            </div>
          )}

          <div className="c-tendency-modal__form-field">
            <label htmlFor="tendency-type">Tendency category</label>
            {currentTendencyView === "positive" && (
              <div className="c-sorting-method__buttons">
                {positiveFilterList.map((filterMethod) => {
                  return (
                    <Selectable
                      key={filterMethod}
                      title={filterMethod}
                      callback={() => {
                        setCurrentCategory(filterMethod);
                      }}
                      selected={filterMethod === currentCategory}
                    />
                  );
                })}
              </div>
            )}

            {currentTendencyView === "negative" && (
              <div className="c-sorting-method__buttons">
                {negativeFilterList.map((filterMethod) => {
                  return (
                    <Selectable
                      key={filterMethod}
                      title={filterMethod}
                      callback={() => {
                        setCurrentCategory(filterMethod);
                      }}
                      selected={filterMethod === currentCategory}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <button
            className="c-button"
            onClick={() => {
              CreateOrUpdateTendency();
              CloseTendencyModal();
            }}
          >
            {tendencyModalState[0].editMode ? "Edit" : "Add"}{" "}
            {currentTendencyView} tendency
          </button>
          {tendencyModalState[0].editMode && (
            <button
              onClick={() => {
                DeleteTendency(tendencyModalState[0].id);
                CloseTendencyModal();
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
