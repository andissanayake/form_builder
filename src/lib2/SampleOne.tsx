import { BasicFormControls } from "../lib2/BasicFormControls";
import { NativeUIComponents } from "../lib2/NativeUIComponents";
import { useUIFormsV2 } from "../lib2/useUIFormsV2";
import { FormControlConfig } from "../lib2/Definition";
import { Validators } from "../lib2/Validators";

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
  const form = useUIFormsV2<BasicFormControls>(NativeUIComponents, formControls, (formState, form) => {
    console.log("Form State Updated:", formState);

    // Dynamically add a new control when `f1` exceeds 5 characters
    if (formState.f1 && !formState.extraField) {
      form.setupControl("extraField", {
        type: "textInput",
        label: "Extra Field",
        config: { placeholder: "Enter extra field text" },
        validators: [Validators.required("This field is required.")],
        wrapperClassName: "ui-forms-grid-item-6",
      });
    }

    // Remove the extra field if `f1` has 5 or fewer characters
    if (!formState.f1 && formState.extraField !== undefined) {
      form.remove("extraField");
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
