module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: 1
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreStrings: true
      }
    ],
    'space-before-function-paren': ['error', 'never'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true
    }],
    'vue/v-on-function-call': ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
