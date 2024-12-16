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
  const { render, getValues, validate } = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    (form) => {
      // Setup controls with labels and validators
      form.setupControl("text", { placeholder: "Enter text" }, "Text Field", [
        required,
        maxLength(10),
      ]);
      form.setupControl("number", { min: 0, max: 100 }, "Number Field", [
        required,
      ]);
    }
  );

  const handleSubmit = () => {
    const isValid = validate();
    const values = getValues();

    console.log("Form isValid:", isValid);
    console.log("Form values:", values);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      {render()}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyForm;
