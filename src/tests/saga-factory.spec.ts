import { Saga } from '../saga';
import Factory from '../factory';
import { Step } from '../step';
import { SagaFlow } from '../saga-flow';

describe('Saga factory', () => {
  test('createSaga', () => {
    const sagaFactory = new Factory();

    expect(sagaFactory.createSaga([])).toBeInstanceOf(Saga);
  });

  test('createStep', () => {
    const sagaFactory = new Factory();

    expect(sagaFactory.createStep()).toBeInstanceOf(Step);
  });

  test('createSagaFlow', () => {
    const sagaFactory = new Factory();

    expect(sagaFactory.createSagaFlow([])).toBeInstanceOf(SagaFlow);
  });
});
