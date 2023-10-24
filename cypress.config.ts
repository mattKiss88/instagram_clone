import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    env: {
      REACT_APP_API_URL:
        process.env.REACT_APP_ENV === "dev"
          ? "http://localhost:8001"
          : "http://api.myinstacloneapp.ninja",
    },
  },
});
