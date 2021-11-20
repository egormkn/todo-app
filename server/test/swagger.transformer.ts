import * as transformer from '@nestjs/swagger/dist/plugin';
import type { TsCompilerInstance } from 'ts-jest/dist/types';

export const name = 'nestjs-swagger-transformer';
// you should change the version number anytime you change the configuration below - otherwise, jest will not detect changes
export const version = 1;

export const factory = (cs: TsCompilerInstance) => {
  return transformer.before(
    { introspectComments: true },
    cs.program, // "cs.tsCompiler.program" for older versions of Jest (<= v27)
  );
};
