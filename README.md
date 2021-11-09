# ToDo App

[![Tests](https://github.com/egormkn/todo-app/actions/workflows/tests.yml/badge.svg)](https://github.com/egormkn/todo-app/actions/workflows/tests.yml)

A fullstack (Angular + NestJS) web application for software testing course at ITMO University

| **[:mortar_board: Homework][homework]** | **[:globe_with_meridians: Live Example][live]** |
| :--------------------: | :-------------------: |

[homework]: https://egormkn.github.io/todo-app "Homework"
[live]: https://egormkn-todo-app.herokuapp.com "Live example"

## Development

##### Client
```bash
cd client
npm install
npm test
npm start
```

##### Server
```bash
cd server
npm install
npm test
npm start
```

##### E2E tests
```bash
cd e2e
npm install
npm test
```

## Deployment

```bash
# Build an image
docker build -t egormkn/todo-app --progress=plain .

# Run an image
docker run -it -p 3000:3000/tcp --rm --name todo-app --init egormkn/todo-app
```
