const app = {
  jwt: { secret: process.env.SECRET, expiresIn: '1h' },
};

export default app;
