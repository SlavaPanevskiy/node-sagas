export default class SagaCompensationFailed extends Error {
  constructor(e: Error) {
    super(e.message);
    this.stack = e.stack;
  }
}
