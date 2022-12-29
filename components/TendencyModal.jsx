function TendencyModal({ tendencyModalState, closeModal }) {
  return (
    <div className={`c-tendency-modal c-tendency-modal--${tendencyModalState}`}>
      <div className="o-container">
        <h2>Add positive tendency</h2>

        <div className="c-tendency-modal__form">
          <div className="c-tendency-modal__form-field">
            <label htmlFor="tendency-name">Tendency name</label>
            <input type="text" id="tendency-name" />

            <label htmlFor="tendency-cost">Tendency cost</label>
            <input type="number" id="tendency-cost" />

            <button className="c-tendency-modal__form-button">
              Add tendency
            </button>

            <button
              onClick={closeModal}
              className="c-tendency-modal__form-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TendencyModal;
