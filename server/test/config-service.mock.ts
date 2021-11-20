export const mockedConfigService = (values: Record<string, any>) => ({
  get<T>(key: string, value?: T) {
    return values[key] ?? value;
  },
});
