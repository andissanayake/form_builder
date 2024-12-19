import { BasicFormControls } from "../BasicFormControls";

export type ExtendedControls = BasicFormControls & {
  toggleSwitch: {
    config: {};
    value: boolean;
  };
};
