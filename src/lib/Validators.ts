import { Validator } from "./Definition";

export const Validators = {
  required:
    (message = "This field is required"): Validator =>
    (value) =>
      value === null || value === undefined || value === "" ? message : null,
  min:
    (min: number, message = `Must be at grater than ${min}`): Validator =>
    (value) =>
      value && value < min ? message : null,
  max:
    (max: number, message = `Must be less than ${max}`): Validator =>
    (value) =>
      value && value > max ? message : null,
  minLength:
    (min: number, message = `Must be at least ${min} characters`): Validator =>
    (value) =>
      value && value.length < min ? message : null,

  maxLength:
    (max: number, message = `Must not exceed ${max} characters`): Validator =>
    (value) =>
      value && value.length > max ? message : null,

  pattern:
    (regex: RegExp, message = "Invalid format"): Validator =>
    (value) =>
      value && !regex.test(value) ? message : null,

  custom:
    (validateFn: Validator, message = "Invalid value"): Validator =>
    (value) =>
      validateFn(value) ? message : null,
};
