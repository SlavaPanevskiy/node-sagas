export class SagaExecutionFailed extends Error {
  originalError: Error;

  constructor(e: Error) {
    super(e.message);
    this.stack = e.stack;
    this.originalError = e;
  }
}
