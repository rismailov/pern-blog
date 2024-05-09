/** @type {import('ts-jest/dist/types').TsJestCompileOptions} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
