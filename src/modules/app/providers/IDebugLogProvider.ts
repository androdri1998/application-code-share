/* eslint-disable @typescript-eslint/no-explicit-any */
interface LogDTO {
  params?: any;
  message: string;
}

export default interface IDebugLogProvider {
  essentialsLog({ params, message }: LogDTO): void;
  errorLog({ params, message }: LogDTO): void;
}
