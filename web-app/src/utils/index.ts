export const withError = <T = any>(promise: Promise<T>) =>
  promise.then((res) => [null, res]).catch((e) => [e]);
