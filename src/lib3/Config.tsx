import React, { useCallback, useEffect, useRef, useState } from "react";

export type ControlMap<C = {}, V = any> = {
  [key: string]: {
    config: C;
    value: V;
  };
};

export type UIComponentsV2<T extends ControlMap> = {
  [Key in keyof T]: React.ComponentType<{
    config: T[Key]["config"];
    value: T[Key]["value"];
    onChange: (value: T[Key]["value"]) => void;
  }>;
};

export interface UIFormsV2<T extends ControlMap> {
  setupControl: <Key extends keyof T>(
    key: Key,
    parameters: T[Key]["config"]
  ) => void;
}

export function useUIFormsV2<T extends ControlMap>(
  uiComponents: UIComponentsV2<T>,
  initialSetup?: (form: UIFormsV2<T>) => void
) {
  const [controls, setControls] = useState<Map<keyof T, T[keyof T]["config"]>>(
    new Map()
  );
  const [formState, setFormState] = useState<
    Partial<Record<keyof T, T[keyof T]["value"]>>
  >({});

  // Memoize setupControl to ensure stability
  const setupControl = useCallback<UIFormsV2<T>["setupControl"]>(
    (key, parameters) => {
      setControls((prev) => {
        const updatedControls = new Map(prev);
        updatedControls.set(key, parameters);
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

  const render = useCallback(() => {
    return Array.from(controls.entries()).map(([key, config]) => {
      const Component = uiComponents[key] as React.ComponentType<{
        config: T[typeof key]["config"];
        value: T[typeof key]["value"];
        onChange: (value: T[typeof key]["value"]) => void;
      }>;

      if (!Component) return null;

      const props = {
        config,
        value: formState[key] ?? ("" as T[typeof key]["value"]),
        onChange: (value: T[typeof key]["value"]) => handleChange(key, value),
      };

      return <Component key={String(key)} {...props} />;
    });
  }, [controls, formState, uiComponents, handleChange]);

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
    setupControl,
  };
}
