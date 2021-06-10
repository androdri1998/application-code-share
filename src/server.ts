import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';
import handleErrors from './middlewares/handle-errors';
import DebugLogProvider from './providers/DebugLogProvider';
import messages from './intl/messages/en-US';

const app = express();

app.use(helmet());

app.use('/', routes);

app.use(handleErrors);

app.listen(3333, () => {
  const debugLogProvider = new DebugLogProvider(messages.keys.logs.START_LOG);
  debugLogProvider.log({ message: messages.logs.INITIAL_LOG });
});
