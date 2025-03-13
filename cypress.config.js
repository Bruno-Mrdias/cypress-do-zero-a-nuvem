const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "met3aj",
  e2e: {
    
    // viewportHeight: 880,
    // viewportWidth: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // video: true
});
