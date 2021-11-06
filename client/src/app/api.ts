import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment';

export const API_PREFIX = new InjectionToken<string>('Prefix of API url', {
  providedIn: 'root',
  factory() {
    return environment.apiPrefix;
  },
});
