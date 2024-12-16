import React, { useState } from "react";
import { useUIFormsV2 } from "./useUIFormsV2";
import { NativeUIComponents } from "./NativeUIComponents";
import { Validator } from "./Definition";

// Validators
const required: Validator = (value) =>
  value ? null : "This field is required.";
const minAge: Validator = (value) =>
  typeof value === "number" && value >= 18 ? null : "Age must be at least 18.";
const maxAge: Validator = (value) =>
  typeof value === "number" && value <= 120
    ? null
    : "Age must be no more than 120.";
const maxLength =
  (length: number): Validator =>
  (value) =>
    typeof value === "string" && value.length > length
      ? `Max length is ${length}`
      : null;

const AdvancedFormWithAllControls = () => {
  const [userType, setUserType] = useState<string | null>(null);

  const form = useUIFormsV2(NativeUIComponents, (form) => {
    // Dropdown control
    form.setupControl(
      "dropdown",
      {
        options: [
          { value: "student", text: "Student" },
          { value: "worker", text: "Worker" },
        ],
      },
      "User Type",
      [required],
      "ui-forms-grid-item-6"
    );

    // Text input control
    form.setupControl(
      "textInput",
      { placeholder: "Enter your full name" },
      "Full Name",
      [required, maxLength(50)],
      "ui-forms-grid-item-6"
    );

    // Number input control
    form.setupControl(
      "numberInput",
      { min: 1, max: 150 },
      "Age",
      [required, minAge, maxAge],
      "ui-forms-grid-item-3"
    );

    // Checkbox control
    form.setupControl(
      "checkbox",
      {},
      "Agree to Terms",
      [required],
      "ui-forms-grid-item-3"
    );

    // Date input control
    form.setupControl(
      "dateInput",
      { minDate: "2023-01-01", maxDate: "2025-12-31" },
      "Select a Date",
      [required],
      "ui-forms-grid-item-3"
    );

    // Text area control
    form.setupControl(
      "textArea",
      { rows: 4, cols: 50, maxLength: 200 },
      "Your Feedback",
      [required, maxLength(200)],
      "ui-forms-grid-item-6"
    );
  });

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();
    if (isValid) {
      console.log("Form Submitted: ", values);
    } else {
      console.error("Validation Errors: ", errors);
    }
  };

  const handleReset = () => {
    form.getValues(); // Reset the form state
    setUserType(null); // Reset the dependent fields
  };

  return (
    <div>
      <h2>Advanced Form with All Controls</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default AdvancedFormWithAllControls;
