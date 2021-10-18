export function pick<T, K extends keyof T>(obj: T, ...props: K[]): Pick<T, K> {
  return props.reduce((result, prop) => ((result[prop] = obj[prop]), result), {} as Pick<T, K>);
}

export function omit<T, K extends keyof T>(obj: T, ...props: K[]): Omit<T, K> {
  return props.reduce((result, prop) => (delete result[prop], result), { ...obj });
}
