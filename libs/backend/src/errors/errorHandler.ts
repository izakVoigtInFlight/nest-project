import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class ErrorHandler {
  public handle(error: unknown) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }

    Logger.error(error);

    throw new InternalServerErrorException();
  }
}
