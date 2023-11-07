export function nest(o, child) {
  return {
    ...o,
    child,
  };
}
