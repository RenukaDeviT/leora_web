module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', '@emotion'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [1, 'always-multiline'],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-restricted-syntax': 0,
    'react/no-array-index-key': 0,
    'eslint/no-shadow': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-continue': 0,
    'eslint/no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/no-unescaped-entities': 0,
    'no-console': 'off',
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
