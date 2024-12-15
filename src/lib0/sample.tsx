import {
  CheckBoxComponentDefinition,
  DropdownComponentDefinition,
  InputComponentDefinition,
} from "./ComponentDefinition";
import componentRegistry from "./native/NativeComponentRegistry";

// Wrapper Component
type ComponentWrapperProps<T extends string | number> =
  | { type: "input"; props: InputComponentDefinition<T> }
  | { type: "dropdown"; props: DropdownComponentDefinition<T> }
  | { type: "checkbox"; props: CheckBoxComponentDefinition };

export const ComponentWrapper = <T extends string | number>({
  type,
  props,
}: ComponentWrapperProps<T>) => {
  const Component = componentRegistry.get<T>(type);

  if (!Component) {
    throw new Error(`Component of type "${type}" is not registered.`);
  }

  return <Component {...(props as any)} />;
};

const AppForm = () => {
  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        width: "100%",
      }}
    >
      {/* Input Component */}
      <ComponentWrapper
        type="input"
        props={{
          label: "Name",
          error: "",
          onChange: (val: string) => console.log("Input Value:", val),
        }}
      />
      <ComponentWrapper
        type="dropdown"
        props={{
          label: "Age",
          error: "Select an age",
          value: undefined,
          options: [
            { value: 20, text: "20 years" },
            { value: 25, text: "25 years" },
            { value: 30, text: "30 years" },
          ],
          onChange: (val: number) => console.log("Dropdown Value:", val),
        }}
      />
      <ComponentWrapper
        type="checkbox"
        props={{
          label: "Accept Terms",
          error: "",
          value: true,
          onChange: (val: boolean) => console.log("Checkbox Value:", val),
        }}
      />
    </div>
  );
};

export default AppForm;
