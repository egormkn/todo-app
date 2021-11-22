import { ConnectionOptions } from 'typeorm';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from 'testcontainers';

export interface TestDatabase {
  readonly isContainerized: boolean;
  getConnectionOptions(): ConnectionOptions;
  stop(): Promise<void>;
}

export async function getTestDatabase(): Promise<TestDatabase> {
  if (process.env.USE_TESTCONTAINERS) {
    return PostgresqlContainerDatabase.start();
  } else {
    return SqliteInMemoryDatabase.start();
  }
}

export class PostgresqlContainerDatabase implements TestDatabase {
  private constructor(private container: StartedPostgreSqlContainer) {}

  readonly isContainerized = true;

  static async start() {
    const container = await new PostgreSqlContainer().start();
    return new PostgresqlContainerDatabase(container);
  }

  getConnectionOptions(): ConnectionOptions {
    return {
      type: 'postgres',
      host: this.container.getHost(),
      port: this.container.getPort(),
      database: this.container.getDatabase(),
      username: this.container.getUsername(),
      password: this.container.getPassword(),
    };
  }

  async stop(): Promise<void> {
    await this.container.stop();
  }
}

export class SqliteInMemoryDatabase implements TestDatabase {
  private constructor() {}

  readonly isContainerized = false;

  static async start() {
    return new SqliteInMemoryDatabase();
  }

  getConnectionOptions(): ConnectionOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async stop(): Promise<void> {}
}
