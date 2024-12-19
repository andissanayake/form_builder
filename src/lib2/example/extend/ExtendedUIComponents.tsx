import { UIComponentsV2 } from "../../Definition";
import { NativeUIComponents } from "../NativeUIComponents";
import { ExtendedControls } from "./ExtendedControls";

export const ExtendedUIComponents: UIComponentsV2<ExtendedControls> = {
  ...NativeUIComponents,
  toggleSwitch: ({ value, onChange, label, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>{label}</label>
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
    </div>
  ),
};
