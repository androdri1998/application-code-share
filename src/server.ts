import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';

import routes from './modules/app/routes';
import handleErrors from './modules/app/middlewares/handle-errors';
import DebugLogProvider from './modules/app/providers/DebugLogProvider';
import messages from './modules/app/intl/messages/en-US';

const app = express();

app.use(helmet());

app.use('/', routes);

app.use(handleErrors);

app.listen(3333, () => {
  const debugLogProvider = new DebugLogProvider(messages.keys.logs.START_LOG);
  debugLogProvider.log({ message: messages.logs.INITIAL_LOG });
});
