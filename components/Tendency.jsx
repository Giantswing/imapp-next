import Image from "next/image";

function Tendency({
  title,
  cost,
  id,
  tendencyState,
  callback,
  optionsFunction,
}) {
  return (
    <div className={`c-tendency c-tendency--${tendencyState}`}>
      <div className="c-tendency__main">
        <h3 className="c-tendency__main-title" onClick={callback}>
          {title}
        </h3>
        <Image
          src="options-icon.svg"
          onClick={() => {
            optionsFunction(title, cost, id);
          }}
          alt="options"
          width={20}
          height={20}
        />
      </div>
      <div className="c-tendency__description">
        <h4 className="c-tendency__description-cost">{cost}p</h4>
      </div>
    </div>
  );
}

export default Tendency;
