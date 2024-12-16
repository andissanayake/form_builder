export type BasicControlMap = {
  textInput: {
    config: {
      label: string;
      wrapperClassName?: string;
    };
    value: string;
  };
  numberInput: {
    config: {
      label: string;
      wrapperClassName?: string;
      min?: number;
      max?: number;
    };
    value: number;
  };
  dropdown: {
    config: {
      label: string;
      wrapperClassName?: string;
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  checkbox: {
    config: {
      label: string;
      wrapperClassName?: string;
    };
    value: boolean;
  };
  dateInput: {
    config: {
      label: string;
      wrapperClassName?: string;
      minDate?: string;
      maxDate?: string;
    };
    value: string;
  };
  textArea: {
    config: {
      label: string;
      wrapperClassName?: string;
      rows?: number;
      cols?: number;
      maxLength?: number;
    };
    value: string;
  };
};

/*
  export class BasicUIForms implements UIFormsV2<BasicControlMap> {
    private controls = new Map<
      keyof BasicControlMap,
      BasicControlMap[keyof BasicControlMap]["config"]
    >();
    constructor(ui: UIComponentsV2<BasicControlMap>) {}
  
    setupControl<Key extends keyof BasicControlMap>(
      key: Key,
      parameters: BasicControlMap[Key]["config"]
    ): void {
      this.controls.set(key, parameters);
    }
  
    render(): void {
      console.log("Rendering the form...");
      this.controls.forEach((config, key) => {
        console.log(`Control: ${key}`);
        console.log("Config:", config);
      });
    }
  
    getValues(): Record<string, any> {
      const values: Record<string, any> = {};
      this.controls.forEach((_, key) => {
        values[key] = null;
      });
      return values;
    }
  }
  */
