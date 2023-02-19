import { useCallback, useState } from "react";
import validator from "validator";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;

    if (name === "email") {
      if (!validator.isEmail(value)) {
        input.setCustomValidity('Адрес почты не соответсвует шаблону "ya@ya.ru"');
      } else {
        input.setCustomValidity("");
      }
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}