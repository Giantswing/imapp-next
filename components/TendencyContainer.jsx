import Tendency from "/components/Tendency";
import { useState, useEffect } from "react";

function TendencyContainer({
  tendencyList,
  setTendencyList,
  setTendencyModalState,
  setScore,
  score,
  currentTendencyView,
  entering,
  currentSortingMethod,
  currentPositiveFilterMethod,
  currentNegativeFilterMethod,
}) {
  const [enabledTendencies, setEnabledTendencies] = useState([]);
  const [disabledTendencies, setDisabledTendencies] = useState([]);
  const [currentFilterMethod, setCurrentFilterMethod] = useState("all");

  function OpenTendencyModal() {
    setTendencyModalState([
      {
        title: "",
        cost: 0,
        id: GenerateKeyID(),
        visibility: "visible",
        editMode: false,
      },
    ]);
  }

  function GenerateKeyID() {
    return Math.random().toString(36).substr(2, 9);
  }

  useEffect(() => {
    setEnabledTendencies(
      tendencyList.map((tendency) => {
        tendency.enabled = true;

        if (tendency.type == "negative") {
          if (tendency.cost > score) tendency.enabled = false;
        }

        if (
          tendency.maxIterations > 0 &&
          tendency.iterations >= tendency.maxIterations
        )
          tendency.enabled = false;

        return tendency;
      })
    );
    console.log(enabledTendencies);
  }, [score, tendencyList]);

  useEffect(() => {
    if (currentTendencyView == "positive") {
      setCurrentFilterMethod(currentPositiveFilterMethod);
    } else if (currentTendencyView == "negative") {
      setCurrentFilterMethod(currentNegativeFilterMethod);
    }
  }, [
    currentTendencyView,
    currentPositiveFilterMethod,
    currentNegativeFilterMethod,
  ]);

  return (
    <div
      className={`tendency-container ${
        entering ? "tendency-container--entering" : ""
      }`}
    >
      {enabledTendencies &&
        enabledTendencies
          .filter((tendency) => tendency.type === currentTendencyView)
          .sort((a, b) => {
            if (currentSortingMethod === "cost") {
              if (parseInt(a.cost) > parseInt(b.cost)) return 1;
              if (parseInt(a.cost) < parseInt(b.cost)) return -1;
              return 0;
            } else if (currentSortingMethod === "name") {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            } else if (currentSortingMethod === "duration") {
              if (parseInt(a.duration) > parseInt(b.duration)) return 1;
              if (parseInt(a.duration) < parseInt(b.duration)) return -1;
              return 0;
            }
          })
          .sort((a, b) => {
            if (a.enabled === b.enabled) return 0;
            if (a.enabled == true && b.enabled == false) return -1;
            if (a.enabled == false && b.enabled == true) return 1;
          })
          .filter((tendency) => {
            if (currentFilterMethod === "all") return true;
            else return tendency.category === currentFilterMethod;
          })
          .map((tendency) => (
            <Tendency
              key={tendency.id}
              id={tendency.id}
              setScore={setScore}
              score={score}
              setTendencyList={setTendencyList}
              tendencyList={tendencyList}
              setTendencyModalState={setTendencyModalState}
            />
          ))}

      <a className="c-add-tendency_button" onClick={OpenTendencyModal}>
        Add new {currentTendencyView === "positive" ? "positive" : "negative"}{" "}
        tendency...
      </a>
    </div>
  );
}

export default TendencyContainer;
