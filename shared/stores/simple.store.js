export default class SimpleStore {
  constructor() {
    this.components = new Set;
    this.state = {};
  }

  bind(component) {
    this.components.add(component);

    component.setState(this.state);
  }

  unbind(component) {
    this.components.delete(component);
  }

  set(state = {}) {
    if (this.willReceiveState(state) === false) return;

    Object.assign(this.state, state);

    this.components.forEach(component => {
      component.setState(this.state);
    });
  }

  willReceiveState(state) {

  }
};
