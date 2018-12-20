import SimpleStore from './simple.store';
import Storage from '../services/storage';

class MapStore extends SimpleStore {
  constructor(...args) {
    super(...args);

    this.state = {
      cities: [],
      date: parseInt(Storage.get('date')) || 8
    };
  }

  willReceiveState(state) {
    super.willReceiveState(state);

    if (state.date) {
      Storage.set('date', state.date);
    }
  }
};

const mapStore = new MapStore;

export default mapStore;
