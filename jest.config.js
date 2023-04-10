module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@exmpl/(.*)": "dist/src/$1"
    },
};