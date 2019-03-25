module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: "3",
        modules: false,
        targets: {
          browsers: [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 1 Safari version",
            "last 1 Edge version",
            "not dead"
          ],
          electron: "1.8",
          node: true
        },
        shippedProposals: true,
        useBuiltIns: "usage"
      }
    ],
    "@babel/react",
    "@babel/flow",
    "react-app"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: false
      }
    ],
    [
      "flow-runtime",
      {
        annotate: false,
        assert: true,
        warn: true
      }
    ],
    "transform-flow-strip-types"
  ]
};
