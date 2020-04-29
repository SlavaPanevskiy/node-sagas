import { Step } from '../step';
import { SagaParams } from './saga-params';

describe('Step', () => {
  test('construct', () => {
    const step = new Step();

    expect(step).toBeInstanceOf(Step);
  });

  test('getName', () => {
    const stepName = 'My step';
    const step = new Step(stepName);

    expect(step.getName()).toEqual(stepName);
  });

  test('invoke', async () => {
    const step = new Step<SagaParams>();
    const invocationMethod = jest.fn();
    step.setInvocation(invocationMethod);
    const params = new SagaParams();

    await step.invoke(params);

    expect(invocationMethod).toHaveBeenCalledWith(params);
  });

  test('compensation', async () => {
    const step = new Step<SagaParams>();
    const compensationMethod = jest.fn();
    step.setCompensation(compensationMethod);
    const params = new SagaParams();

    await step.compensate(params);

    expect(compensationMethod).toHaveBeenCalledWith(params);
  });
});
