import ComponentRegistry from "../utils/componentRegistry";
const componentRegistry = new ComponentRegistry();
const useComponentRegistry = (id, component = {}) => {
  if (Object.keys(component).length) {
    return componentRegistry.setComponent(id, component);
  }
  return componentRegistry.getComponent(id);
};

const useSetupRegistry = (components) => {
  return componentRegistry.setAllComponents(components);
};

export { useComponentRegistry, useSetupRegistry };
