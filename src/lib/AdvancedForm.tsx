import { useUIFormsV2 } from "./useUIFormsV2";
import { NativeUIComponents } from "./NativeUIComponents";
import { Validators } from "./Validators";

const AdvancedFormWithAllControls = () => {
  const form = useUIFormsV2(NativeUIComponents, (form) => {
    // Dropdown control
    form.setupControl(
      "userType",
      "dropdown",
      "User Type",
      {
        options: [
          { value: "", text: "Not Set" },
          { value: "student", text: "Student" },
          { value: "worker", text: "Worker" },
          { value: "retired", text: "Retired" },
        ],
      },
      [Validators.required("User Type is required.")],
      "ui-forms-grid-item-6"
    );

    // Text input control
    form.setupControl(
      "fullName",
      "textInput",
      "Full Name",
      { placeholder: "Enter your full name" },
      [
        Validators.required("Full Name is required."),
        Validators.maxLength(50, "Max length is 50 characters."),
      ],
      "ui-forms-grid-item-6"
    );

    // Number input control
    form.setupControl(
      "age",
      "numberInput",
      "Age",
      { min: 1, max: 150 },
      [
        Validators.required("Age is required."),
        Validators.min(18, "You must be at least 18 years old."),
        Validators.max(99, "Age cannot exceed 99."),
      ],
      "ui-forms-grid-item-3"
    );

    // Checkbox control
    form.setupControl(
      "agreeTerms",
      "checkbox",
      "Agree to Terms",
      {},
      [Validators.required("You must agree to the terms.")],
      "ui-forms-grid-item-6"
    );

    // Date input control
    form.setupControl(
      "preferredDate",
      "dateInput",
      "Preferred Date",
      { minDate: "2023-01-01", maxDate: "2025-12-31" },
      [Validators.required("Preferred Date is required.")],
      "ui-forms-grid-item-3"
    );

    // Text area control
    form.setupControl(
      "comments",
      "textArea",
      "Additional Comments",
      { rows: 5, cols: 50, maxLength: 250 },
      [Validators.maxLength(250, "Max length is 250 characters.")],
      "ui-forms-grid-item-12"
    );
  });

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
