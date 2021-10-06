module.exports = {
	root: true,

	parser: "@typescript-eslint/parser",

	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",

		ecmaFeatures: {
			jsx: true,
		},
	},

	settings: {
		react: {
			version: "detect",
		},
		polyfills: ["fetch"],
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},

	env: {
		browser: true,
	},

	extends: [
		"@react-native-community",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint", // Disables rules that conflict between ESlint and Prettier
		"plugin:compat/recommended", // Lints browser compatibility
		"plugin:react-hooks/recommended",
		"plugin:unicorn/recommended",
		"plugin:security/recommended",
		"plugin:styled-components-a11y/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:import/recommended",
		"plugin:prettier/recommended",
	],

	plugins: [
		"babel",
		"react-native",
		"@typescript-eslint",
		"simple-import-sort",
		"deprecate",
		"unicorn",
		"security",
		"styled-components-a11y",
		"jsx-a11y",
	],

	rules: {
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": [
			"error",
			{
				groups: [["^@?\\w"], ["^[^.]"], ["^\\."], ["^\\u0000"]],
			},
		],
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-duplicates": "error",
		"no-restricted-imports": [
			"error",
			{
				paths: [
					{
						name: "styled-components",
						message: "Please import from styled-components/macro.",
					},
				],

				patterns: ["!styled-components/macro"],
			},
		],
		"unicorn/filename-case": 0,
		"unicorn/consistent-function-scoping": 0,
		"security/detect-non-literal-fs-filename": 0,
		"security/detect-unsafe-regex": 0,
		"unicorn/no-array-reduce": 0,
		"unicorn/no-for-loop": 0,
		"unicorn/no-useless-undefined": 0, // @jademugs like this rules.
		"unicorn/no-new-array": 0, //HACK: this conflicts with unicorn/new-for-builtins
		"unicorn/no-abusive-eslint-disable": 0, //TODO: FIND A BETTER WAY. PLEASE.
		"unicorn/prefer-module": 0,
		"unicorn/prevent-abbreviations": [
			"error",
			{
				allowList: {
					env: true,
					props: true,
					ref: true,
				},
			},
		],
		"security/detect-object-injection": 0,
		"compat/compat": 0,
	},
};
