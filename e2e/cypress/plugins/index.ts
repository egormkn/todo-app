// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
// ***********************************************************

import * as dotenv from 'dotenv';

dotenv.config();

/**
 * This function is called when a project is opened or re-opened
 * (e.g. due to the project's config changing)
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  config.env.auth_username = process.env.AUTH_USERNAME;
  config.env.auth_password = process.env.AUTH_PASSWORD;
  config.env.auth_name = process.env.AUTH_NAME;
  config.env.auth_email = process.env.AUTH_EMAIL;
  return config;
};
