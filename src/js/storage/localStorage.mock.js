export default {
  mockStorage: {},

  setItem: jest.fn(function (key, value) {
    this.mockStorage[key] = value;
  }),
  getItem: jest.fn(function (key) {
    return this.mockStorage[key] || null;
  }),
  removeItem: jest.fn(function (key) {
    delete this.mockStorage[key];
  }),
  clear: jest.fn(function () {
    this.mockStorage = {};
  }),
};
