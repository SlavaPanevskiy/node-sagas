export default class SagaExecutionFailed extends Error {
  constructor(e: Error) {
    super(e.message);
    this.stack = e.stack;
  }
}
