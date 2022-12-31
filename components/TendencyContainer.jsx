import Tendency from "/components/Tendency";

function TendencyContainer({
  tendencyList,
  setTendencyList,
  setTendencyModalState,
  setScore,
  score,
  currentTendencyView,
  entering,
}) {
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

  return (
    <div
      className={`tendency-container ${
        entering ? "tendency-container--entering" : ""
      }`}
    >
      {tendencyList
        .filter((tendency) => tendency.type === currentTendencyView)
        .sort((a, b) => (a.title > b.title ? 1 : -1))
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
