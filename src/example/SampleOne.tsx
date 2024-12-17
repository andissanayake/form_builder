import React from "react";
import { BasicFormControls } from "./BasicFormControls";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { Validators } from "../lib/Validators";
import { FormControlConfig } from "../lib/Definition";

const MyForm = () => {
  // Configuration array for form controls
  const formControls: FormControlConfig<BasicFormControls>[] = [
    {
      key: "f1",
      type: "textInput", // Must strictly match BasicFormControls key
      label: "Text Field",
      parameters: { placeholder: "Enter text" }, // Matches textInput.config
      validators: [
        Validators.required("This field is required."),
        Validators.maxLength(10, "Max length is 10"),
      ],
      wrapperClassName: "ui-forms-grid-item-3",
    },
    {
      key: "f2",
      type: "numberInput", // Must strictly match BasicFormControls key
      label: "Number Field",
      parameters: { min: 0, max: 100 }, // Matches numberInput.config
      validators: [Validators.required("This field is required.")],
      wrapperClassName: "ui-forms-grid-item-3",
    },
  ];
  // Use the form hook with configuration
  const form = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    formControls
  );

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
