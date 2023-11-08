export function nest(o: Object, child: Object): Object {
  return {
    ...o,
    child,
  };
}
