/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

interface ResponseQuery {
  response_complete: {
    rows: any[];
  };
  results: any[];
}

interface IDatabase {
  getConnection(): Pool;
  query(sql: string, values?: any[]): Promise<ResponseQuery>;
}
export default IDatabase;
