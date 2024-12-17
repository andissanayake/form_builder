import React from "react";
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { Validators } from "../lib/Validators";
import { BasicFormControls } from "./BasicFormControls";
import { FormControlConfig } from "../lib/Definition";

const AdvancedFormWithAllControls = () => {
  // Configuration array for all controls
  const formControls: FormControlConfig<BasicFormControls>[] = [
    // Dropdown control
    {
      key: "userType",
      type: "dropdown",
      label: "User Type",
      parameters: {
        options: [
          { value: "", text: "Not Set" },
          { value: "student", text: "Student" },
          { value: "worker", text: "Worker" },
          { value: "retired", text: "Retired" },
        ],
      },
      validators: [Validators.required("User Type is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    // Text input control
    {
      key: "fullName",
      type: "textInput",
      label: "Full Name",
      parameters: { placeholder: "Enter your full name" },
      validators: [
        Validators.required("Full Name is required."),
        Validators.maxLength(50, "Max length is 50 characters."),
      ],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    // Number input control
    {
      key: "age",
      type: "numberInput",
      label: "Age",
      parameters: { min: 1, max: 150 },
      validators: [
        Validators.required("Age is required."),
        Validators.min(18, "You must be at least 18 years old."),
        Validators.max(99, "Age cannot exceed 99."),
      ],
      wrapperClassName: "ui-forms-grid-item-3",
    },
    // Checkbox control
    {
      key: "agreeTerms",
      type: "checkbox",
      label: "Agree to Terms",
      parameters: {},
      validators: [Validators.required("You must agree to the terms.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    // Date input control
    {
      key: "preferredDate",
      type: "dateInput",
      label: "Preferred Date",
      parameters: { minDate: "2023-01-01", maxDate: "2025-12-31" },
      validators: [Validators.required("Preferred Date is required.")],
      wrapperClassName: "ui-forms-grid-item-3",
    },
    // Text area control
    {
      key: "comments",
      type: "textArea",
      label: "Additional Comments",
      parameters: { rows: 5, cols: 50, maxLength: 250 },
      validators: [Validators.maxLength(250, "Max length is 250 characters.")],
      wrapperClassName: "ui-forms-grid-item-12",
    },
  ];

  // Initialize the form using the configuration array
  const form = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    formControls
  );

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();
    console.log("Form Values: ", values);
    if (isValid) {
      console.log("Form submitted successfully!");
    } else {
      console.error("Validation Errors: ", errors);
    }
  };

  const handleReset = () => {
    console.log("Resetting form to initial state.");
    window.location.reload(); // Temporary form reset
  };

  return (
    <div>
      <h2>Advanced Form with All Controls</h2>
      <div className="ui-forms-grid" style={{ maxWidth: "800px" }}>
        {form.render()}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default AdvancedFormWithAllControls;
