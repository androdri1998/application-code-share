/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

interface IDatabase {
  getConnection(): Pool;
  query(sql: string, values?: any[]): Promise<any>;
}
export default IDatabase;
