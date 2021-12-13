# ToDo App

[![CI](https://github.com/egormkn/todo-app/actions/workflows/workflow.yml/badge.svg)](https://github.com/egormkn/todo-app/actions/workflows/workflow.yml)

A fullstack (Angular + NestJS) web application for software testing course at ITMO University

#### :mortar_board: [Homework][homework]
##### :globe_with_meridians: [Live Example][live]
##### :blue_book: Documentation: [Client][docs-client] / [Server][docs-server]
##### :bar_chart: Test Coverage: [Client][coverage-client] / [Server][coverage-server]
##### :bar_chart: Allure report: [Client][allure-client]

[homework]: https://egormkn.github.io/todo-app/docs "Homework"
[live]: https://egormkn-todo-app.herokuapp.com "Live example"
[allure-client]: https://egormkn.github.io/todo-app/allure/client "Client Allure report"
[coverage-client]: https://egormkn.github.io/todo-app/coverage/client "Client code coverage"
[coverage-server]: https://egormkn.github.io/todo-app/coverage/server "Server code coverage"
[docs-client]: https://egormkn.github.io/todo-app/docs/client "Client documentation"
[docs-server]: https://egormkn.github.io/todo-app/docs/server "Server documentation"

---

## Development

- Clone the repository:

  ```bash
  git clone https://github.com/egormkn/todo-app.git
  cd todo-app
  ```

- Build client:
  ```bash
  cd client
  npm install
  npm test
  npm start
  ```

- Build server:
  ```bash
  cd server
  npm install
  npm test
  npm start
  ```

- Run end-to-end tests:
  ```bash
  cd e2e
  npm install
  npm test
  ```

See more in the [GitHub Actions workflow file][workflow].

[workflow]: .github/workflows/workflow.yml

## Deployment

Build an image from the Dockerfile:
```bash
docker build -t egormkn/todo-app --progress=plain .

docker run -it -p 3000:3000/tcp --rm --name todo-app --init egormkn/todo-app
```

Or use a prebuilt image from GitHub registry:
```bash
docker pull ghcr.io/egormkn/todo-app:latest
```