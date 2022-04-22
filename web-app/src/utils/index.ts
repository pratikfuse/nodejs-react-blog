export async function withError<T = any>(
  promise: Promise<T>
): Promise<Array<any>> {
  try {
    const res = await promise;
    return [null, res];
  } catch (e: any) {
    return [e];
  }
}
