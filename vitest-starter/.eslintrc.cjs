const vitest = require('eslint-plugin-vitest');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:vitest/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn', // warning, not error
    'vitest/expect-expect': 'off', // eliminate distracting red squiggles while writing tests
    'react/prop-types': 'off', // turn off props validation
  },
  globals: {
    ...vitest.environments.env.globals,
  },
  test: {
    /**
     * include를 사용해 프로젝트에서 테스트파일을
     * __test__ 디렉토리에 모아놓고,
     * 타입스크립트만 사용하며,
     * 파일명에 .spec.이 포함되어야한다면
     * 아래처럼 Glob패턴을 사용하여 설정
     */
    include: ['__test__/*.spec.ts?(x)'],
    /**
     * vitest에서 사용하는 함수들을 import하지 않고 글로벌로 선언
     */
    globals: true,
  },
};
