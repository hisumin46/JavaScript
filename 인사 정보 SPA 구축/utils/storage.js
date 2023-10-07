export default class storageUtil {
  constructor() {
    this.storage = localStorage;
  }

  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return new Error(error);
    }
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    } catch (error) {
      return new Error(error);
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      return new Error(error);
    }
  }
}