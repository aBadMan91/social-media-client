import { login } from "./login.js";
import { save } from "../../storage/index.js";
import localStorageMock from "../../storage/localStorage.mock.js";

global.localStorage = localStorageMock;

const validEmail = "Noroff@noroff.no";
const validPassword = "NoroffPassword2024";

const validUser = {
  email: validEmail,
  password: validPassword,
};

const invalidEmail = "ThisEmail@email.com";
const invalidPassword = "NotValidPassword2024";

const invalidUser = {
  email: invalidEmail,
  password: invalidPassword,
};

const key = "token";
const value = "yourStringValue";

function loginSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "Login success",
    json: () => Promise.resolve(validUser),
  });
}

function loginFailure() {
  return Promise.resolve({
    ok: false,
    status: 404,
    statusText: "Login Failed",
    json: () => Promise.resolve(invalidUser),
  });
}

describe("login", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("stores a token in localStorage if the login is successful", async () => {
    global.fetch = jest.fn(() => loginSuccess());
    const profileData = await login(validUser);
    expect(profileData).toEqual(validUser);
    expect(localStorage.getItem(key)).toBeNull();
    save(key, value);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
  });

  it("throws an error if the login fails", async () => {
    global.fetch = jest.fn(() => loginFailure());
    await expect(login(invalidUser)).rejects.toThrow("Login Failed");
    expect(localStorage.getItem(key)).toBeNull();
  });
});
