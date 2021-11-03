import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export const apiPrefix = '/api';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getProfile() {
    const url = `${apiPrefix}/users/@me`;
    return this.http.get(url).pipe(
      tap((value) => {
        console.debug(UsersService.name, value);
      }),
    );
  }
}
