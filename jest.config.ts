module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
