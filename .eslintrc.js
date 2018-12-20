module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-trailing-spaces": "error",
        "no-lonely-if": "error",
        "eol-last": "error",
        "indent": ["error", 4],
        "no-multiple-empty-lines": "error",
        // ES6
        "no-var": "error",
        "prefer-const": "error",
        "arrow-spacing": "error"
    }
};