import React from "react";
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
        type: "textInput",
        label: "Text Field",
        config: {
          placeholder: "Enter text",
          maxLength: 10,
          required: true,
        },
        validators: [Validators.required("This field is required."), Validators.maxLength(10, "Max length is 10")],
        wrapperClassName: "ui-forms-grid-item-3",
        value: "Sagara",
      },
    },
    {
      controlKey: "f2",
      parameters: {
        type: "numberInput",
        label: "Number Field",
        config: {
          min: 0,
          max: 100,
          required: true,
        },
        validators: [Validators.required("This field is required.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f3",
      parameters: {
        type: "dropdown",
        label: "Dropdown Field",
        config: {
          required: true,
          options: [
            { value: "", text: "Select an option" },
            { value: "opt1", text: "Option 1" },
            { value: "opt2", text: "Option 2" },
          ],
        },
        validators: [Validators.required("Please select an option.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f4",
      parameters: {
        type: "checkbox",
        label: "Agree to Terms",
        config: { required: true },
        validators: [Validators.required("You must agree to the terms.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f5",
      parameters: {
        type: "dateInput",
        label: "Select a Date",
        config: {
          required: true,
          minDate: "2024-01-01",
          maxDate: "2024-12-31",
        },
        validators: [Validators.required("Please select a date.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f6",
      parameters: {
        type: "textArea",
        label: "Comments",
        config: {
          placeholder: "Enter your comments",
          rows: 4,
          maxLength: 200,
          required: true,
        },
        validators: [Validators.required("Comments are required.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f7",
      parameters: {
        type: "radioGroup",
        label: "Select an Option",
        config: {
          required: true,
          options: [
            { value: "A", text: "Option A" },
            { value: "B", text: "Option B" },
            { value: "C", text: "Option C" },
          ],
        },
        validators: [Validators.required("Please select an option.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f8",
      parameters: {
        type: "multiSelect",
        label: "Select Multiple Options",
        config: {
          required: true,
          options: [
            { value: "opt1", text: "Option 1" },
            { value: "opt2", text: "Option 2" },
            { value: "opt3", text: "Option 3" },
          ],
        },
        validators: [Validators.required("Please select at least one option.")],
        wrapperClassName: "ui-forms-grid-item-3",
        value: [],
      },
    },
    {
      controlKey: "f9",
      parameters: {
        type: "fileUpload",
        label: "Upload a File",
        config: {
          accept: ".png,.jpg",
          multiple: false,
          required: true,
        },
        validators: [Validators.required("Please upload a file.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f10",
      parameters: {
        type: "slider",
        label: "Adjust Value",
        config: {
          min: 0,
          max: 100,
          step: 10,
          required: true,
        },
        validators: [Validators.required("Please adjust the slider.")],
        wrapperClassName: "ui-forms-grid-item-3",
        value: 50,
      },
    },
    {
      controlKey: "f11",
      parameters: {
        type: "timeInput",
        label: "Select a Time",
        config: {
          required: true,
          minTime: "09:00",
          maxTime: "17:00",
        },
        validators: [Validators.required("Please select a time.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f12",
      parameters: {
        type: "dateTimeInput",
        label: "Select a Date & Time",
        config: {
          required: true,
          minDateTime: "2024-01-20T09:00",
          maxDateTime: "2024-12-31T17:00",
        },
        validators: [Validators.required("Please select a date and time.")],
        wrapperClassName: "ui-forms-grid-item-3",
      },
    },
    {
      controlKey: "f13",
      parameters: {
        type: "colorPicker",
        label: "Pick a Color",
        config: {
          required: true,
        },
        validators: [Validators.required("Please select a color.")],
        wrapperClassName: "ui-forms-grid-item-3",
        value: "#ff0000",
      },
    },
  ];

  // Use the form hook with configuration
  const form = useUIFormsV2<BasicFormControls>(NativeUIComponents, formControls, (formState, nform) => {
    console.log("Form State Updated:", formState);
  });

  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();

    console.log("Form isValid:", isValid);
    console.log("Form values:", values);
    console.log("Form errors:", errors);
  };

  return (
    <div>
      <h2>Dynamic Form Demonstration</h2>
      <div className="ui-forms-grid">{form.render()}</div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyForm;
