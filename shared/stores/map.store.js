import SimpleStore from './simple.store';

class MapStore extends SimpleStore {
  constructor(...args) {
    super(...args);

    this.state = {
      cities: []
    };
  }
};

const mapStore = new MapStore;

export default mapStore;
