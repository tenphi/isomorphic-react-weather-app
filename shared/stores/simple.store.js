export default class SimpleStore {
  constructor() {
    this.components = new Set;
    this.state = {};
  }

  bind(component) {
    this.components.add(component);

    Object.assign(component.state,this.state);
  }

  unbind(component) {
    this.components.delete(component);
  }

  set(state = {}) {
    Object.assign(this.state, state);

    this.components.forEach(component => {
      component.setState(this.state);
    });
  }
};
