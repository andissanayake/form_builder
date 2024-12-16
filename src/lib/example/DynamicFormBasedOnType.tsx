import React from "react";
import { useUIFormsV2 } from "../useUIFormsV2";
import { NativeUIComponents } from "../NativeUIComponents";
import { Validators } from "../Validators";

const DynamicFormBasedOnType = () => {
  const form = useUIFormsV2(
    NativeUIComponents,
    (form) => {
      // Initial controls
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

      form.setupControl(
        "userType",
        "dropdown",
        "User Type",
        {
          options: [
            { value: "", text: "Select a type" },
            { value: "student", text: "Student" },
            { value: "worker", text: "Worker" },
            { value: "retired", text: "Retired" },
          ],
        },
        [Validators.required("User Type is required.")],
        "ui-forms-grid-item-6"
      );

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
    },
    (state) => {
      // Dynamically add or remove "school" based on userType
      if (state.userType === "student") {
        form.setupControl(
          "school",
          "textInput",
          "School Name",
          { placeholder: "Enter your school name" },
          [Validators.required("School Name is required.")],
          "ui-forms-grid-item-6"
        );
      } else {
        form.remove("school");
      }

      // Dynamically add or remove "retirementPlan" based on age
      if (state.age && (state.age as number) > 65) {
        form.setupControl(
          "retirementPlan",
          "textInput",
          "Retirement Plan",
          { placeholder: "Enter your retirement plan" },
          [Validators.required("Retirement Plan is required.")],
          "ui-forms-grid-item-6"
        );
      } else {
        form.remove("retirementPlan");
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
