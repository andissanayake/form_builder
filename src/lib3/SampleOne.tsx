import React, { useState } from "react";
import { UIComponentsV2, useUIFormsV2 } from "./Config";

// Define control types for the form
type MyFormControls = {
  text: { config: { placeholder: string }; value: string };
  number: { config: { min: number; max: number }; value: number };
};

// Define UI components for the form controls
const uiComponents: UIComponentsV2<MyFormControls> = {
  text: ({ config, value, onChange }) => (
    <input
      type="text"
      placeholder={config.placeholder}
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  number: ({ config, value, onChange }) => (
    <input
      type="number"
      min={config.min}
      max={config.max}
      value={value as number}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  ),
};

// Form component using the useUIFormsV2 hook
const MyForm = () => {
  const { render, getValues } = useUIFormsV2<MyFormControls>(
    uiComponents,
    (form) => {
      form.setupControl("text", { placeholder: "Enter text" });
      form.setupControl("number", { min: 0, max: 100 });
    }
  );

  const handleSubmit = () => {
    console.log("Form values:", getValues());
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
