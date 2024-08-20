// jest.config.js
module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  // Optionally add paths to ignore for transformation (e.g., some node_modules)
  transformIgnorePatterns: ["/node_modules/(?!some-module-to-transform).+\\.(js|jsx|ts|tsx)$"]
};
