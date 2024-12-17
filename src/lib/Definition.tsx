export type ControlMap<C = {}, V = any> = {
  [key: string]: {
    config: C;
    value: V;
  };
};

export type UIComponentsV2<T extends ControlMap> = {
  [Key in keyof T]: React.ComponentType<{
    config: T[Key]["config"];
    value: T[Key]["value"];
    onChange: (value: T[Key]["value"]) => void;
    label: string;
    errors?: string[];
    wrapperClassName?: string;
  }>;
};

export type Validator = (value: any) => string | null;

export type FormControlConfig<T extends ControlMap> = {
  [K in keyof T]: {
    key: string;
    type: K; // Control type, tied to the key
    label: string;
    parameters: T[K]["config"]; // Strict parameters tied to this control
    validators?: Validator[];
    wrapperClassName?: string;
  };
}[keyof T];

export interface UIFormsV2<T extends ControlMap> {
  setupControl: <Key extends keyof T>(
    key: string,
    type: Key,
    label: string,
    parameters: T[Key]["config"],
    validators?: Validator[],
    wrapperClassName?: string
  ) => void;
}
