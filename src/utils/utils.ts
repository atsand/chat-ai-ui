export function isObjectPlain(object: object) {
  return (
    object &&
    Object.prototype.toString.call(object) === '[object Object]' &&
    Object.getPrototypeOf(object) === Object.prototype
  );
}