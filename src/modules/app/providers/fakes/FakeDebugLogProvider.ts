/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import IDebugLogProvider from '../IDebugLogProvider';

interface LogDTO {
  params?: any;
  message: string;
}

export default class FakeDebugLogProvider implements IDebugLogProvider {
  essentialsLog({ params, message }: LogDTO): void {
    console.log(message, params);
  }

  errorLog({ params, message }: LogDTO): void {
    console.log(message, params);
  }
}
