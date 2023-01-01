import Image from "next/image";
import { useEffect, useState } from "react";

function Tendency({
  tendencyList,
  id,
  score,
  setScore,
  setTendencyModalState,
}) {
  const prevTendency = tendencyList.find((tendency) => tendency.id === id);
  const [tendencyDisabled, setTendencyDisabled] = useState(false);

  if (!prevTendency.iterations) {
    prevTendency.iterations = 0;
    prevTendency.maxIterations = -1;
  }

  if (prevTendency.maxIterations === -1) {
    prevTendency.maxIterations = 5;
  }

  const tendency = prevTendency;

  useEffect(() => {
    if (
      (score < parseInt(tendency.cost) && tendency.type === "negative") ||
      prevTendency.maxIterations === prevTendency.iterations
    )
      setTendencyDisabled(true);
    else setTendencyDisabled(false);
  }, [score, tendency, prevTendency]);

  const [pressed, setPressed] = useState(false);

  function OpenEditTendencyModal() {
    setTendencyModalState([
      {
        title: tendency.name,
        cost: parseInt(tendency.cost),
        id: tendency.id,
        visibility: "visible",
        editMode: true,
      },
    ]);
  }

  function ChangeScore() {
    if (tendency.type === "positive")
      setScore((prevScore) => parseInt(prevScore) + parseInt(tendency.cost));
    else setScore((prevScore) => parseInt(prevScore) - parseInt(tendency.cost));
  }

  function Iterations() {
    if (tendency.maxIterations === -1) {
      return (
        <Image
          src="infinite-symbol.svg"
          alt="infinity"
          width={20}
          height={20}
        />
      );
    } else {
      var iterations = [];
      for (var i = 0; i < tendency.maxIterations; i++) {
        if (i < tendency.iterations) {
          iterations.push(
            <Image
              src="iteration-full.svg"
              alt="iteration-full"
              width={20}
              height={20}
            />
          );
        } else {
          iterations.push(
            <Image
              src="iteration-empty.svg"
              alt="iteration-empty"
              width={20}
              height={20}
            />
          );
        }
      }

      return iterations;
    }
  }

  return (
    <div
      className={`c-tendency c-tendency--${tendency.type} ${
        tendencyDisabled ? "c-tendency--disabled" : ""
      }${pressed ? "c-tendency--pressed" : ""}`}
    >
      <div className="c-tendency__main">
        <h3
          className="c-tendency__main-title"
          onClick={() => {
            ChangeScore();
            //increase iterations
            if (
              tendency.maxIterations !== -1 &&
              tendency.iterations < tendency.maxIterations
            ) {
              tendency.iterations++;
            }

            setPressed(true);

            setTimeout(() => {
              setPressed(false);
            }, 100);
          }}
        >
          {tendency.title}
        </h3>
        <Image
          src="options-icon.svg"
          onClick={() => {
            OpenEditTendencyModal();
          }}
          alt="options"
          width={20}
          height={20}
        />
      </div>
      <div className="c-tendency__description">
        <h4 className="c-tendency__description-cost">{tendency.cost}p</h4>
        <div className="c-tendency__description_iterations">
          <Iterations />
        </div>
      </div>
    </div>
  );
}

export default Tendency;
