export function assert(ok: boolean | any, description?: string) {
  if (!ok) {
    throw new AssertionError(description)
  }
}

export class AssertionError extends Error {
  
}