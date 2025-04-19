export function isObjectPlain(object: Object) {
  return (
    object &&
    Object.prototype.toString.call(object) === '[object Object]' &&
    Object.getPrototypeOf(object) === Object.prototype
  );
}