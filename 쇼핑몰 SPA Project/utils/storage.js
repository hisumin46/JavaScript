export class storageUtil {
  constructor() {
    this.storage = localStorage;

  }

  getItem(key) {
    try {
      const value = this.storage.getItem(key);
      return value ? JSON.parse(value): [];
    } catch (err) {
      return new Error(err);
    }
  }
  
  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      return new Error(err);
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
    } catch (err) {
      return new Error(err);
    }
  }
}