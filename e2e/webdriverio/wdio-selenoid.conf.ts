import { config as wdioConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
  ...wdioConfig,
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub',
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--no-sandbox', '--headless'],
      },
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless'],
      },
    },
  ],
};
