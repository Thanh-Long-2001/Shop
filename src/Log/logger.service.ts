import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';

@Injectable()
export class Logger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error(message);
  }

  log(message: any, context?: string) {
    super.log(message, context);
  }
}
