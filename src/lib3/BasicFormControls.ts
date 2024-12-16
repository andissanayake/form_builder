// Define control types for the form
export type BasicFormControls = {
  text: { config: { placeholder: string }; value: string };
  number: { config: { min: number; max: number }; value: number };
};
