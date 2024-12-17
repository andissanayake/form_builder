import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ControlMap,
  FormControlConfig,
  UIComponentsV2,
  UIFormsV2,
  Validator,
} from "./Definition";
import "./grid.css";

export function useUIFormsV2<T extends ControlMap>(
  uiComponents: UIComponentsV2<T>,
  formControls: FormControlConfig<T>[],
  onChange?: (formState: { [key: string]: T[keyof T]["value"] }) => void
) {
  const [controls, setControls] = useState<
    Map<
      string,
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

  const notifyChange = useCallback(
    (updatedState: FormState) => {
      if (onChange) {
        onChange(updatedState);
      }
    },
    [onChange]
  );

  // Setup control
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

  // New method: Initialize form with config array
  const initForm = useCallback(
    (configArray: FormControlConfig<T>[]) => {
      configArray.forEach(
        ({ key, type, label, parameters, validators, wrapperClassName }) => {
          setupControl(
            key,
            type,
            label,
            parameters,
            validators,
            wrapperClassName
          );
        }
      );
    },
    [setupControl]
  );

  // Handle state changes
  const handleChange = useCallback(
    (key: string, value: T[keyof T]["value"]) => {
      setFormState((prev) => {
        const updatedState = {
          ...prev,
          [key]: value,
        };
        notifyChange(updatedState);
        return updatedState;
      });
    },
    [notifyChange]
  );

  // Patch method
  const patch = useCallback(
    (updates: Partial<FormState>) => {
      setFormState((prev) => {
        const updatedState = {
          ...prev,
          ...updates,
        };
        notifyChange(updatedState);
        return updatedState;
      });
    },
    [notifyChange]
  );

  // Remove method
  const remove = useCallback(
    (key: string) => {
      setControls((prev) => {
        const updatedControls = new Map(prev);
        updatedControls.delete(key);
        return updatedControls;
      });

      setFormState((prev) => {
        const { [key]: _, ...updatedState } = prev; // Remove the key from formState
        notifyChange(updatedState);
        return updatedState;
      });

      setErrors((prev) => {
        const { [key]: _, ...updatedErrors } = prev; // Remove the key from errors
        return updatedErrors;
      });
    },
    [notifyChange]
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
    if (!isSetupInitialized.current && formControls) {
      initForm(formControls);
      isSetupInitialized.current = true;
    }
  }, [formControls, initForm]);

  return {
    render,
    getValues: () => formState,
    validate,
    setupControl,
    patch,
    remove,
    initForm,
  };
}
