const validEmail = "MyNameAgain24@noroff.no";
const validPassword = "mynameagain24";

const invalidEmail = "invalidEmail@noroff.no";
const invalidPassword = "invalidPassword";

describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);
  });

  it("allows a user to login with valid credentials", () => {
    cy.get("#registerForm button[data-auth='login']").click();
    cy.wait(1000);
    cy.get("#loginEmail").type(validEmail);
    cy.get("#loginPassword").type(validPassword);
    cy.get("#loginForm button[type='submit']").click();
    cy.wait(1000);
    cy.get("button[data-visible='loggedIn']").should("exist");
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
      expect(token).to.be.a("string");
      expect(token).to.not.be.empty;
    });
  });

  it("allows a logged in user to logout", () => {
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
    cy.get("button[data-visible='loggedOut']").should("be.visible");
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });

  it("shows an error message when you try to login with invalid credentials", () => {
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
    cy.get("button[data-visible='loggedOut']").should("be.visible");
  });
});
