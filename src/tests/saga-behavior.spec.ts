import { SagaBuilder } from '../saga-builder';
import { SagaStates } from '../saga';
import { SagaParams } from './saga-params';
import { SagaExecutionFailed } from '../exceptions';

describe('Saga functionality', () => {
  it('should build and execute saga with invocation steps', async () => {
    const sagaBuilder = new SagaBuilder<SagaParams>();
    const saga = sagaBuilder
      .step()
      .invoke((params: SagaParams) => params.setParam(1))
      .step()
      .invoke((params: SagaParams) => params.setParam(2))
      .step()
      .invoke((params: SagaParams) => params.setParam(3))
      .build();

    const result = await saga.execute(new SagaParams());
    expect(result.getParam()).toEqual(3);
    expect(saga.getState()).toBe(SagaStates.Complete);
  });

  it('should build and execute saga with compensation steps', async () => {
    const sagaBuilder = new SagaBuilder<SagaParams>();
    const saga = sagaBuilder
      .step()
      .invoke((params: SagaParams) => params.setParam(1))
      .withCompensation((params: SagaParams) => params.setParam(4))
      .step()
      .invoke((params: SagaParams) => params.setParam(2))
      .step()
      .invoke((params: SagaParams) => {
        params.setParam(3);
        throw new Error();
      })
      .build();

    await expect(saga.execute(new SagaParams())).rejects.toThrow(
      SagaExecutionFailed,
    );
    expect(saga.getState()).toBe(SagaStates.CompensationComplete);
  });
});
