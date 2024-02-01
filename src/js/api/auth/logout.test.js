import { logout } from "./logout.js";
import { save, load } from "../../storage/index.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const key = "token";
const value = "yourStringValue";

describe("logout", () => {
  it("saves the token to localStorage", () => {
    expect(localStorage.getItem(key)).toBeNull();
    save(key, value);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it("loads the token from localStorage", () => {
    localStorage.setItem(key, JSON.stringify(value));
    expect(load(key)).toEqual(value);
  });

  it("removes the token from localStorage on logout", () => {
    localStorage.setItem(key, JSON.stringify(value));
    logout();
    expect(localStorage.getItem(key)).toBeNull();
  });
});
