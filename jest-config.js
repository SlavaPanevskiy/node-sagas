module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".spec.ts$",
  "transformIgnorePatterns": ["/node_modules/"],
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
};
