/* eslint-disable @typescript-eslint/no-empty-function */
import IDatabaseRepository from '../IDatabaseRepository';
import IDatabase from '../../db/IDatabase';

export default class FakeDatabaseRepository implements IDatabaseRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async beginTransaction(): Promise<void> {}

  async commit(): Promise<void> {}

  async rollback(): Promise<void> {}
}
