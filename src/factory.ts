import { Step } from './step';
import { SagaFlow } from './saga-flow';
import { Saga } from './saga';

export default class Factory<T> {
  public createSaga(steps: Step<T>[]): Saga<T> {
    return new Saga<T>(this.createSagaFlow(steps));
  }

  public createSagaFlow(steps: Step<T>[]): SagaFlow<T> {
    return new SagaFlow<T>(steps);
  }

  public createStep(name = ''): Step<T> {
    return new Step<T>(name);
  }
}
