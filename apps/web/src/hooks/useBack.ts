export function useBack(fallback = "/") {
  return () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = fallback;
    }
  };
}