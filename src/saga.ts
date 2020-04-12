import { SagaFlow } from './saga-flow';
import SagaCompensationFailed from './exceptions/saga-compensation-failed';
import SagaExecutionFailed from './exceptions/saga-exuction-failed';

export enum SagaStates {
  New = 'New',
  InProgress = 'In progress',
  InCompensation = 'In compensation',
  Complete = 'Complete',
  CompensationComplete = 'Compensation complete',
  CompensationError = 'Compensation error',
}

export class Saga<T> {
  private sagaFlow: SagaFlow<T>;

  private state: string;
  private invokeError: Error;
  private compensationError: Error;

  constructor(sagaFlow: SagaFlow<T>) {
    this.sagaFlow = sagaFlow;
    this.state = SagaStates.New;
  }

  public getState(): string {
    return this.state;
  }

  public async execute(params: T): Promise<T> {
    this.state = SagaStates.InProgress;
    try {
      await this.sagaFlow.invoke(params);
      this.state = SagaStates.Complete;

      return params;
    } catch (e) {
      this.state = SagaStates.InCompensation;
      this.invokeError = e;
      await this.runCompensationFlow(params);
      throw new SagaExecutionFailed(e);
    }
  }

  private async runCompensationFlow(params: T): Promise<void> {
    try {
      await this.sagaFlow.compensate(params);
      this.state = SagaStates.CompensationComplete;
    } catch (e) {
      this.state = SagaStates.CompensationError;
      this.compensationError = e;
      throw new SagaCompensationFailed(e);
    }
  }
}
