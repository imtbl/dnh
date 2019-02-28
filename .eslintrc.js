const typescriptEslintRecommended = require(
  '@typescript-eslint/eslint-plugin/dist/configs/recommended'
)

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      /*
       * Workaround for nested `extends`.
       * See https://github.com/eslint/eslint/issues/8813
       */
      rules: Object.assign(
        typescriptEslintRecommended.rules,
        { '@typescript-eslint/indent': ['error', 2] }
      )
    }
  ]
}
