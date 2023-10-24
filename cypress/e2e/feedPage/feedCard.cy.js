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
      .find('[data-cy="view-post-button"]')
      .click({ force: true });

    cy.get('[data-cy="post-modal"]').should("be.visible");
  });
  describe("Post like Functionality", () => {
    it("should increment the likes count when the like button is pressed", () => {
      cy.intercept("POST", "/post/like").as("apiCheck");

      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cy="like-count"]')
        .invoke("text")
        .then((text) => {
          const initialLikes = parseInt(text, 10);

          // Click the "Like" button
          cy.get("@firstPost")
            .find('[data-cy="like-button"]')
            .click({ force: true });

          // Assert that the likes count increased by 1
          cy.get("@firstPost")
            .find('[data-cy="like-count"]')
            .invoke("text")
            .should((newText) => {
              const newLikes = parseInt(newText, 10);
              expect(newLikes).to.eq(initialLikes + 1);
            });
        });

      cy.wait("@apiCheck").should((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
    it("should decrement the likes count when the like button is pressed if the post has been previously liked", () => {
      cy.intercept("POST", "/post/like").as("apiCheck");

      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cy="like-count"]')
        .invoke("text")
        .then((text) => {
          const initialLikes = parseInt(text, 10);

          // Click the "Like" button
          cy.get("@firstPost")
            .find('[data-cy="like-button"]')
            .click({ force: true });

          // Click the "Like" button after it has been liked

          cy.get("@firstPost")
            .find('[data-cy="like-button"]')
            .click({ force: true });

          // Assert that the likes count increased by 1
          cy.get("@firstPost")
            .find('[data-cy="like-count"]')
            .invoke("text")
            .should((newText) => {
              const newLikes = parseInt(newText, 10);
              expect(newLikes).to.eq(initialLikes);
            });
        });

      // Assert that the API was called twice

      cy.wait("@apiCheck").should((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });

      cy.wait("@apiCheck").should((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
    it("should increment like count when picture is double tapped and fill heart icon", () => {
      cy.intercept("POST", "/post/like").as("apiCheck");

      // Get the initial likes count
      cy.get("@firstPost")
        .find('[data-cy="like-count"]')
        .invoke("text")
        .then((initialLikesText) => {
          const initialLikes = parseInt(initialLikesText, 10);

          // Check if the heart icon is already active and decrement count if so
          cy.get("@firstPost")
            .find('[data-cy="like-button"]')
            .invoke("attr", "class")
            .then((classValue) => {
              if (classValue.includes("active")) {
                cy.get("@firstPost")
                  .find('[data-cy="like-button"]')
                  .click({ force: true });

                return initialLikes - 1; // Decrement the likes if active
              }
              return initialLikes; // Return initial likes if not active
            })
            .then((likesToCompare) => {
              // Double click the image to simulate the 'like'
              cy.get("@firstPost")
                .find('[data-cy="feed-image"]')
                .dblclick({ force: true });

              // Assert that the likes count increased by 1
              cy.get("@firstPost")
                .find('[data-cy="like-count"]')
                .invoke("text")
                .should((newLikesText) => {
                  const newLikes = parseInt(newLikesText, 10);
                  expect(newLikes).to.eq(likesToCompare + 1);
                });

              // Assert that the heart icon is filled
              cy.get("@firstPost")
                .find('[data-cy="like-button"]')
                .should("have.class", "activeHeart");

              cy.wait("@apiCheck").should((interception) => {
                expect(interception.response.statusCode).to.eq(201);
              });
            });
        });
    });
  });
  describe("Post comment Functionality", () => {
    it("should add a comment under post description", () => {
      cy.intercept("POST", "/comment/*").as("apiCheck");

      cy.get("@firstPost")
        .find('textarea[name="comment-box"]')
        .type("This is a test comment{enter}");

      cy.get("@firstPost").find('[data-cy="comment"]').should("be.visible");

      cy.wait("@apiCheck").should((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        expect(interception.response.body.comment).to.eq(
          "This is a test comment"
        );
      });
    });
    it("should add a comment including emojis under post description", () => {
      cy.intercept("POST", "/comment/*").as("apiCheck");
      cy.get("@firstPost")
        .find('[data-cy="emoji-button"]')
        .click({ force: true });

      cy.get("em-emoji-picker")
        .shadow()
        .find('button[title="Grinning Face"]')
        .click({ multiple: true });

      cy.get("@firstPost")
        .find('[data-cy="submit-comment-button"]')
        .click({ force: true });

      cy.get("@firstPost").find('[data-cy="comment"]').should("be.visible");

      cy.wait("@apiCheck").should((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
  });
  it("should not POST comment if comment box is empty", () => {
    let requestMade = false;
    cy.intercept("POST", "/comment/*", () => {
      request = true;
    }).as("apiCheck");

    cy.get("@firstPost")
      .find('[data-cy="submit-comment-button"]')
      .click({ force: true });

    // Assert that the API was not called

    cy.wait(1000).should(() => {
      expect(requestMade).to.be.false;
    });
  });
});

describe("Feed Card Header", () => {
  it("should open settings modal when settings icon is clicked", () => {
    cy.get("@firstPost")
      .find('[data-cy="post-settings-button"]')
      .click({ force: true });

    cy.get('[id="post-settings-modal"]').should("be.visible");
  });
  it("should show tooltip when hovering over username", () => {
    cy.get("@firstPost").find('[data-cy="username"]').realHover();
    cy.wait(500);
    cy.get('[id="user-tooltip"]').should("be.visible");
  });
  it("should navigate to user profile page if username is clicked", () => {
    cy.get("@firstPost").find('[data-cy="username"]').click();
    cy.url().should("include", "/profile");
  });
  it("should navigate to user profile page if profile picture is clicked", () => {
    cy.get("@firstPost").find('[data-cy="profile-pic"]').click();
    cy.url().should("include", "/profile");
  });
});
