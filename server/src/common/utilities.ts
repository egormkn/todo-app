export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type MethodNames<T> = keyof {
  [K in keyof T as T[K] extends (...args: any) => any ? K : never]: unknown;
};

export type PropertyNames<T> = keyof {
  [K in keyof T as T[K] extends (...args: any) => any ? never : K]: unknown;
};

export function pick<T, K extends keyof T>(obj: T, ...props: K[]): Pick<T, K> {
  return props.reduce((result, prop) => ((result[prop] = obj[prop]), result), {} as Pick<T, K>);
}

export function omit<T, K extends keyof T>(obj: T, ...props: K[]): Omit<T, K> {
  return props.reduce((result, prop) => (delete result[prop], result), { ...obj });
}
