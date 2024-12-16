import { useUIFormsV2 } from "../useUIFormsV2";
import { NativeUIComponents } from "../NativeUIComponents";
import { Validators } from "../Validators";

const FormWithDynamicControls = () => {
  const form = useUIFormsV2(
    NativeUIComponents,
    (form) => {
      form.setupControl(
        "username",
        "textInput",
        "Username",
        { placeholder: "Enter your username" },
        [Validators.required("Username is required.")],
        "ui-forms-grid-item-6"
      );
      form.setupControl(
        "email",
        "textInput",
        "Email",
        { placeholder: "Enter your email" },
        [Validators.required("Email is required.")],
        "ui-forms-grid-item-6"
      );
    },
    (state) => {
      console.log("Form State Changed:", state);
    }
  );

  const handleRemove = () => {
    form.remove("email");
  };

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
