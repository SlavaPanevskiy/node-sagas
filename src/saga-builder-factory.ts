import { SagaBuilder } from "./saga-builder";

export class SagaBuilderFactory {
  createBuilder<T>(): SagaBuilder<T> {
    return new SagaBuilder<T>()
  }
}
