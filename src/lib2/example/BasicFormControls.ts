export type BasicFormControls = {
  textInput: {
    config: {
      label?: string;
      required?: boolean;
      placeholder?: string;
      minLength?: number;
      maxLength?: number;
      type?: "text" | "password" | "email" | "tel" | "url";
    };
    value: string;
  };
  numberInput: {
    config: {
      label?: string;
      required?: boolean;
      min?: number;
      max?: number;
      step?: number;
    };
    value: number | null;
  };
  dropdown: {
    config: {
      label?: string;
      required?: boolean;
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  checkbox: {
    config: {
      label?: string;
      required?: boolean;
    };
    value: boolean;
  };
  dateInput: {
    config: {
      label?: string;
      required?: boolean;
      minDate?: string; // e.g., "2024-01-01"
      maxDate?: string; // e.g., "2024-12-31"
    };
    value: string;
  };
  textArea: {
    config: {
      label?: string;
      required?: boolean;
      rows?: number;
      cols?: number;
      maxLength?: number;
      placeholder?: string;
    };
    value: string;
  };
  radioGroup: {
    config: {
      label?: string;
      required?: boolean;
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  multiSelect: {
    config: {
      label?: string;
      required?: boolean;
      options: Array<{ value: string | number; text: string }>;
    };
    value: Array<string | number>;
  };
  fileUpload: {
    config: {
      label?: string;
      required?: boolean;
      accept?: string; // e.g., ".jpg,.png,.pdf"
      multiple?: boolean;
    };
    value: FileList | null;
  };
  slider: {
    config: {
      label?: string;
      required?: boolean;
      min?: number;
      max?: number;
      step?: number;
    };
    value: number;
  };
  timeInput: {
    config: {
      label?: string;
      required?: boolean;
      minTime?: string; // e.g., "09:00"
      maxTime?: string; // e.g., "17:00"
    };
    value: string; // e.g., "13:30"
  };
  dateTimeInput: {
    config: {
      label?: string;
      required?: boolean;
      minDateTime?: string; // e.g., "2024-12-20T09:00"
      maxDateTime?: string; // e.g., "2024-12-20T17:00"
    };
    value: string; // e.g., "2024-12-20T14:30"
  };
  colorPicker: {
    config: {
      label?: string;
      required?: boolean;
    };
    value: string; // e.g., "#FFFFFF"
  };
};
