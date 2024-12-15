export type BaseComponentDefinition<T> = {
  label: string;
  errors?: string[];
  value?: T;
  onChange: (value: T | null) => void;
  wrapperClassName?: string;
};

export type InputTextComponentDefinition = BaseComponentDefinition<string>;

export type InputNumberComponentDefinition = BaseComponentDefinition<number> & {
  min?: number;
  max?: number;
};

export type DropdownComponentDefinition<T extends number | string> =
  BaseComponentDefinition<T> & {
    options: Array<{ value: T; text: string }>;
  };

export type CheckBoxComponentDefinition = BaseComponentDefinition<boolean>;

export interface UIComponents {
  textInput: React.ComponentType<InputTextComponentDefinition>;
  numberInput: React.ComponentType<InputNumberComponentDefinition>;
  dropdown: React.ComponentType<DropdownComponentDefinition<string | number>>;
  checkbox: React.ComponentType<CheckBoxComponentDefinition>;
}

export type Validator = (value: any) => string | null;

export type ValidatorWithMessage = (message?: string) => Validator;

export interface UIForms {
  setupTextInput: (
    props: Omit<InputTextComponentDefinition, "onChange" | "error"> & {
      key: string;
      wrapperSize?: number;
      validators?: Validator[];
    }
  ) => void;
  setupNumberInput: (
    props: Omit<InputNumberComponentDefinition, "onChange" | "error"> & {
      key: string;
      wrapperSize?: number;
      validators?: Validator[];
    }
  ) => void;
  setupDropdown: (
    props: Omit<
      DropdownComponentDefinition<string | number>,
      "onChange" | "error"
    > & {
      key: string;
      wrapperSize?: number;
      validators?: Validator[];
    }
  ) => void;
  setupCheckbox: (
    props: Omit<CheckBoxComponentDefinition, "onChange" | "error"> & {
      key: string;
      wrapperSize?: number;
      validators?: Validator[];
    }
  ) => void;
  get: () => { values: Record<string, any> };
  view: () => React.ReactNode;
  validate: () => {
    isValid: boolean;
    errors: Record<string, string[] | null>;
  };
}
