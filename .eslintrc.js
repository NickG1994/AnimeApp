module.exports = {

    extends: [

        '@nuxtjs/eslint-config',

        'plugin:@typescript-eslint/recommended',

    ],

    rules: {

        // Add custom rules as needed
        "prettier/prettier": "error"
    },

    overrides: [

        {

            files: ['*.vue'],

            parser: 'vue-eslint-parser',

            parserOptions: {

                parser: '@typescript-eslint/parser',

            },

        },

    ],

};
