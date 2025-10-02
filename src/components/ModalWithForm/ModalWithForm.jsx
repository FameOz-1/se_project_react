import "./ModalWithForm.css";
// import "../../assets/close.svg";

function ModalWithForm({
  children,
  isOpen,
  buttonText,
  title,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
}) {
  if (!isOpen) return null;
  return (
    <div className={`modal${isOpen ? " modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button">
          X
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
