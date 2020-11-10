export class SagaCompensationFailed extends Error {
  originalError: Error;

  constructor(e: Error) {
    super(e.message);
    this.stack = e.stack;
    this.originalError = e;
  }
}
