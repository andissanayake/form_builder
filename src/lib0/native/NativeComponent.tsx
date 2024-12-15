import {
  CheckBoxComponentDefinition,
  DropdownComponentDefinition,
  InputComponentDefinition,
} from "../ComponentDefinition";
import ControlWrapper from "./ControlWrapper";

export const InputComponent = <T extends number | string>({
  label,
  error,
  value,
  onChange,
  wrapperStyles,
}: InputComponentDefinition<T>) => (
  <ControlWrapper label={label} error={error} wrapperStyles={wrapperStyles}>
    <input
      style={{ width: "calc(100% - 8px)" }}
      type={typeof value === "number" ? "number" : "text"}
      value={value}
      onChange={(e) => {
        const newValue =
          typeof value === "number" ? +e.target.value : e.target.value;
        onChange(newValue as T);
      }}
    />
  </ControlWrapper>
);

export const DropdownComponent = <T extends number | string>({
  label,
  error,
  value,
  options,
  onChange,
  wrapperStyles,
}: DropdownComponentDefinition<T>) => (
  <ControlWrapper label={label} error={error} wrapperStyles={wrapperStyles}>
    <select
      style={{ width: "100%" }}
      value={value}
      onChange={(e) => {
        const newValue =
          typeof value === "number" ? +e.target.value : e.target.value;
        onChange(newValue as T);
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  </ControlWrapper>
);

export const CheckBoxComponent = ({
  label,
  error,
  value,
  onChange,
  wrapperStyles,
}: CheckBoxComponentDefinition) => (
  <ControlWrapper error={error} wrapperStyles={wrapperStyles}>
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  </ControlWrapper>
);
