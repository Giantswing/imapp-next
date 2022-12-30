import Image from "next/image";

function Tendency({
  tendencyList,
  id,
  score,
  setScore,
  setTendencyModalState,
}) {
  const tendency = tendencyList.find((tendency) => tendency.id === id);

  function OpenEditTendencyModal() {
    setTendencyModalState([
      {
        title: tendency.name,
        cost: tendency.cost,
        id: tendency.id,
        visibility: "visible",
        editMode: true,
      },
    ]);
  }

  function ChangeScore() {
    if (tendency.type === "positive")
      setScore((prevScore) => prevScore + parseInt(tendency.cost));
    else setScore((prevScore) => prevScore - parseInt(tendency.cost));
  }

  return (
    <div
      className={`c-tendency c-tendency--${tendency.type} ${
        score < parseInt(tendency.cost) && tendency.type === "negative"
          ? "c-tendency--disabled"
          : ""
      }`}
    >
      <div className="c-tendency__main">
        <h3 className="c-tendency__main-title" onClick={() => ChangeScore()}>
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
      </div>
    </div>
  );
}

export default Tendency;
