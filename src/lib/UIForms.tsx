import React, { useState } from "react";
import "./grid.css";
import {
  CheckBoxComponentDefinition,
  DropdownComponentDefinition,
  InputNumberComponentDefinition,
  InputTextComponentDefinition,
  UIComponents,
  UIForms,
  Validator,
} from "./ComponentDefinition";

type BaseComponentConfig = {
  key: string;
  wrapperSize?: number;
  validators?: Validator[];
};

type ComponentConfig =
  | (BaseComponentConfig & {
      type: "textInput";
    } & Omit<InputTextComponentDefinition, "onChange">)
  | (BaseComponentConfig & {
      type: "numberInput";
    } & Omit<InputNumberComponentDefinition, "onChange">)
  | (BaseComponentConfig & {
      type: "dropdown";
    } & Omit<DropdownComponentDefinition<string | number>, "onChange">)
  | (BaseComponentConfig & {
      type: "checkbox";
    } & Omit<CheckBoxComponentDefinition, "onChange">);

export const useUIForms = (
  uic: UIComponents,
  initialSetup?: (form: UIForms) => void
): UIForms => {
  const [components, setComponents] = useState<Map<string, ComponentConfig>>(
    new Map()
  );

  const [formState, setFormState] = useState<Record<string, any>>({});

  const setupTextInput: UIForms["setupTextInput"] = (props) => {
    setComponents((prev) => {
      const updatedComponents = new Map(prev);
      updatedComponents.set(props.key, { type: "textInput", ...props });
      return updatedComponents;
    });
  };

  const setupNumberInput: UIForms["setupNumberInput"] = (props) => {
    setComponents((prev) => {
      const updatedComponents = new Map(prev);
      updatedComponents.set(props.key, { type: "numberInput", ...props });
      return updatedComponents;
    });
  };

  const setupDropdown: UIForms["setupDropdown"] = (props) => {
    setComponents((prev) => {
      const updatedComponents = new Map(prev);
      updatedComponents.set(props.key, { type: "dropdown", ...props });
      return updatedComponents;
    });
  };

  const setupCheckbox: UIForms["setupCheckbox"] = (props) => {
    setComponents((prev) => {
      const updatedComponents = new Map(prev);
      updatedComponents.set(props.key, { type: "checkbox", ...props });
      return updatedComponents;
    });
  };

  const handleChange = (key: string, value: any) => {
    setFormState((prev) =>
      prev[key] === value ? prev : { ...prev, [key]: value }
    );
  };

  const get = () => {
    const currentValues: Record<string, any> = {};
    components.forEach((_, key) => {
      currentValues[key] = formState[key];
    });
    return { values: currentValues };
  };

  const validate = () => {
    const errors: Record<string, string[] | null> = {};
    let isValid = true;

    setComponents((prev) => {
      const updatedComponents = new Map(prev);

      updatedComponents.forEach((component, key) => {
        if (component.validators && component.validators.length > 0) {
          const validationErrors = component.validators
            .map((validator) => validator(formState[key]))
            .filter((result) => result !== null) as string[];

          if (validationErrors.length > 0) {
            isValid = false;
            errors[key] = validationErrors;
            updatedComponents.set(key, {
              ...component,
              errors: validationErrors,
            });
          } else {
            errors[key] = null;
            updatedComponents.set(key, {
              ...component,
              errors: undefined,
            });
          }
        }
      });

      return updatedComponents;
    });

    return { isValid, errors };
  };

  const view = () => (
    <div className="grid-wrapper">
      {Array.from(components.values()).map((component) => {
        const { key, type, wrapperClassName, wrapperSize, ...rest } = component;
        const value = formState[key] ?? component.value;
        const newWrapperClassName = wrapperClassName
          ? wrapperClassName + ` grid-item grid-item-${wrapperSize ?? 3}`
          : `grid-item grid-item-${wrapperSize ?? 3}`;
        const onChange = (value: any) => handleChange(key, value);

        const props = { ...rest, value, onChange };
        const componentMap: Record<
          typeof component.type,
          React.ComponentType<any>
        > = {
          textInput: uic.textInput,
          numberInput: uic.numberInput,
          dropdown: uic.dropdown,
          checkbox: uic.checkbox,
        };

        const Component = componentMap[type];
        if (!Component) return null;

        return (
          <Component
            {...{ ...props, wrapperClassName: newWrapperClassName }}
            key={key}
          />
        );
      })}
    </div>
  );

  const form: UIForms = {
    setupTextInput,
    setupNumberInput,
    setupDropdown,
    setupCheckbox,
    view,
    get,
    validate,
  };

  React.useEffect(() => {
    if (initialSetup) {
      setComponents((prev) => {
        const updatedComponents = new Map(prev);
        const setupForm: UIForms = {
          setupTextInput: (props) =>
            updatedComponents.set(props.key, { type: "textInput", ...props }),
          setupNumberInput: (props) =>
            updatedComponents.set(props.key, { type: "numberInput", ...props }),
          setupDropdown: (props) =>
            updatedComponents.set(props.key, { type: "dropdown", ...props }),
          setupCheckbox: (props) =>
            updatedComponents.set(props.key, { type: "checkbox", ...props }),
          view: () => null,
          get: () => {
            return {
              values: {},
            };
          },
          validate: () => {
            return { isValid: true, errors: {} };
          },
        };

        initialSetup(setupForm);
        return updatedComponents;
      });
    }
  }, []);
  return form;
};
