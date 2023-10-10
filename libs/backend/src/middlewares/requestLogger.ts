import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function requestLogger(request: Request, response: Response, next: NextFunction): void {
  const startTime = process.hrtime();

  response.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const elapseTimeInMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    const usedMemoryInMb = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    Logger.log(`(${request.method}) ${request.path} | Time: ${elapseTimeInMs} ms | Memory used: ${usedMemoryInMb} MB`);
  });

  next();
}
