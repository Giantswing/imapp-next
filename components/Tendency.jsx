function Tendency({ name, cost, tendencyState, callback }) {
  return (
    <div
      onClick={callback}
      className={`c-tendency c-tendency--${tendencyState}`}
    >
      <div className="c-tendency__main">
        <h3 className="c-tendency__main-title">{name}</h3>
      </div>
      <div className="c-tendency__description">
        <h4 className="c-tendency__description-cost">{cost}p</h4>
      </div>
    </div>
  );
}

export default Tendency;
