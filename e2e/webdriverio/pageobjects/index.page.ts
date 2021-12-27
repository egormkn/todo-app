import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

class IndexPage extends Page {
  public get header(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('header');
  }

  public get main(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return $('main');
  }

  public get headerSignUpLink(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return this.header.$('a*="Sign Up"');
  }

  public get headerLogInLink(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return this.header.$('a*="Log In"');
  }

  public get mainSignUpLink(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return this.main.$('a*="Sign Up"');
  }

  public get mainLogInLink(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return this.main.$('a*="Log In"');
  }

  public get mainImage(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
    return this.main.$('img');
  }

  public open(): Promise<string> {
    return super.open('/');
  }
}

export default new IndexPage();
