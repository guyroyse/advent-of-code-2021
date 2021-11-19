export default {
  roots: [ "<rootDir>/lib/", "<rootDir>/spec/" ],
  setupFilesAfterEnv: [ "./spec/spec.helper.js" ],
  testMatch: [ "**/*.spec.js" ],
  transform: {}
}
