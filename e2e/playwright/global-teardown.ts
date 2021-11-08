import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown(config: FullConfig) {
  fs.unlinkSync(path.join(__dirname, 'auth.json'));
}

export default globalTeardown;
