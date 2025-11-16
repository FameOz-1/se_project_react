import useFormWithValidation from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, postItem }) => {
  const defaultValues = {
    name: "",
    link: "",
    weather: "",
  };
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
    touched,
    resetForm,
  } = useFormWithValidation(defaultValues);
  console.log(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    postItem(values)
      .then((newItem) => {
        onAddItem(newItem);
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
    // if (!isValid) return;
    // onAddItem(values);
    // resetForm(defaultValues, {}, false);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className={`modal__input${
            errors.name ? " modal__input_type_error" : ""
          }`}
          id="name"
          placeholder="What should we call you?"
          value={values.name}
          onChange={handleChange}
          required
          onBlur={handleBlur}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className={`modal__input${
            errors.link ? " modal__input_type_error" : ""
          }`}
          id="imageUrl"
          placeholder="Image URL"
          value={values.link}
          onChange={handleChange}
          required
          onBlur={handleBlur}
          autoComplete="url"
        />
        {touched.link && errors.link && (
          <span className="modal__error">{errors.link}</span>
        )}
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className={`modal__radio-input${
              errors.weather ? " modal__input_type_error" : ""
            }`}
            value="hot"
            onChange={handleChange}
            required
            onBlur={handleBlur}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className={`modal__radio-input${
              errors.weather ? " modal__input_type_error" : ""
            }`}
            value="warm"
            onChange={handleChange}
            required
            onBlur={handleBlur}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className={`modal__radio-input${
              errors.weather ? " modal__input_type_error" : ""
            }`}
            value="cold"
            onChange={handleChange}
            required
            onBlur={handleBlur}
          />{" "}
          Cold
        </label>
        {touched.weather && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
