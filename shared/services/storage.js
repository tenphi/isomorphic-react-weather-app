let hasLocalStorage = true;

try {
  localStorage.setItem('__test', 'test');
  localStorage.getItem('__test');
  localStorage.removeItem('__test');
} catch(e) {
  hasLocalStorage = false;
}

const store = {};

const Storage = {
  set(key, value) {
    if (hasLocalStorage) {
      localStorage.setItem(key, value);
    } else {
      store[key] = value;
    }
  },

  get(key) {
    if (hasLocalStorage) {
      return localStorage.getItem(key);
    } else {
      return store[key];
    }
  },

  delete(key) {
    if (hasLocalStorage) {
      return localStorage.removeItem(key);
    } else {
      return store[key];
    }
  }
}

export default Storage;
