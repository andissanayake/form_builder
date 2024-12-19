export type BasicFormControls = {
  textInput: {
    config: {
      placeholder?: string;
    };
    value: string;
  };
  numberInput: {
    config: {
      min?: number;
      max?: number;
    };
    value: number | null;
  };
  dropdown: {
    config: {
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  checkbox: {
    config: {};
    value: boolean;
  };
  dateInput: {
    config: {
      minDate?: string;
      maxDate?: string;
    };
    value: string;
  };
  textArea: {
    config: {
      rows?: number;
      cols?: number;
      maxLength?: number;
    };
    value: string;
  };
};
