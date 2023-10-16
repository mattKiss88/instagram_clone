describe("Login Tests", () => {
  before(() => {
    cy.request(
      "POST",
      Cypress.env("REACT_APP_API_URL") + "/test/reset-database"
    );

    cy.request("POST", Cypress.env("REACT_APP_API_URL") + "/auth/signup", {
      userData: {
        username: "testuser12",
        password: "test1234",
        email: "testuser12@gmail.com",
      },
    });
  });

  beforeEach(() => {
    cy.visit("/login");

    if (cy.get('button:contains("Got it!")').should("exist")) {
      // Click the "Got it!" button
      cy.get('button:contains("Got it!")').click();
    }
  });

  it("should login with test credentials and navigate to /home", () => {
    cy.get("input[name=email]").type("testuser12@gmail.com");
    cy.get("input[name=password]").type("test1234");
    cy.get("button[type=submit]").click();

    // Check that the URL is now /home
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should show Notiflix error when incorrect login details are provided", () => {
    cy.get("input[name=email]").type("incorrectUsername");
    cy.get("input[name=password]").type("incorrectPassword");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Invalid username or password");
  });

  it("should show Notiflix error if password is empty", () => {
    cy.get("input[name=email]").type("incorrectUsername");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Please fill in all fields");
  });
  it("should show Notiflix error if email is empty", () => {
    cy.get("input[name=email]").type("incorrectEmail");
    cy.get("button[type=submit]").click();

    cy.get(".notiflix-notify-failure")
      .should("be.visible")
      .and("contain", "Please fill in all fields");
  });

  it("should not make API request if email is empty", () => {
    let requestMade = false;

    cy.intercept("POST", "/auth/login", (req) => {
      requestMade = true;
    }).as("loginRequest");

    cy.get("input[name=password]").type("somePassword");
    cy.get("button[type=submit]").click();

    cy.wait(1000).then(() => {
      expect(requestMade).to.be.false;
    });
  });

  it("should not make API request if password is empty", () => {
    let requestMade = false;

    cy.intercept("POST", "/auth/login", (req) => {
      requestMade = true;
    }).as("loginRequest");

    cy.get("input[name=email]").type("someEmail");
    cy.get("button[type=submit]").click();

    cy.wait(1000).then(() => {
      expect(requestMade).to.be.false;
    });
  });
  it("should route user to /signup when button is clicked", () => {
    cy.get("a[href='/signup']").click();

    cy.url().should("eq", "http://localhost:3000/signup");
  });
});
