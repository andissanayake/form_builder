import React, { useCallback, useEffect, useRef, useState } from "react";
import { ControlMap, UIComponentsV2, UIFormsV2, Validator } from "./Definition";
import "./grid.css";

export function useUIFormsV2<T extends ControlMap>(
  uiComponents: UIComponentsV2<T>,
  initialSetup?: (form: UIFormsV2<T>) => void
) {
  // Use `string` keys to allow multiple controls of the same type
  const [controls, setControls] = useState<
    Map<
      string, // Unique identifier for each control
      {
        type: keyof T;
        config: T[keyof T]["config"];
        label: string;
        validators?: Validator[];
        wrapperClassName?: string;
      }
    >
  >(new Map());

  type FormState = {
    [key: string]: T[keyof T]["value"];
  };

  type ErrorsState = {
    [key: string]: string[];
  };

  const [formState, setFormState] = useState<FormState>({});
  const [errors, setErrors] = useState<ErrorsState>({});

  // Memoized setupControl
  const setupControl: UIFormsV2<T>["setupControl"] = useCallback(
    (key, type, label, parameters, validators, wrapperClassName) => {
      setControls((prev) => {
        const updatedControls = new Map(prev);
        updatedControls.set(key, {
          type,
          config: parameters,
          label,
          validators,
          wrapperClassName,
        });
        return updatedControls;
      });
    },
    []
  );

  // Handle form state changes
  const handleChange = useCallback(
    (key: string, value: T[keyof T]["value"]) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Validate the form
  const validate = useCallback(() => {
    const newErrors: ErrorsState = {};
    controls.forEach((control, key) => {
      if (control.validators) {
        const validationErrors = control.validators
          .map((validator) => validator(formState[key]))
          .filter((error): error is string => error !== null);
        if (validationErrors.length > 0) {
          newErrors[key] = validationErrors;
        }
      }
    });
    setErrors(newErrors);
    return {
      values: formState,
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  }, [controls, formState]);

  // Render form components dynamically
  const render = useCallback(() => {
    return Array.from(controls.entries()).map(
      ([key, { type, config, label, wrapperClassName }]) => {
        const Component = uiComponents[type] as React.ComponentType<{
          config: T[keyof T]["config"];
          value: T[keyof T]["value"];
          onChange: (value: T[keyof T]["value"]) => void;
          label: string;
          errors?: string[];
          wrapperClassName?: string;
        }>;

        if (!Component) return null;

        const props = {
          config,
          value: formState[key] ?? ("" as T[keyof T]["value"]),
          onChange: (value: T[keyof T]["value"]) => handleChange(key, value),
          label,
          errors: errors[key],
          wrapperClassName,
        };

        return <Component key={key} {...props} />;
      }
    );
  }, [controls, formState, errors, uiComponents, handleChange]);

  // Prevent repeated calls to initialSetup
  const isSetupInitialized = useRef(false);

  useEffect(() => {
    if (!isSetupInitialized.current && initialSetup) {
      initialSetup({ setupControl });
      isSetupInitialized.current = true;
    }
  }, [initialSetup, setupControl]);

  return {
    render,
    getValues: () => formState,
    validate,
    setupControl,
  };
}
