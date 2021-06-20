/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

import config from '../../../config/app';

const databaseSet = () => {
  const pool = new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: Number(config.database.port),
  });

  const getConnection = () => {
    return pool;
  };

  const query = async (sql: string, values?: any[]): Promise<any> => {
    const client = await pool.connect();

    let response = { rows: [] };

    try {
      response = await client.query(sql, values);
    } finally {
      client.release();
    }

    return { response_complete: response, results: response.rows };
  };

  return {
    getConnection,
    query,
  };
};

const database = databaseSet();

export default database;
