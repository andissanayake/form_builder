import { BasicFormControls } from "./BasicFormControls";
import { NativeUIComponents } from "./NativeUIComponents";
import { useUIFormsV2 } from "../useUIFormsV2";
import { FormControlConfig } from "../Definition";
import { Validators } from "./Validators";

const MyForm = () => {
  // Configuration array for form controls
  const formControls: { controlKey: string; parameters: FormControlConfig<BasicFormControls> }[] = [
    {
      controlKey: "f1",
      parameters: {
        type: "textInput", // Must strictly match BasicFormControls key
        label: "Text Field",
        config: { placeholder: "Enter text" }, // Matches textInput.config
        validators: [Validators.required("This field is required."), Validators.maxLength(10, "Max length is 10")],
        wrapperClassName: "ui-forms-grid-item-3",
        value: "sagara",
      },
    },
    {
      controlKey: "f2",
      parameters: {
        type: "numberInput", // Must strictly match BasicFormControls key
        label: "Number Field",
        config: { min: 0, max: 100 }, // Matches numberInput.config
        validators: [Validators.required("This field is required.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
  ];

  // Use the form hook with configuration
  const form = useUIFormsV2<BasicFormControls>(NativeUIComponents, formControls, (formState, nform) => {
    console.log("Form State Updated:", formState);

    // Dynamically add a new control when `f1` exceeds 5 characters
    if (formState.f1) {
      nform.setupControl("extraField", {
        type: "textInput",
        label: "Extra Field",
        config: { placeholder: "Enter extra field text" },
        validators: [Validators.required("This field is required.")],
        wrapperClassName: "ui-forms-grid-item-6",
      });
    } else {
      nform.remove("extraField");
    }
  });

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();

    console.log("Form isValid:", isValid);
    console.log("Form values:", values);
    console.log("Form errors:", errors);
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
