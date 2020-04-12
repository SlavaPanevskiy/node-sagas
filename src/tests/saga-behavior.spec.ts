import { SagaBuilder } from '../saga-builder';
import { SagaStates } from '../saga';
import { SagaParams } from './saga-params';
import SagaCompensationFailed from '../exceptions/saga-compensation-failed';
import SagaExecutionFailed from '../exceptions/saga-exuction-failed';

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

    try {
      await saga.execute(new SagaParams());
    } catch (e) {
      if (e instanceof SagaExecutionFailed) {
        // Error handling
      }
      if (e instanceof SagaCompensationFailed) {
        // Error handling
      }
    }

    expect(saga.getState()).toBe(SagaStates.CompensationComplete);
  });
});
