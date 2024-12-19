import { BasicFormControls } from "./BasicFormControls";
import { UIComponentsV2 } from "../Definition";

export const NativeUIComponents: UIComponentsV2<BasicFormControls> = {
  textInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <input
        style={{ width: "calc(100% - 8px)" }}
        type="text"
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  numberInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <input
        style={{ width: "calc(100% - 8px)" }}
        type="number"
        min={config.min}
        max={config.max}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
      />
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  dropdown: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <select style={{ width: "100%" }} value={value} onChange={(e) => onChange(e.target.value)}>
        {config.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  checkbox: ({ value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>
        <br />
      </label>
      <label>
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  dateInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <input
        style={{ width: "calc(100% - 8px)" }}
        type="date"
        min={config.minDate}
        max={config.maxDate}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  textArea: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <textarea
        rows={config.rows}
        cols={config.cols}
        maxLength={config.maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "calc(100% - 8px)" }}
      />
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),
};
