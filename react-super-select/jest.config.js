module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/tests"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

