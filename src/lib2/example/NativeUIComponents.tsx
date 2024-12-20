import { BasicFormControls } from "./BasicFormControls";
import { UIComponentsV2 } from "../Definition";

export const NativeUIComponents: UIComponentsV2<BasicFormControls> = {
  textInput: ({ config, value, onChange, label, errors, wrapperClassName }) => {
    const inputType = config.type ?? "text";
    return (
      <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <input
          style={{ width: "calc(100% - 8px)" }}
          type={inputType}
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
    );
  },

  numberInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input
        style={{ width: "calc(100% - 8px)" }}
        type="number"
        min={config.min}
        max={config.max}
        step={config.step}
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
      {label && <label>{label}</label>}
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
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /> {label}
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
      {label && <label>{label}</label>}
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
      {label && <label>{label}</label>}
      <textarea
        rows={config.rows}
        cols={config.cols}
        maxLength={config.maxLength}
        placeholder={config.placeholder}
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

  radioGroup: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <div>
        {config.options.map((option) => (
          <label key={option.value} style={{ marginRight: "8px" }}>
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            {option.text}
          </label>
        ))}
      </div>
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </div>
  ),

  multiSelect: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <select
        multiple
        style={{ width: "100%" }}
        value={value?.map((v) => v.toString())}
        onChange={(e) => {
          const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
          onChange(selectedValues);
        }}
      >
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

  fileUpload: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input type="file" accept={config.accept} multiple={config.multiple} onChange={(e) => onChange(e.target.files)} />
      {errors && (
        <div style={{ color: "red" }}>
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
      {value && value.length > 0 && (
        <div>
          {Array.from(value).map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  ),

  slider: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input
        style={{ width: "100%" }}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
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

  timeInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input
        type="time"
        min={config.minTime}
        max={config.maxTime}
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

  dateTimeInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input
        type="datetime-local"
        min={config.minDateTime}
        max={config.maxDateTime}
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

  colorPicker: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
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
