describe("Home Page Load Test.", () => {
  it("Visit the application homepage.", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });

  it("Verify that key UI elements (such as the login form or headline) are rendered correctly.", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.get(".orangehrm-login-title").should("have.text", "Login");
    cy.get(".oxd-form").should("be.visible");
  });
});

describe("Login Page UI Test", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });
  it("Ensure that username and password fields are visible.", () => {
    cy.get('input[name="username"]').should("be.visible");
    cy.get("input[name=password]").should("be.visible");
  });
  it("Check that the login button is present and clickable.", () => {
    cy.get("button[type=submit]").should("have.text", " Login ").click();
  });
});

describe("Invalid Login Attempt Test.", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });
  it("Try logging in using incorrect credentials and Confirm that an error message appears and that the user is not redirected.", () => {
    cy.get('input[name="username"]').should("be.visible").type("nimdha");
    cy.get("input[name=password]").should("be.visible").type("234567");
    cy.get("button[type=submit]").should("have.text", " Login ").click();
    cy.get(".oxd-alert-content-text").should(
      "have.text",
      "Invalid credentials"
    );
  });
});

describe("Successful Login & Redirection Test and .", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  });
  it("Log in using valid credentials and Confirm that the user is redirected to the dashboard or home screen.", () => {
    cy.get('input[name="username"]').should("be.visible").type("Admin");
    cy.get("input[name=password]").should("be.visible").type("admin123");
    cy.get("button[type=submit]").should("have.text", " Login ").click();
    cy.url().should("include", "web/index.php/dashboard/index");
    cy.get(".oxd-topbar-header-breadcrumb-module").should(
      "have.text",
      "Dashboard"
    );
  });
});
