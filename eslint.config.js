// filepath: d:\Tech\DevSecOps\DevSecOps\eslint.config.js
export default [
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
      },
    },
  ];