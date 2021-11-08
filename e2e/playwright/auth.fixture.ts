import { expect, request, test as base } from '@playwright/test';

type User = {
  username: string;
  password: string;
  name: string;
  email: string;
};

const test = base.extend<{ user: User; token: string }>({
  user: {
    username: 'testuser',
    password: 'password',
    name: 'Test User',
    email: 'test@example.com',
  },
  token: async ({ user, baseURL }, use) => {
    const { username, password } = user;
    const context = await request.newContext();
    const response = await context.post(`${baseURL}/api/auth/login`, {
      data: { username, password },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    const token = body['access_token'];

    await use(token);

    await context.dispose();
  },
});

export default test;
