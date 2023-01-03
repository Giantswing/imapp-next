import Selectable from "/components/Selectable";
import { useState } from "react";

function SortingMethod({
  sortingMethodList,
  currentSortingMethod,
  setCurrentSortingMethod,
}) {
  return (
    <div className="c-sorting-method">
      <div className="c-sorting-method__title">SORT</div>
      <div className="c-sorting-method__buttons">
        {sortingMethodList.map((sortingMethod) => {
          return (
            <Selectable
              key={sortingMethod}
              title={sortingMethod}
              callback={() => {
                setCurrentSortingMethod(sortingMethod);
              }}
              selected={sortingMethod === currentSortingMethod}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SortingMethod;
