/* eslint-disable @typescript-eslint/no-explicit-any */
import debug from 'debug';

interface LogDTO {
  params?: any;
  message: string;
}

export default class DebugLogProvider {
  private logMessage;

  constructor(key: string) {
    this.logMessage = debug(key);
  }

  log({ params, message }: LogDTO): void {
    this.logMessage(message, params);
  }
}
