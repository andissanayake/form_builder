import React, { useState, useEffect } from "react";
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { Validators } from "./Validators";
import { FormControlConfig } from "../lib/Definition";
import { BasicFormControls } from "../lib/BasicFormControls";

const AdvancedDynamicForm = () => {
  const [isAdditionalFieldVisible, setIsAdditionalFieldVisible] =
    useState(false);

  // Initial configuration for the form controls
  const initialControls: FormControlConfig<BasicFormControls>[] = [
    {
      key: "username",
      type: "textInput",
      label: "Username",
      parameters: { placeholder: "Enter your username" },
      validators: [Validators.required("Username is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    {
      key: "email",
      type: "textInput",
      label: "Email",
      parameters: { placeholder: "Enter your email" },
      validators: [Validators.required("Email is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    {
      key: "userType",
      type: "dropdown",
      label: "User Type",
      parameters: {
        options: [
          { value: "", text: "Select a type" },
          { value: "admin", text: "Admin" },
          { value: "editor", text: "Editor" },
          { value: "viewer", text: "Viewer" },
        ],
      },
      validators: [Validators.required("User type is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
  ];

  // Initialize form with the initial controls
  const form = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    initialControls,
    (state) => {
      console.log("Form state updated:", state);
    }
  );

  // Handle dynamic addition of a control
  const handleAddField = () => {
    form.setupControl(
      "age",
      "numberInput",
      "Age",
      { min: 18, max: 99 },
      [
        Validators.required("Age is required."),
        Validators.min(18, "Minimum age is 18."),
        Validators.max(99, "Maximum age is 99."),
      ],
      "ui-forms-grid-item-6"
    );
    setIsAdditionalFieldVisible(true);
  };

  // Handle dynamic removal of a control
  const handleRemoveField = () => {
    form.remove("age");
    setIsAdditionalFieldVisible(false);
  };

  // Handle pre-filling the form
  const handlePrefill = () => {
    form.patch({
      username: "johndoe",
      email: "johndoe@example.com",
      userType: "editor",
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const { values, isValid, errors } = form.validate();
    if (isValid) {
      console.log("Form submitted successfully:", values);
    } else {
      console.error("Validation errors:", errors);
    }
  };

  return (
    <div>
      <h2>Advanced Dynamic Form</h2>
      <div className="ui-forms-grid" style={{ maxWidth: "800px" }}>
        {form.render()}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrefill} style={{ marginRight: "10px" }}>
          Prefill Form
        </button>
        {!isAdditionalFieldVisible && (
          <button onClick={handleAddField} style={{ marginRight: "10px" }}>
            Add Age Field
          </button>
        )}
        {isAdditionalFieldVisible && (
          <button onClick={handleRemoveField} style={{ marginRight: "10px" }}>
            Remove Age Field
          </button>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AdvancedDynamicForm;
