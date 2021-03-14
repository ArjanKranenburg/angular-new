// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './features/**/*.feature'
  ],
  capabilities: {
    browserName: 'chrome',
    args: ['no-sandbox']
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4401/',
  framework: 'custom',
  frameworkPath: '../node_modules/protractor-cucumber-framework',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  cucumberOpts: {
    require: [
      './steps/**/*.steps.ts'
    // ],
    // format: [
    //   'json:test-reports/cucumber-test-results.json'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // jasmine.getEnv().addReporter(new SpecReporter({
    //   spec: {
    //     displayStacktrace: StacktraceOption.PRETTY
    //   }
    // }));
  }
};