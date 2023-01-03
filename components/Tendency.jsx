import Image from "next/image";
import { useEffect, useState } from "react";

function Tendency({
  tendencyList,
  id,
  score,
  setScore,
  setTendencyModalState,
}) {
  const [tendencyDisabled, setTendencyDisabled] = useState(false);
  const [tendency, setTendency] = useState(
    tendencyList.find((tendency) => tendency.id === id)
  );

  const [currentIterations, setCurrentIterations] = useState(0);
  const [currentMaxIterations, setCurrentMaxIterations] = useState(0);

  useEffect(() => {
    setTendency(tendencyList.find((tendency) => tendency.id === id));
    setCurrentIterations(tendency.iterations);
    setCurrentMaxIterations(tendency.maxIterations);

    if (
      (score < parseInt(tendency.cost) && tendency.type === "negative") ||
      (currentMaxIterations === currentIterations && currentMaxIterations > 0)
    )
      setTendencyDisabled(true);
    else setTendencyDisabled(false);
  }, [
    score,
    tendency,
    tendencyList,
    currentIterations,
    currentMaxIterations,
    id,
  ]);

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

  function IncreaseIterations() {
    if (parseInt(currentMaxIterations) > 0) {
      setTendency((prevTendency) => {
        return {
          ...prevTendency,
          iterations: parseInt(currentIterations) + 1,
        };
      });

      const index = tendencyList.findIndex((tendency) => tendency.id === id);
      tendencyList[index].iterations = parseInt(tendency.iterations) + 1;
    }
  }

  function Iterations() {
    if (currentMaxIterations === 0) {
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
      for (var i = 0; i < currentMaxIterations; i++) {
        if (i < currentIterations) {
          iterations.push(
            <Image
              src="iteration-full.svg"
              alt="iteration-full"
              width={20}
              height={20}
              key={i}
            />
          );
        } else {
          iterations.push(
            <Image
              src="iteration-empty.svg"
              alt="iteration-empty"
              width={20}
              height={20}
              key={i}
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
            IncreaseIterations();

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
        {tendency.duration > 0 && (
          <div className="c-tendency__description_duration">
            <Image src="time-icon.svg" alt="duration" width={20} height={20} />
            <p>{tendency.duration} min</p>
          </div>
        )}
        <div className="c-tendency__description_iterations">
          <Iterations />
        </div>
      </div>
    </div>
  );
}

export default Tendency;
