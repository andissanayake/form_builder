import { UIComponents } from "./FormBuilder";

export const NativeComponents: UIComponents = {
  text: ({ value, onChange, placeholder }) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
  number: ({ value, onChange, placeholder }) => (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
  checkbox: ({ value, onChange }) => (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
  radio: ({ value, onChange, options }) =>
    options?.map((option: any) => (
      <label key={option}>
        <input
          type="radio"
          value={option}
          checked={value === option}
          onChange={() => onChange(option)}
        />
        {option}
      </label>
    )),
  select: ({ value, onChange, options }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options?.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
  date: ({ value, onChange }) => (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
};
