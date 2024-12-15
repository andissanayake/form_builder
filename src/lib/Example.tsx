import { useUIForms } from "./UIForms";
import { NativeUIComponents } from "./NativeUIComponents";
import { Validators } from "./Validators";

const MyForm = () => {
  const form = useUIForms(NativeUIComponents, (initForm) => {
    initForm.setupTextInput({
      key: "name123",
      label: "Name",
      wrapperSize: 12,
      validators: [Validators.required(), Validators.minLength(5)],
    });
    initForm.setupNumberInput({
      key: "number123",
      label: "Age",
      min: 0,
      max: 65,
      wrapperSize: 4,
      validators: [Validators.required()],
    });
    initForm.setupDropdown({
      key: "gender",
      label: "Gender",
      options: [
        { value: "", text: "Not Set" },
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
      ],
      wrapperSize: 4,
    });
    initForm.setupCheckbox({
      key: "subscribe",
      label: "Subscribe",
      wrapperSize: 4,
    });
  });
  return (
    <div style={{ width: 600 }}>
      {form.view()}
      <button
        onClick={() => {
          var ret = form.validate();
          console.log(ret, form.get());
        }}
      >
        Save
      </button>
    </div>
  );
};

export default MyForm;
