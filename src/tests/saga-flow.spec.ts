import { Step } from '../step';
import { SagaParams } from './saga-params';
import { SagaFlow } from '../saga-flow';

const expectInvokeBehavior = (stepMock, sagaParams) => {
  expect(stepMock.invoke).toHaveBeenCalledTimes(1);
  expect(stepMock.invoke).toHaveBeenCalledWith(sagaParams);
};

const expectStepsBehavior = (stepMock1, stepMock2, sagaParams) => {
  expectInvokeBehavior(stepMock1, sagaParams);
  expect(stepMock1.compensate).toHaveBeenCalledTimes(1);
  expect(stepMock1.compensate).toHaveBeenCalledWith(sagaParams);

  expectInvokeBehavior(stepMock2, sagaParams);
  expect(stepMock2.compensate).toHaveBeenCalledTimes(1);
  expect(stepMock2.compensate).toHaveBeenCalledWith(sagaParams);
};

describe('Saga Flow', () => {
  test('construct', () => {
    const sagaFlow = new SagaFlow();

    expect(sagaFlow).toBeInstanceOf(SagaFlow);
  });

  test('invoke with empty steps', async () => {
    const sagaFlow = new SagaFlow();
    const params = {};

    await expect(sagaFlow.invoke(params)).resolves.toBeUndefined();
  });

  test('compensate with empty steps', async () => {
    const sagaFlow = new SagaFlow();
    const params = {};

    await expect(sagaFlow.compensate(params)).resolves.toBeUndefined();
  });

  test('execute with positive flow', async () => {
    const executionOrder = [];
    const stepMock1 = new Step<SagaParams>();
    stepMock1.invoke = jest.fn(async () => {
      executionOrder.push(1);
    });
    const stepMock2 = new Step<SagaParams>();
    stepMock2.invoke = jest.fn(async () => {
      executionOrder.push(2);
    });

    const saga = new SagaFlow([stepMock1, stepMock2]);
    const sagaParams = new SagaParams();

    await saga.invoke(sagaParams);

    expectInvokeBehavior(stepMock1, sagaParams);
    expectInvokeBehavior(stepMock2, sagaParams);
    expect(executionOrder).toEqual([1, 2]);
  });

  test('execute with compensation flow', async () => {
    const executionOrder = [];
    const stepMock1 = new Step<SagaParams>();
    stepMock1.invoke = jest.fn(async () => {
      executionOrder.push(1);
    });
    stepMock1.compensate = jest.fn(async () => {
      executionOrder.push(4);
    });
    const stepMock2 = new Step<SagaParams>();
    stepMock2.invoke = jest.fn(() => {
      executionOrder.push(2);
      return Promise.reject(new Error());
    });
    stepMock2.compensate = jest.fn(async () => {
      executionOrder.push(3);
    });

    const sagaParams = new SagaParams();
    const saga = new SagaFlow([stepMock1, stepMock2]);

    await expect(saga.invoke(sagaParams)).rejects.toEqual(new Error());
    await saga.compensate(sagaParams);

    expectStepsBehavior(stepMock1, stepMock2, sagaParams);
    expect(executionOrder).toEqual([1, 2, 3, 4]);
  });

  test('execute with errors in compensation flow', async () => {
    const executionOrder = [];
    const stepMock1 = new Step<SagaParams>();
    stepMock1.invoke = jest.fn(async () => {
      executionOrder.push(1);
    });
    stepMock1.compensate = jest.fn(() => {
      executionOrder.push(4);
      throw new Error();
    });
    const stepMock2 = new Step<SagaParams>();
    stepMock2.invoke = jest.fn(() => {
      executionOrder.push(2);
      throw new Error();
    });
    stepMock2.compensate = jest.fn(async () => {
      executionOrder.push(3);
    });

    const sagaParams = new SagaParams();
    const saga = new SagaFlow([stepMock1, stepMock2]);

    await expect(saga.invoke(sagaParams)).rejects.toEqual(new Error());
    await expect(saga.compensate(sagaParams)).rejects.toEqual(new Error());
    expectStepsBehavior(stepMock1, stepMock2, sagaParams);
    expect(executionOrder).toEqual([1, 2, 3, 4]);
  });
});
