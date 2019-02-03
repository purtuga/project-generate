/**
 * Attempts to first see if `@purtuga/project-base` is installed, and if so, then
 * it uses the configuration provided by that project.
 * If not, then a config is generated.
 */
let eslintConfig;
try {
    eslintConfig = require("@purtuga/project-base/configs/eslint.config");
} catch (e) {
    eslintConfig = {
        "extends": [
            "eslint:recommended"
        ],
        "parser": "babel-eslint",
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module"
        },
        "env": {
            "browser": true,
            "node": true,
            "es6": true
        },
        "plugins": [],
        "rules": {
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "comma-dangle": ["error", "never"],
            "func-call-spacing": ["error", "never"],
            "no-trailing-spaces": "error"
        },
        overrides: [
            {
                files: ["*.test.js"],
                globals: {
                    expect: true,
                    sinon: true
                },
                env: {
                    mocha: true
                }
            }
        ]
    };
}

//----------------------------------------------------[ EXPORTS ]-
module.exports = eslintConfig;
