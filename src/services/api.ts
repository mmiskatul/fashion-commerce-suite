// Mock API client. Swap with fetch() to FastAPI when backend is ready.
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function apiGet<T>(_path: string, data: T): Promise<T> {
  await delay();
  return data;
}
export async function apiPost<T>(_path: string, _body: unknown, data: T): Promise<T> {
  await delay();
  return data;
}
