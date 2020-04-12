import { CreateOrderSagaParams } from './create-order-saga-params';

export class CreateOrderSaga {
  private sagaParams: CreateOrderSagaParams;

  constructor(sagaParams: CreateOrderSagaParams) {
    this.sagaParams = sagaParams;
  }
}
