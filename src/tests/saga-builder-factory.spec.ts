import { SagaBuilderFactory } from "../saga-builder-factory";
import { SagaParams } from "./saga-params";
import { SagaBuilder } from "../saga-builder";

describe('Saga builder factory', () => {
  test('createSaga', () => {
    const sagaBuilderFactory = new SagaBuilderFactory();

    expect(sagaBuilderFactory.createBuilder<SagaParams>()).toBeInstanceOf(SagaBuilder);
  });
});
