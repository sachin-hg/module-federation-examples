module.exports = {
  env: {
    "web": {
      "presets": [
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            useBuiltIns: 'entry',
            corejs: 'core-js@3',
            targets: {
              "browsers": [
                "last 4 versions",
                "not ie <= 12"
              ]
            },
            modules: false
          }
        ]
      ]
    },
    "node": {
      "presets": [
        "@babel/preset-react",
        [
          "@babel/preset-env",
          {
            useBuiltIns: undefined,
            corejs: false,
            targets: {
              node: 'current'
            },
            modules: false
          }
        ]
      ]
    }
  },
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings",
    "@loadable/babel-plugin"
  ]
}


