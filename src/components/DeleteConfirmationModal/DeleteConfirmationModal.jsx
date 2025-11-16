import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ activeModal, name, onCardDelete, onClose }) {
  return (
    <div
      className={`modal ${
        activeModal === "deleteConfirmation" && "modal__opened"
      } modal_type_${name}`}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={onClose}
          className="modal__close modal__close_type_confirm"
          type="button"
        ></button>
        <p className="modal__text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__text">This action is irreversible.</p>
        <button
          className="modal__delete-button modal__delete-button_type_confirm"
          onClick={onCardDelete}
          type="button"
        >
          Yes, delete item
        </button>
        <button
          className="modal__cancel-button"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
