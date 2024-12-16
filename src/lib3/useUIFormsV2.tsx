import React, { useCallback, useEffect, useRef, useState } from "react";
import { ControlMap, UIComponentsV2, UIFormsV2, Validator } from "./Definition";

export function useUIFormsV2<T extends ControlMap>(
  uiComponents: UIComponentsV2<T>,
  initialSetup?: (form: UIFormsV2<T>) => void
) {
  const [controls, setControls] = useState<
    Map<
      keyof T,
      { config: T[keyof T]["config"]; label: string; validators?: Validator[] }
    >
  >(new Map());

  const [formState, setFormState] = useState<
    Partial<Record<keyof T, T[keyof T]["value"]>>
  >({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>({});

  // Memoize setupControl to ensure stability
  const setupControl: UIFormsV2<T>["setupControl"] = useCallback(
    (key, parameters, label, validators) => {
      setControls((prev) => {
        const updatedControls = new Map(prev);
        updatedControls.set(key, { config: parameters, label, validators });
        return updatedControls;
      });
    },
    []
  );

  const handleChange = useCallback(
    (key: keyof T, value: T[keyof T]["value"]) => {
      setFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string[]>> = {};
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
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  }, [controls, formState]);

  const render = useCallback(() => {
    return Array.from(controls.entries()).map(([key, { config, label }]) => {
      const Component = uiComponents[key] as React.ComponentType<{
        config: T[typeof key]["config"];
        value: T[typeof key]["value"];
        onChange: (value: T[typeof key]["value"]) => void;
        label: string;
        errors?: string[];
      }>;

      if (!Component) return null;

      const props = {
        config,
        value: formState[key] ?? ("" as T[typeof key]["value"]),
        onChange: (value: T[typeof key]["value"]) => handleChange(key, value),
        label,
        errors: errors[key],
      };

      return <Component key={String(key)} {...props} />;
    });
  }, [controls, formState, errors, uiComponents, handleChange]);

  // Prevent repeated calls to initialSetup
  const isSetupInitialized = useRef(false);

  useEffect(() => {
    if (!isSetupInitialized.current && initialSetup) {
      initialSetup({ setupControl });
      isSetupInitialized.current = true; // Ensure setup is only called once
    }
  }, [initialSetup, setupControl]);

  return {
    render,
    getValues: () => formState,
    validate,
    setupControl,
  };
}
