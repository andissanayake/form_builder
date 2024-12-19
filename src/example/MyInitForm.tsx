import React, { useEffect } from "react";
import { FormControlConfig } from "../lib/Definition"; // Ensure correct path
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { Validator } from "../lib/Definition";
import { BasicFormControls } from "../lib/BasicFormControls";

// Validators
const required: Validator = (value) =>
  value ? null : "This field is required";

const MyForm = () => {
  // Configuration array strictly typed based on BasicFormControls
  const configArray: FormControlConfig<BasicFormControls>[] = [
    {
      key: "username",
      type: "textInput", // Valid control type
      label: "Username",
      parameters: { placeholder: "Enter your username" }, // Matches BasicFormControls.textInput.config
      validators: [required],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    {
      key: "age",
      type: "numberInput", // Valid control type
      label: "Age",
      parameters: { min: 0, max: 100 }, // Matches BasicFormControls.numberInput.config
      validators: [],
      wrapperClassName: "ui-forms-grid-item-6",
    },
  ];

  // Initialize form with configuration
  const form = useUIFormsV2<BasicFormControls>(NativeUIComponents, configArray);

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();
    console.log("Form isValid:", isValid);
    console.log("Form values:", values);
    console.log("Form errors:", errors);
  };

  return (
    <div>
      <h2>Dynamic Form with Init Config</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyForm;
