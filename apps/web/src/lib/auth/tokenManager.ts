let refreshPromise: Promise<string> | null = null;

export function getRefreshPromise() {
  return refreshPromise;
}

export function setRefreshPromise(promise: Promise<string> | null) {
  refreshPromise = promise;
}
