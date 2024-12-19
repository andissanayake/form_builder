export type ControlMap<C = {}, V = any> = {
  [key: string]: {
    config: C;
    value: V;
  };
};

export interface BaseControlProps<Config, Value> {
  config: Config;
  value?: Value;
  onChange?: (value: Value) => void;
  label: string;
  errors?: string[];
  wrapperClassName?: string;
}

export type UIComponentsV2<T extends ControlMap> = {
  [Key in keyof T]: React.ComponentType<
    BaseControlProps<T[Key]["config"], T[Key]["value"]>
  >;
};

export type Validator = (value: any) => string | null;

export type FormControlConfig<T extends ControlMap> = {
  [K in keyof T]: BaseControlProps<T[K]["config"], T[K]["value"]> & {
    type: K;
    validators?: Validator[];
  };
}[keyof T];

export interface UseUIFormsV2<T extends ControlMap> {
  render: () => JSX.Element[];
  getValues: () => { [key: string]: T[keyof T]["value"] };
  validate: () => {
    values: { [key: string]: T[keyof T]["value"] };
    isValid: boolean;
    errors: { [key: string]: string[] };
  };
  setupControl: (controlKey: string, parameters: FormControlConfig<T>) => void;
  patch: (updates: Partial<{ [key: string]: T[keyof T]["value"] }>) => void;
  remove: (key: string) => void;
  initForm: (
    configArray: { controlKey: string; parameters: FormControlConfig<T> }[]
  ) => void;
}
