import { useUIFormsV2 } from "./useUIFormsV2";
import { NativeUIComponents } from "./NativeUIComponents";
import { Validators } from "./Validators";

const AdvancedFormWithAllControls = () => {
  const form = useUIFormsV2(NativeUIComponents, (form) => {
    // Dropdown control
    form.setupControl(
      "dropdown",
      {
        options: [
          { value: "", text: "Not Set" },
          { value: "student", text: "Student" },
          { value: "worker", text: "Worker" },
        ],
      },
      "User Type",
      [Validators.required("This field is required.")],
      "ui-forms-grid-item-6"
    );

    // Text input control
    form.setupControl(
      "textInput",
      { placeholder: "Enter your full name" },
      "Full Name",
      [
        Validators.required("This field is required."),
        Validators.maxLength(10, "Max length is 10"),
      ],
      "ui-forms-grid-item-6"
    );

    // Number input control
    form.setupControl(
      "numberInput",
      { min: 1, max: 150 },
      "Age",
      [
        Validators.required("This field is required."),
        Validators.min(18, "Age must be at least 18."),
        Validators.max(65, "Age must be no more than 65."),
      ],
      "ui-forms-grid-item-3"
    );

    // Checkbox control
    form.setupControl(
      "checkbox",
      {},
      "Agree to Terms",
      [Validators.required("This field is required.")],
      "ui-forms-grid-item-3"
    );

    // Date input control
    form.setupControl(
      "dateInput",
      { minDate: "2023-01-01", maxDate: "2025-12-31" },
      "Select a Date",
      [Validators.required("This field is required.")],
      "ui-forms-grid-item-3"
    );

    // Text area control
    form.setupControl(
      "textArea",
      { rows: 4, cols: 50, maxLength: 200 },
      "Your Feedback",
      [
        Validators.required("This field is required."),
        Validators.maxLength(100, "Max length is 100"),
      ],
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
    form.getValues();
  };

  return (
    <div>
      <h2>Advanced Form with All Controls</h2>
      <div style={{ width: "600px" }} className="ui-forms-grid">
        {form.render()}
      </div>
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
