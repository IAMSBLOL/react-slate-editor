module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "standard",
        "standard-react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "legacyDecorators": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react",
        "promise"
    ],
    "rules": {
        "indent": ['error', 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1,
            // MemberExpression: null,
            "FunctionDeclaration": {
              "parameters": 1,
              "body": 1
            },
            "FunctionExpression": {
              "parameters": 1,
              "body": 1
            },
            "CallExpression": {
              "arguments": 1
            },
            "ArrayExpression": 1,
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": false,
            "ignoredNodes": ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            "ignoreComments": false
          }],
        "no-console":"off",
        "no-tabs": "off",
        "no-mixed-spaces-and-tabs": [0],
        "react/jsx-indent": [2, 4],
        "semi": 0,
        "react/no-unused-prop-types": 0,
        "generator-star-spacing": [
            "error",
            {"before": false, "after": true}
        ],
        "comma-dangle": ["error", "only-multiline"]
    }
};