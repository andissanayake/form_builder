import { useEffect } from "react";
import { NativeComponents } from "./NativeComponents";
import useForms from "./FormBuilder";

const MyForm = () => {
  const { form, FormCmp } = useForms(NativeComponents);
  form
    .add({
      label: "Name",
      type: "text",
      row: 0,
      col: 0,
      defaultValue: "",
      placeholder: "Enter your name",
    })
    .add({
      label: "Age",
      type: "text",
      row: 0,
      col: 1,
      defaultValue: "",
      placeholder: "Enter your age",
    })
    .add({
      label: "Gender",
      type: "select",
      row: 1,
      col: 0,
      options: ["Male", "Female", "Other"],
      defaultValue: "Male",
    });
  useEffect(() => {
    form.patch({ Name: "Aka", Gender: "Other", Age: 35 });
  }, []);

  return (
    <div>
      <h1>Form</h1>
      <FormCmp />
      <button
        onClick={() => {
          console.log(form.get());
        }}
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default MyForm;
