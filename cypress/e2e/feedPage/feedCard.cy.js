import "cypress-real-events/support";

before(() => {
  cy.request("POST", Cypress.env("REACT_APP_API_URL") + "/test/reset-database");
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

  cy.get("input[name=email]").type("testuser12@gmail.com");
  cy.get("input[name=password]").type("test1234");
  cy.get("button[type=submit]").click();
  cy.get(".infinite-scroll-component > div:first-child").as("firstPost");
});

describe("Feed Card Footer", () => {
  it("should open post modal when post icon is clicked", () => {
    cy.get("@firstPost")
      .find('[data-cypress="view-post-button"]')
      .click({ force: true });

    cy.get('[data-cypress="post-modal"]').should("be.visible");
  });
  describe("Post like Functionality", () => {
    it("should increment the likes count when the like button is pressed", () => {
      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cypress="like-count"]')
        .invoke("text")
        .then((text) => {
          const initialLikes = parseInt(text, 10);

          // Click the "Like" button
          cy.get("@firstPost")
            .find('[data-cypress="like-button"]')
            .click({ force: true });

          // Assert that the likes count increased by 1
          cy.get("@firstPost")
            .find('[data-cypress="like-count"]')
            .invoke("text")
            .should((newText) => {
              const newLikes = parseInt(newText, 10);
              expect(newLikes).to.eq(initialLikes + 1);
            });
        });
    });
    it("should decrement the likes count when the like button is pressed if the post has been previously liked", () => {
      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cypress="like-count"]')
        .invoke("text")
        .then((text) => {
          const initialLikes = parseInt(text, 10);

          // Click the "Like" button
          cy.get("@firstPost")
            .find('[data-cypress="like-button"]')
            .click({ force: true });

          // Click the "Like" button after it has been liked

          cy.get("@firstPost")
            .find('[data-cypress="like-button"]')
            .click({ force: true });

          // Assert that the likes count increased by 1
          cy.get("@firstPost")
            .find('[data-cypress="like-count"]')
            .invoke("text")
            .should((newText) => {
              const newLikes = parseInt(newText, 10);
              expect(newLikes).to.eq(initialLikes);
            });
        });
    });
    it("should increment like count when picture is double tapped and fill heart icon", () => {
      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cypress="like-count"]')
        .invoke("text")
        .then((initialLikesText) => {
          const initialLikes = parseInt(initialLikesText, 10);

          // Check if the heart icon is already active and decrement count if so
          cy.get("@firstPost")
            .find('[data-cypress="like-button"]')
            .invoke("attr", "class")
            .then((classValue) => {
              if (classValue.includes("active")) {
                cy.get("@firstPost")
                  .find('[data-cypress="like-button"]')
                  .click({ force: true });

                return initialLikes - 1; // Decrement the likes if active
              }
              return initialLikes; // Return initial likes if not active
            })
            .then((likesToCompare) => {
              // Double click the image to simulate the 'like'
              cy.get("@firstPost")
                .find('[data-cypress="feed-image"]')
                .dblclick({ force: true });

              // Assert that the likes count increased by 1
              cy.get("@firstPost")
                .find('[data-cypress="like-count"]')
                .invoke("text")
                .should((newLikesText) => {
                  const newLikes = parseInt(newLikesText, 10);
                  expect(newLikes).to.eq(likesToCompare + 1);
                });

              // Assert that the heart icon is filled
              cy.get("@firstPost")
                .find('[data-cypress="like-button"]')
                .should("have.class", "activeHeart");
            });
        });
    });
  });
  describe("Post comment Functionality", () => {
    it("should add a comment under post description", () => {
      cy.get("@firstPost")
        .find('textarea[name="comment-box"]')
        .type("This is a test comment{enter}");

      cy.get("@firstPost")
        .find('[data-cypress="comment"]')
        .should("be.visible");
    });
  });
});

describe("Feed Card Header", () => {
  it("should open settings modal when settings icon is clicked", () => {
    cy.get("@firstPost")
      .find('[data-cypress="post-settings-button"]')
      .click({ force: true });

    cy.get('[id="post-settings-modal"]').should("be.visible");
  });
  it("should show tooltip when hovering over username", () => {
    cy.get("@firstPost").find('[data-cypress="username"]').realHover();
    cy.wait(500);
    cy.get('[id="user-tooltip"]').should("be.visible");
  });
  it("should navigate to user profile page if username is clicked", () => {
    cy.get("@firstPost").find('[data-cypress="username"]').click();
    cy.url().should("include", "/profile");
  });
  it("should navigate to user profile page if profile picture is clicked", () => {
    cy.get("@firstPost").find('[data-cypress="profile-pic"]').click();
    cy.url().should("include", "/profile");
  });
});
