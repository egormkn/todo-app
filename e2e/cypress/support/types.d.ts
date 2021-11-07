/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LogInDto = {
  username: string;
  password: string;
};

type SignUpDto = LogInDto & {
  name: string;
  email: string;
};

type LogInResponse = {
  access_token: string;
};

declare namespace Cypress {
  interface Chainable<Subject = any> {
    logIn(logInDto: LogInDto, failOnStatusCode = true): Chainable<LogInResponse>;
    signUp(signUpDto: SignUpDto, failOnStatusCode = true): Chainable<LogInResponse>;
    authenticate(signUpDto: SignUpDto): Chainable<LogInResponse>;
  }
}
