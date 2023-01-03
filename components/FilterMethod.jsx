import Selectable from "/components/Selectable";
import { useState } from "react";

function FilterMethod({
  currentPositiveFilterMethod,
  setCurrentPositiveFilterMethod,
  currentNegativeFilterMethod,
  setCurrentNegativeFilterMethod,
  positiveFilterList,
  negativeFilterList,
  currentTendencyView,
}) {
  return (
    <div className="c-sorting-method">
      <div className="c-sorting-method__title">FILTER</div>
      {currentTendencyView === "positive" && (
        <div className="c-sorting-method__buttons">
          {positiveFilterList.map((filterMethod) => {
            return (
              <Selectable
                key={filterMethod}
                title={filterMethod}
                callback={() => {
                  setCurrentPositiveFilterMethod(filterMethod);
                }}
                selected={filterMethod === currentPositiveFilterMethod}
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
                  setCurrentNegativeFilterMethod(filterMethod);
                }}
                selected={filterMethod === currentNegativeFilterMethod}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterMethod;
