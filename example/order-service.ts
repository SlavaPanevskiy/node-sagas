// @ts-nocheck
import { CreateOrderSagaParams } from './create-order-saga-params';
import SagaExecutionFailed from '../exceptions/saga-exuction-failed';
import SagaCompensationFailed from '../exceptions/saga-compensation-failed';

export class OrderService {
  private getCreateOrderSagaDefinition(): Saga<CreateOrderSagaParams> {
    const sagaBuilder = new SagaBuilder<CreateOrderSagaParams>();
    return sagaBuilder
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // create order logic
      })
      .withCompensation((params: CreateOrderSagaParams) => {
        // reject order logic
      })
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // reserve credit
      })
      .step()
      .invoke((params: CreateOrderSagaParams) => {
        // approve order
      })
      .build();
  }

  private async executeSaga(
    params: CreateOrderSagaParams,
  ): CreateOrderSagaParams {
    const saga = this.getCreateOrderSagaDefinition();
    try {
      return await saga.execute(params);
    } catch (e) {
      if (e instanceof SagaExecutionFailed) {
        // Error handling
      }
      if (e instanceof SagaCompensationFailed) {
        // Error handling
      }
    }
  }

  public createOrder() {
    const sagaParams = new CreateOrderSagaParams();
    this.executeSaga(sagaParams);
    return orderRepository.findById(sagaParams.getOrderId()).get();
  }
}
