import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  public get form(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('form');
  }

  public get inputUsername(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('form input[name="username"]');
  }

  public get inputPassword(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('form input[name="password"]');
  }

  public get buttonSubmit(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('form button[type="submit"]');
  }

  public async login(username: string, password: string): Promise<void> {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.buttonSubmit.click();
  }

  public open(): Promise<string> {
    return super.open('/auth/login');
  }
}

export default new LoginPage();
