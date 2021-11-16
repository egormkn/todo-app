import { MethodNames, PropertyNames } from './utilities';

function normalize<T>(
  collection: Array<keyof any> | Record<keyof any, T>,
): Array<[keyof any] | [keyof any, T]> {
  return Array.isArray(collection) ? collection.map((n) => [n]) : Object.entries<T>(collection);
}

export function createMockObj<T>(
  methodNames?: MethodNames<T>[],
  propertyNames?: PropertyNames<T>[],
): jest.Mocked<T> {
  const obj = {} as jest.Mocked<T>;

  const methods = normalize<(...args: any) => any>(methodNames ?? []);
  for (const [method, value] of methods) {
    obj[method as keyof T] = jest.fn(value) as any;
  }

  const properties = normalize<any>(propertyNames ?? []);
  for (const [property, value] of properties) {
    obj[property as keyof T] = jest.fn(value) as any;
    const descriptor = {
      enumerable: true,
      get: jest.fn(),
      set: jest.fn(),
    };
    Object.defineProperty(obj, property, descriptor);
  }

  return obj;
}
