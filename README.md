# Words App

A fullstack (Angular + NestJS) web application for software testing course at ITMO University

## Development

```bash
# Build an image
docker build -t egormkn/words-app --progress=plain .

# Run an image
docker run -it -p 3000:3000/tcp --rm --name words-app --init egormkn/words-app
```
