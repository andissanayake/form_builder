import React, { useState } from "react";

// Base definition for all components
export type BaseComponentDefinition<T> = {
  label: string;
  error?: string;
  value?: T;
  onChange: (value: T) => void;
  wrapperStyles?: React.CSSProperties;
};

// Specific component definitions
export type InputTextComponentDefinition = BaseComponentDefinition<string>;

export type InputNumberComponentDefinition = BaseComponentDefinition<number> & {
  min?: number;
  max?: number;
};

export type DropdownComponentDefinition<T extends number | string> =
  BaseComponentDefinition<T> & {
    options: Array<{ value: T; text: string }>;
  };

export type CheckBoxComponentDefinition = BaseComponentDefinition<boolean>;

// Updated UI Components interface
export interface UIComponents {
  textInput: React.ComponentType<InputTextComponentDefinition>;
  numberInput: React.ComponentType<InputNumberComponentDefinition>;
  dropdown: React.ComponentType<DropdownComponentDefinition<string | number>>;
  checkbox: React.ComponentType<CheckBoxComponentDefinition>;
}

// Default UI Components
const DefaultTextInput: React.FC<InputTextComponentDefinition> = ({
  label,
  value = "",
  onChange,
  wrapperStyles,
}) => (
  <div style={wrapperStyles}>
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const DefaultNumberInput: React.FC<InputNumberComponentDefinition> = ({
  label,
  value = "",
  onChange,
  min,
  max,
  wrapperStyles,
}) => (
  <div style={wrapperStyles}>
    <label>{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      min={min}
      max={max}
    />
  </div>
);

const DefaultDropdown: React.FC<
  DropdownComponentDefinition<string | number>
> = ({ label, value = "", onChange, options, wrapperStyles }) => (
  <div style={wrapperStyles}>
    <label>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as string | number)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  </div>
);

const DefaultCheckbox: React.FC<CheckBoxComponentDefinition> = ({
  label,
  value = false,
  onChange,
  wrapperStyles,
}) => (
  <div style={wrapperStyles}>
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  </div>
);

export const NativeUIComponents: UIComponents = {
  textInput: DefaultTextInput,
  numberInput: DefaultNumberInput,
  dropdown: DefaultDropdown,
  checkbox: DefaultCheckbox,
};

// ComponentConfig for dynamic UI
type ComponentConfig =
  | ({ type: "textInput"; key: string } & Omit<
      InputTextComponentDefinition,
      "onChange" | "error"
    >)
  | ({ type: "numberInput"; key: string } & Omit<
      InputNumberComponentDefinition,
      "onChange" | "error"
    >)
  | ({ type: "dropdown"; key: string } & Omit<
      DropdownComponentDefinition<string | number>,
      "onChange" | "error"
    >)
  | ({ type: "checkbox"; key: string } & Omit<
      CheckBoxComponentDefinition,
      "onChange" | "error"
    >);

// UIForms interface
export interface UIForms {
  addTextInput: (
    props: Omit<InputTextComponentDefinition, "onChange" | "error"> & {
      key: string;
    }
  ) => void;
  addNumberInput: (
    props: Omit<InputNumberComponentDefinition, "onChange" | "error"> & {
      key: string;
    }
  ) => void;
  addDropdown: (
    props: Omit<
      DropdownComponentDefinition<string | number>,
      "onChange" | "error"
    > & {
      key: string;
    }
  ) => void;
  addCheckbox: (
    props: Omit<CheckBoxComponentDefinition, "onChange" | "error"> & {
      key: string;
    }
  ) => void;
  build: () => React.ReactNode;
}

// useUIForms Hook
export const useUIForms = (uic: UIComponents): UIForms => {
  const [components, setComponents] = useState<ComponentConfig[]>([]);
  const [formState, setFormState] = useState<Record<string, any>>({});

  const addTextInput: UIForms["addTextInput"] = (props) => {
    setComponents((prev) => [...prev, { type: "textInput", ...props }]);
  };

  const addNumberInput: UIForms["addNumberInput"] = (props) => {
    setComponents((prev) => [...prev, { type: "numberInput", ...props }]);
  };

  const addDropdown: UIForms["addDropdown"] = (props) => {
    setComponents((prev) => [...prev, { type: "dropdown", ...props }]);
  };

  const addCheckbox: UIForms["addCheckbox"] = (props) => {
    setComponents((prev) => [...prev, { type: "checkbox", ...props }]);
  };

  const handleChange = (key: string, value: any) => {
    setFormState((prev) =>
      prev[key] === value ? prev : { ...prev, [key]: value }
    );
  };

  const build = () => (
    <div>
      {components.map((component) => {
        const { key, type, ...rest } = component;

        // Extract value and onChange dynamically
        const value = formState[key] ?? component.value;
        const onChange = (value: any) => handleChange(key, value);

        // Define component-specific props
        const props = {
          ...rest, // Pass all remaining props (label, wrapperStyles, etc.)
          value, // Add the current value
          onChange, // Add the onChange handler
        };

        // Use a mapping object for cleaner rendering logic
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

        // Explicitly pass the key as a prop to the parent element
        return <Component {...props} key={key} />;
      })}
    </div>
  );

  return { addTextInput, addNumberInput, addDropdown, addCheckbox, build };
};
