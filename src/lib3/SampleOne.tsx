import { BasicFormControls } from "./BasicFormControls";
import { Validator } from "./Definition";
import { NativeUIComponents } from "./NativeUIComponents";
import { useUIFormsV2 } from "./useUIFormsV2";

// Define validators
const required: Validator = (value) =>
  value ? null : "This field is required.";
const maxLength =
  (length: number): Validator =>
  (value) =>
    typeof value === "string" && value.length > length
      ? `Max length is ${length}`
      : null;

// Form component using the useUIFormsV2 hook
const MyForm = () => {
  const form = useUIFormsV2<BasicFormControls>(NativeUIComponents, (form) => {
    // Setup controls with labels and validators
    form.setupControl(
      "textInput",
      { placeholder: "Enter text" },
      "Text Field",
      [required, maxLength(10)],
      "ui-forms-grid-item-3"
    );
    form.setupControl(
      "numberInput",
      { min: 0, max: 100 },
      "Number Field",
      [required],
      "ui-forms-grid-item-3"
    );
  });

  const handleSubmit = () => {
    const isValid = form.validate();
    const values = form.getValues();

    console.log("Form isValid:", isValid);
    console.log("Form values:", values);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyForm;
