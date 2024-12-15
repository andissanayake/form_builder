import {
  CheckBoxComponentDefinition,
  DropdownComponentDefinition,
  InputNumberComponentDefinition,
  InputTextComponentDefinition,
  UIComponents,
} from "./ComponentDefinition";

const DefaultTextInput: React.FC<InputTextComponentDefinition> = ({
  label,
  value = "",
  onChange,
  wrapperClassName,
  errors,
}) => (
  <div className={wrapperClassName}>
    <label>{label}</label>
    <input
      style={{ width: "calc(100% - 8px)" }}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div style={{ color: "red" }}>
      {errors?.map((error) => {
        return <span key={Math.random().toFixed(100).toString()}>{error}</span>;
      })}
    </div>
  </div>
);

const DefaultNumberInput: React.FC<InputNumberComponentDefinition> = ({
  label,
  value = null,
  onChange,
  min,
  max,
  wrapperClassName,
  errors,
}) => (
  <div className={wrapperClassName}>
    <label>{label}</label>
    <input
      style={{ width: "calc(100% - 8px)" }}
      type="number"
      value={value === null ? "" : value}
      onChange={(e) => onChange(e.target.value === "" ? null : +e.target.value)}
      min={min}
      max={max}
    />
    <div style={{ color: "red" }}>
      {errors?.map((error) => {
        return <span key={Math.random().toFixed(100).toString()}>{error}</span>;
      })}
    </div>
  </div>
);

const DefaultDropdown: React.FC<
  DropdownComponentDefinition<string | number>
> = ({ label, value = "", onChange, options, wrapperClassName, errors }) => (
  <div className={wrapperClassName}>
    <label>{label}</label>
    <select
      style={{ width: "100%" }}
      value={value}
      onChange={(e) => onChange(e.target.value as string | number)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
    <div style={{ color: "red" }}>
      {errors?.map((error) => {
        return <span key={Math.random().toFixed(100).toString()}>{error}</span>;
      })}
    </div>
  </div>
);

const DefaultCheckbox: React.FC<CheckBoxComponentDefinition> = ({
  label,
  value = false,
  onChange,
  wrapperClassName,
  errors,
}) => (
  <div className={wrapperClassName}>
    <label className="line_break_for_alignment">
      <br />
    </label>
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
    <div style={{ color: "red" }}>
      {errors?.map((error) => {
        return <span key={Math.random().toFixed(100).toString()}>{error}</span>;
      })}
    </div>
  </div>
);

export const NativeUIComponents: UIComponents = {
  textInput: DefaultTextInput,
  numberInput: DefaultNumberInput,
  dropdown: DefaultDropdown,
  checkbox: DefaultCheckbox,
};
