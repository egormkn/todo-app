import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpServer,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class AngularUniversalFilter
  extends BaseExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
  constructor(
    private readonly indexHtml: string,
    private readonly APP_BASE_HREF: any,
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const { indexHtml, APP_BASE_HREF } = this;
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  }
}
