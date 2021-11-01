# ToDo App

A fullstack (Angular + NestJS) web application for software testing course at ITMO University

## Deployment

```bash
# Build an image
docker build -t egormkn/todo-app --progress=plain .

# Run an image
docker run -it -p 3000:3000/tcp --rm --name todo-app --init egormkn/todo-app
```
