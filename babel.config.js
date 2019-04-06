module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: {
          browsers: [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 1 Safari version",
            "last 1 Edge version"
          ],
          electron: "1.8",
          node: true
        },
        useBuiltIns: false
      }
    ],
    [
      "react-app",
      {
        flow: true
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "flow-runtime",
      {
        annotate: false,
        assert: true,
        warn: true
      }
    ]
  ]
};
