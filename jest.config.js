export default {
    preset: 'ts-jest', // ✅ Indique qu'on utilise TypeScript
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // ✅ Transforme les fichiers TypeScript
      '^.+\\.jsx?$': 'babel-jest', // ✅ Transforme les fichiers ES6/ESNext
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // ✅ Gère les fichiers CSS
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // ✅ Charge les configs Jest
  };
  