import { useState, useCallback } from "react";

function validateField(name, value) {
  switch (name) {
    case "name":
      if (!value) return "Name is required.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      if (value.length > 30) return "Name must be less than 30 characters.";
      return "";
    case "link":
      if (!value) return "Image URL is required.";
      // Simple URL regex
      const urlPattern =
        /^(https?:\/\/)?([\w\-])+\.([\w\-])+([\w\-\./?%&=]*)?$/i;
      if (!urlPattern.test(value)) return "Please enter a valid URL.";
      return "";
    case "weather":
      if (!value) return "Please select a weather type.";
      return "";
    default:
      return "";
  }
}

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value, form } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
      const customError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: customError }));

      // Check all fields for errors and required values
      const formValues = { ...values, [name]: value };
      let formIsValid = true;
      for (const key in formValues) {
        if (validateField(key, formValues[key])) {
          formIsValid = false;
          break;
        }
      }
      setIsValid(formIsValid);
    },
    [values]
  );

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setTouched({});
    },
    []
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
    touched,
    resetForm,
  };
}
