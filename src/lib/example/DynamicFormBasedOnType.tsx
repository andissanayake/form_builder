import React, { useEffect } from "react";
import { useState } from "react";
import { useUIFormsV2 } from "../lib/useUIFormsV2";
import { NativeUIComponents } from "../lib/NativeUIComponents";
import { Validators } from "./Validators";
import { BasicFormControls } from "../lib/BasicFormControls";
import { FormControlConfig } from "../lib/Definition";

const DynamicFormBasedOnType = () => {
  const baseControls: FormControlConfig<BasicFormControls>[] = [
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
          { value: "student", text: "Student" },
          { value: "worker", text: "Worker" },
          { value: "retired", text: "Retired" },
        ],
      },
      validators: [Validators.required("User Type is required.")],
      wrapperClassName: "ui-forms-grid-item-6",
    },
    {
      key: "age",
      type: "numberInput",
      label: "Age",
      parameters: { min: 18, max: 99 },
      validators: [
        Validators.required("Age is required."),
        Validators.min(18, "Minimum age is 18."),
        Validators.max(99, "Maximum age is 99."),
      ],
      wrapperClassName: "ui-forms-grid-item-6",
    },
  ];

  const form = useUIFormsV2<BasicFormControls>(
    NativeUIComponents,
    [...baseControls],
    (state) => {
      // Add "School Name" if userType is student
      if (state.userType === "student") {
        form.setupControl(
          "school",
          "textInput",
          "School Name",
          { placeholder: "Enter your school name" },
          [Validators.required("School Name is required.")],
          "ui-forms-grid-item-6"
        );
      }
      if (state.age && (state.age as number) > 65) {
        form.setupControl(
          "retirementPlan",
          "textInput",
          "Retirement Plan",
          { placeholder: "Enter your retirement plan" },
          [Validators.required("Retirement Plan is required.")],
          "ui-forms-grid-item-6"
        );
      }
    }
  );

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
      <h2>Dynamic Form Based on Type and Age</h2>
      <div className="ui-forms-grid" style={{ maxWidth: "800px" }}>
        {form.render()}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default DynamicFormBasedOnType;
