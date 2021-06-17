import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './modules/app/routes';
import handleErrors from './modules/app/middlewares/handle-errors';
import DebugLogProvider from './modules/app/providers/implementations/DebugLogProvider';
import messages from './modules/app/intl/messages/en-US';

const app = express();
const debugLogProvider = new DebugLogProvider();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/', routes);

app.use(handleErrors);

app.listen(3333, () => {
  debugLogProvider.essentialsLog({ message: messages.logs.INITIAL_LOG });
});
