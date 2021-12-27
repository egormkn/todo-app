import fs from 'fs';
import path from 'path';

import LoginPage from '../pageobjects/login.page';

describe('Login page', () => {
  it('opens', async () => {
    await LoginPage.open();
  });

  it('shows error message when user does not exist', async () => {
    await LoginPage.open();
    const username = 'doesnotexist';
    const password = 'doesnotexist';
    await LoginPage.login(username, password);
    await expect(LoginPage.form).toHaveTextContaining(`User "${username}" was not found`);
  });

  describe('when user exists', async () => {
    let user: { username: string; password: string };

    before(() => {
      user = JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures/user.json'), 'utf-8'));
      // token = fs.readFileSync(path.join(__dirname, '../token.txt'), 'utf-8');
      // browser.url('/');
      // browser.execute((token) => window.localStorage.setItem('access_token', token), token);
      // browser.setLocalStorage('access_token', token);
    });

    it('allows user to log in', async () => {
      await LoginPage.open();
      await LoginPage.login(user.username, user.password);
      expect(browser).toHaveUrl('/');
    });
  });
});
