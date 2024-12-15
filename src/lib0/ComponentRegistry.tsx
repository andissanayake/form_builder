import { BaseComponentDefinition } from "./ComponentDefinition";

class ComponentRegistry {
  private registry: Record<
    string,
    React.ComponentType<BaseComponentDefinition<any>>
  > = {};

  // Register a component
  register<T, P extends BaseComponentDefinition<T>>(
    type: string,
    component: React.ComponentType<P>
  ): void {
    if (this.registry[type]) {
      console.warn(
        `Component type "${type}" is already registered. Overwriting.`
      );
    }
    this.registry[type] = component as React.ComponentType<
      BaseComponentDefinition<T>
    >;
  }

  // Retrieve a component
  get<T>(type: string): React.ComponentType<BaseComponentDefinition<T>> | null {
    return this.registry[type] || null;
  }

  // Check if a component is registered
  isRegistered(type: string): boolean {
    return !!this.registry[type];
  }
}
const componentRegistry = new ComponentRegistry();
export default componentRegistry;
