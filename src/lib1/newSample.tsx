import React from "react";
import { NativeUIComponents, useUIForms } from "./ComponentDefinition";

const MyForm = () => {
  const form = useUIForms(NativeUIComponents);

  React.useEffect(() => {
    form.addTextInput({ key: "name123", label: "Name" });
    form.addNumberInput({ key: "number123", label: "Age", min: 0, max: 65 });
    form.addDropdown({
      key: "gender",
      label: "Gender",
      value: "",
      options: [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
      ],
    });
    form.addCheckbox({ key: "subscribe", label: "Subscribe", value: false });
  }, []);
  return <div>{form.build()}</div>;
};

export default MyForm;
