const app = {
  jwt: { secret: process.env.SECRET, expiresIn: '1h' },
  database: {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
  },
};

export default app;
