import {
  CheckBoxComponentDefinition,
  DropdownComponentDefinition,
  InputComponentDefinition,
} from "../ComponentDefinition";
import componentRegistry from "../ComponentRegistry";
import {
  CheckBoxComponent,
  DropdownComponent,
  InputComponent,
} from "./NativeComponent";

componentRegistry.register<
  number | string,
  InputComponentDefinition<number | string>
>("input", InputComponent);

// Register dropdown component
componentRegistry.register<
  number | string,
  DropdownComponentDefinition<number | string>
>("dropdown", DropdownComponent);

// Register checkbox component
componentRegistry.register<boolean, CheckBoxComponentDefinition>(
  "checkbox",
  CheckBoxComponent
);

export default componentRegistry;
