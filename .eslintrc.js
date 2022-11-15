module.exports = {
    root: true,
    parser: '',
    plugins: ['unused-imports', 'import'],
    extends: ['eslint:recommended'],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        allowSyntheticDefaultImports: true,
    },
    rules: {
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'sort-imports': [
            'error',
            {
                ignoreDeclarationSort: true,
            },
        ],
        quotes: ['error', 'single'],
        semi: [0],
        complexity: ['error', 13],
        indent: [0],
        'no-multi-spaces': ['error'],

        'import/extensions': [
            'error',
            'ignorePackages',
            {
                '': 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
}
