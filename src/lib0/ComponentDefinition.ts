export type BaseComponentDefinition<T> = {
  label: string;
  error: string;
  value?: T;
  onChange: (value: T) => void;
  wrapperStyles?: React.CSSProperties;
};

export type InputComponentDefinition<T extends number | string> =
  BaseComponentDefinition<T>;

export type DropdownComponentDefinition<T extends number | string> =
  BaseComponentDefinition<T> & {
    options: Array<{ value: T; text: string }>;
  };

export type CheckBoxComponentDefinition = BaseComponentDefinition<boolean>;
