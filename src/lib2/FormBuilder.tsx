import React, { useState, useRef, ReactNode, useCallback } from "react";

interface FieldConfig {
  label: string;
  type: string;
  row: number;
  col: number;
  defaultValue?: any;
  placeholder?: string;
  options?: any[];
}

export interface UIComponents {
  [key: string]: React.ComponentType<any>;
}

type FormValidator = (fieldValues: {
  [key: string]: any;
}) => { [key: string]: string } | null;

interface UseFormsResult {
  form: FormMethods;
  FormCmp: React.FC;
}

interface FormMethods {
  add: (config: FieldConfig) => FormMethods;
  patch: (values: { [key: string]: any }) => void;
  get: () => { value: { [key: string]: any }; errors: { [key: string]: any } };
  validate: () => boolean;
}

const useForms = (uiComponents: UIComponents): UseFormsResult => {
  const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const rows = useRef<FieldConfig[][]>([]); // To store rows of field configurations
  const formValidator = useRef<FormValidator | null>(null);

  const add = useCallback((config: FieldConfig): FormMethods => {
    const { row = 0, col = 0 } = config;
    while (rows.current.length <= row) {
      rows.current.push([]);
    }

    while (rows.current[row].length <= col) {
      rows.current[row].push(null as any);
    }

    rows.current[row][col] = config;
    return formMethods;
  }, []);

  const patch = useCallback((values: { [key: string]: any }) => {
    setFieldValues((prevState) => {
      const updatedFieldValues = { ...prevState, ...values };

      // Ensure every field from rows has a value in state
      rows.current.forEach((row) => {
        row.forEach((field) => {
          if (field && updatedFieldValues[field.label] === undefined) {
            updatedFieldValues[field.label] = field.defaultValue;
          }
        });
      });

      return updatedFieldValues;
    });
  }, []);

  const get = useCallback(() => {
    return { value: fieldValues, errors };
  }, [fieldValues, errors]);

  const validate = useCallback(() => {
    if (formValidator.current) {
      const validationErrors = formValidator.current(fieldValues);
      if (validationErrors) {
        setErrors(validationErrors);
        return false;
      }
    }
    setErrors({});
    return true;
  }, [fieldValues]);

  const FormCmp: React.FC = () => {
    const renderField = (config: FieldConfig): ReactNode => {
      const FieldComponent = uiComponents[config.type];
      const value =
        fieldValues[config.label] !== undefined
          ? fieldValues[config.label]
          : config.defaultValue;

      return (
        <FieldComponent
          value={value}
          onChange={(value: any) => {
            setFieldValues((prevState) => ({
              ...prevState,
              [config.label]: value,
            }));
          }}
          placeholder={config.placeholder}
          options={config.options}
        />
      );
    };

    return (
      <form>
        {rows.current.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((field, colIndex) =>
              field ? (
                <div key={colIndex} className="col">
                  <label>{field.label}</label>
                  {renderField(field)}
                  {errors[field.label] && (
                    <div className="error">{errors[field.label]}</div>
                  )}
                </div>
              ) : null
            )}
          </div>
        ))}
      </form>
    );
  };
  const formMethods: FormMethods = {
    add,
    patch,
    get,
    validate,
  };
  return {
    form: formMethods,
    FormCmp,
  };
};

export default useForms;
