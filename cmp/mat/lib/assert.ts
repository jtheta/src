export class MatrixAssertionError extends Error {
  
}
export function assert(ok: boolean | any, description?: string) {
  if (!ok) {
    throw new MatrixAssertionError(description)
  }
}
