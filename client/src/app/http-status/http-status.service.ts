import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Injectable({ providedIn: 'root' })
export class HttpStatusService {
  constructor(@Optional() @Inject(RESPONSE) private res: Response) {}

  public setStatus(code: number): void {
    if (this.res) {
      this.res.status(code);
    }
  }
}
