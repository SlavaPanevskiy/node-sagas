import { Step } from './step';
import { Saga } from './saga';
import Factory from './factory';

export class SagaBuilder<T> {
  private currentStep: Step<T>;
  private steps: Step<T>[] = [];
  private factory = new Factory<T>();

  public setFactory(factory: Factory<T>) {
    this.factory = factory;
  }

  public step(name = '') {
    this.currentStep = this.factory.createStep(name);
    this.steps.push(this.currentStep);
    return this;
  }

  public invoke(method: (params: T) => void): this {
    this.currentStep.setInvocation(method);
    return this;
  }

  public withCompensation(method: (params: T) => void): this {
    this.currentStep.setCompensation(method);
    return this;
  }

  public build(): Saga<T> {
    return this.factory.createSaga(this.steps);
  }
}
