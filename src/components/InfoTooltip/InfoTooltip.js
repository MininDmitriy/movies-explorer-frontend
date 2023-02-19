import "./InfoTooltip.css";

function InfoTooltip({ onClose, isOpen, text }) {
  return(
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button aria-label="Close-button" className="popup__button-close" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{text}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;