const validEmail = "MyNameAgain24@noroff.no";
const validPassword = "mynameagain24";

const invalidEmail = "invalidEmail@noroff.no";
const invalidPassword = "invalidPassword";

describe("Login and logout test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);
  });

  it("Login with valid credentials", () => {
    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.get("#loginForm button[type='submit']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("exist");
    cy.wait(1000);
  });

  it("Logging out using the logout button", () => {
    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.get("#loginForm button[type='submit']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("exist");
    cy.get("button[data-visible='loggedIn']").should("be.visible");
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedOut']").should("exist");
    cy.get("button[data-visible='loggedIn']").should("not.be.visible");
  });

  it("Try to login with invalid credentials, but fails and shows a message", () => {
    cy.intercept(
      "POST",
      "https://nf-api.onrender.com/api/v1/social/auth/login",
    ).as("loginAttempt");

    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(invalidEmail);
    cy.get("#loginPassword").type(invalidPassword);
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Either your username was not found or your password is incorrect",
      );
    });
    cy.get("#loginForm button[type='submit']").click();

    cy.wait("@loginAttempt").then((interception) => {
      assert.equal(interception.response.statusCode, 401);
    });

    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("not.be.visible");
  });
});
