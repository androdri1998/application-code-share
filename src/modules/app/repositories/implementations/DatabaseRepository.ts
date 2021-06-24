import IDatabaseRepository from '../IDatabaseRepository';
import IDatabase from '../../db/IDatabase';

export default class DatabaseRepository implements IDatabaseRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async beginTransaction(): Promise<void> {
    await this.database.query(`BEGIN`);
  }

  async commit(): Promise<void> {
    await this.database.query(`COMMIT`);
  }

  async rollback(): Promise<void> {
    await this.database.query(`ROLLBACK`);
  }
}
