import React, { useState } from "react";
import { useUIForms } from "./UIForms";
import { NativeUIComponents } from "./NativeUIComponents";
import { Validators } from "./Validators";

const ComplexForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useUIForms(NativeUIComponents, (initForm) => {
    initForm.setupTextInput({
      key: "firstName",
      label: "First Name",
      wrapperSize: 6,
      validators: [Validators.required("First name is required")],
    });

    initForm.setupTextInput({
      key: "lastName",
      label: "Last Name",
      wrapperSize: 6,
    });

    initForm.setupNumberInput({
      key: "age",
      label: "Age",
      min: 0,
      max: 120,
      wrapperSize: 4,
      validators: [Validators.required("Age is required")],
    });

    initForm.setupTextInput({
      key: "email",
      label: "Email Address",
      wrapperSize: 12,
      validators: [Validators.required("Email is required")],
    });

    initForm.setupTextInput({
      key: "phone",
      label: "Phone Number",
      wrapperSize: 6,
      validators: [
        Validators.required("Phone number is required"),
        Validators.pattern(/^\d{10}$/, "Phone number must be 10 digits"),
      ],
    });

    initForm.setupDropdown({
      key: "preferredContact",
      label: "Preferred Contact Method",
      options: [
        { value: "email", text: "Email" },
        { value: "phone", text: "Phone" },
        { value: "none", text: "No Preference" },
      ],
      wrapperSize: 4,
      value: "none",
    });

    initForm.setupCheckbox({
      key: "agreeToTerms",
      label: "I agree to the terms and conditions",
      wrapperSize: 12,
      validators: [Validators.required("You must agree to the terms")],
    });
  });

  const handleSubmit = () => {
    const validationResult = form.validate();
    if (validationResult.isValid) {
      console.log("Form Submitted Successfully:", form.get().values);
    } else {
      console.error("Validation Errors:", validationResult.errors);
    }
  };

  return (
    <div style={{ width: 600, margin: "auto" }}>
      <h2>Step {currentStep}</h2>
      <div>{form.view()}</div>
      <div style={{ marginTop: 20 }}>
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            style={{
              padding: "10px 20px",
              marginRight: 10,
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28A745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplexForm;
