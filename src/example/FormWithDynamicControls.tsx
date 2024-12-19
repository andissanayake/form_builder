import React from "react";
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { Validators } from "./Validators";
import { BasicFormControls } from "../lib/BasicFormControls";
import { FormControlConfig } from "../lib/Definition";

const FormWithDynamicControls = () => {
  // Configuration array for form controls
  const formControls: FormControlConfig<BasicFormControls>[] = [
    {
      key: "username",
      type: "textInput",
      label: "Username",
      parameters: { placeholder: "Enter your username" },
      validators: [Validators.required("Username is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    {
      key: "email",
      type: "textInput",
      label: "Email",
      parameters: { placeholder: "Enter your email" },
      validators: [Validators.required("Email is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
  ];

  // Initialize the form with configuration
  const form = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    formControls,
    (state) => {
      console.log("Form State Changed:", state);
    }
  );

  // Remove the "email" field dynamically
  const handleRemove = () => {
    form.remove("email");
  };

  // Validate and submit the form
  const handleSubmit = () => {
    const { values, isValid } = form.validate();
    if (isValid) {
      console.log("Form Submitted:", values);
    } else {
      console.error("Validation Errors");
    }
  };

  return (
    <div>
      <h2>Form with Dynamic Controls</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <button onClick={handleRemove} style={{ marginRight: "10px" }}>
        Remove Email Field
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormWithDynamicControls;
