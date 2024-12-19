import { FormControlConfig } from "../../Definition";
import { useUIFormsV2 } from "../../useUIFormsV2";
import { ExtendedControls } from "./ExtendedControls";
import { ExtendedUIComponents } from "./ExtendedUIComponents";

const MyExtendedForm = () => {
  const formControls: { controlKey: string; parameters: FormControlConfig<ExtendedControls> }[] = [
    {
      controlKey: "textField",
      parameters: {
        type: "textInput",
        label: "Your Name",
        config: { placeholder: "Enter your name" },
        validators: [
          (value) => (value ? null : "Name is required."),
          (value) => (value?.length > 20 ? "Name should not exceed 20 characters." : null),
        ],
        wrapperClassName: "ui-forms-grid-item-6",
      },
    },
    {
      controlKey: "ageField",
      parameters: {
        type: "numberInput",
        label: "Your Age",
        config: { min: 18, max: 100 },
        validators: [
          (value) => (value == null ? "Age is required." : null),
          (value) => (value! < 18 ? "You must be at least 18 years old." : null),
          (value) => (value! > 100 ? "You must be younger than 100 years old." : null),
        ],
        wrapperClassName: "ui-forms-grid-item-6",
      },
    },
    {
      controlKey: "genderField",
      parameters: {
        type: "dropdown",
        label: "Gender",
        config: {
          options: [
            { value: "", text: "Select Gender" },
            { value: "male", text: "Male" },
            { value: "female", text: "Female" },
            { value: "other", text: "Other" },
          ],
        },
        validators: [(value) => (value ? null : "Gender is required.")],
        wrapperClassName: "ui-forms-grid-item-6",
      },
    },
    {
      controlKey: "toggleField",
      parameters: {
        type: "toggleSwitch",
        label: "Enable Feature",
        config: {},
        wrapperClassName: "ui-forms-grid-item-6",
      },
    },
  ];

  const form = useUIFormsV2<ExtendedControls>(ExtendedUIComponents, formControls);

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();
    if (isValid) {
      console.log("Form Values:", values);
    } else {
      console.log("Form Errors:", errors);
    }
  };

  return (
    <div>
      <h2>My Extended Form</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyExtendedForm;
