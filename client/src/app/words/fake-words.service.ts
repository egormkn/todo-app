import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class FakeWordsService implements InMemoryDbService {
  createDb() {
    const words = ['cat', 'dog'];
    return { words };
  }
}
