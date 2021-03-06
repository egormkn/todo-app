import { INestApplication, INestExpressApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import compression = require('compression')
import * as express from 'express'
import * as nunjucks from 'nunjucks'
import * as path from 'path'
import * as request from 'supertest'
import { Connection } from 'typeorm'
import { AppModule } from '../src/app.module'
import { List } from '../src/tasks/entities/list.entity'
import { Task } from '../src/tasks/entities/task.entity'

const mockList = new List()

export const mockListRepository = {
  find: async () => [mockList],
  findOne: async () => mockList,
  save: async () => mockList
}

const mockTask = new Task()

export const mockTaskRepository = {
  find: async () => [mockTask],
  findOne: async () => mockTask,
  save: async () => mockTask
}

describe('AppController (e2e)', () => {
  let app: INestApplication & INestExpressApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    })
    .overrideProvider(getRepositoryToken(Task))
    .useValue(mockTaskRepository)
    .overrideProvider(getRepositoryToken(List))
    .useValue(mockListRepository)
    .overrideProvider(Connection)
    .useValue({})
    .compile()

    const server = express()

    nunjucks.configure('views', {
      autoescape: true,
      express: server
    })

    app = moduleFixture.createNestApplication(server, {})

    // FIXME: Do we really need to copy setup code from main.ts?
    app.setViewEngine('html')
    app.useStaticAssets(path.join(__dirname, '..', 'public'))
    app.setBaseViewsDir(path.join(__dirname, '..', 'views'))
    app.use(compression())

    app.useGlobalPipes(new ValidationPipe())

    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(301)
      .expect('Location', '/tasks')
  })
})
