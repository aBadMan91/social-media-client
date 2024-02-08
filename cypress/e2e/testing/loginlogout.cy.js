const validEmail = "MyNameAgain24@noroff.no";
const validPassword = "mynameagain24";

const invalidEmail = "invalidEmail@email.com";
const invalidPassword = "invalidPassword";

describe("Login and logout test", () => {
  beforeEach(() => {
    cy.visit("/");
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
  });

  it("Logging out using the logout button", () => {
    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.get("#loginForm button[type='submit']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("exist");
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("exist");
  });

  it("Try to login with invalid credentials, but fails", () => {
    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(invalidEmail);
    cy.get("#loginPassword").type(invalidPassword);
    cy.get("#loginForm button[type='submit']").click();
    cy.wait(1000);
    cy.window("button[data-visible='loggedIn']").should("not.exist");
  });
});
