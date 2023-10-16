describe("Sign Up Tests", () => {
  beforeEach(() => {
    cy.request(
      "POST",
      Cypress.env("REACT_APP_API_URL") + "/test/reset-database"
    );

    cy.visit("/signup");
  });

  it("should sign user up if all credentials are provided", () => {
    cy.get("input[name=email]").type("testuser12@gmail.com");
    cy.get("input[name=password]").type("test1234");
    cy.get("input[name=fullName]").type("test name");
    cy.get("input[name=username]").type("testuser12");
    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should sign user up if optional credentials are omitted", () => {
    cy.get("input[name=email]").type("testuser12@gmail.com");
    cy.get("input[name=password]").type("test1234");
    cy.get("input[name=username]").type("testuser12");
    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should show Notiflix error if email is taken", () => {
    cy.request("POST", Cypress.env("REACT_APP_API_URL") + "/auth/signup", {
      userData: {
        username: "testuser12",
        password: "test1234",
        email: "testuser12@gmail.com",
      },
    });

    cy.get("input[name=email]").type("testuser12@gmail.com");
    cy.get("input[name=password]").type("test1234");
    cy.get("input[name=username]").type("testuser12");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Email already exists");

    cy.get('input[name="email"]').should(($input) => {
      const style = window.getComputedStyle($input[0]);
      const borderColor = style.getPropertyValue("border-color");
      expect(borderColor).to.equal("rgb(255, 0, 0)");
    });
  });
  it("should show Notiflix error if username is taken", () => {
    cy.request("POST", Cypress.env("REACT_APP_API_URL") + "/auth/signup", {
      userData: {
        username: "testuser12",
        password: "test1234",
        email: "testuser12@gmail.com",
      },
    });

    cy.get("input[name=email]").type("testuser123@gmail.com");
    cy.get("input[name=password]").type("test1234");
    cy.get("input[name=username]").type("testuser12");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Username already exists");

    cy.get('input[name="username"]').should(($input) => {
      const style = window.getComputedStyle($input[0]);
      const borderColor = style.getPropertyValue("border-color");
      expect(borderColor).to.equal("rgb(255, 0, 0)");
    });
  });
  it("should show Notiflix error if password is invalid", () => {
    cy.get("input[name=email]").type("testuser123@gmail.com");
    cy.get("input[name=password]").type("test");
    cy.get("input[name=username]").type("testuser12");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Password must be at least 6 characters");

    cy.get('input[name="password"]').should(($input) => {
      const style = window.getComputedStyle($input[0]);
      const borderColor = style.getPropertyValue("border-color");
      expect(borderColor).to.equal("rgb(255, 0, 0)");
    });
  });
});
