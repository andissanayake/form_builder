import { BasicFormControls } from "./BasicFormControls";
import { UIComponentsV2 } from "./Definition";

// Define UI components for the form controls
export const NativeUIComponents: UIComponentsV2<BasicFormControls> = {
  text: ({ config, value, onChange, label, errors }) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        placeholder={config.placeholder}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
      <div style={{ color: "red" }}>
        {errors?.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </div>
    </div>
  ),
  number: ({ config, value, onChange, label, errors }) => (
    <div>
      <label>{label}</label>
      <input
        type="number"
        min={config.min}
        max={config.max}
        value={value as number}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div style={{ color: "red" }}>
        {errors?.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </div>
    </div>
  ),
};
