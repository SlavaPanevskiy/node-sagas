// @ts-nocheck
import { CreateOrderSagaParams } from './create-order-saga-params';
import { CreateOrderSaga } from './create-order-saga';

class OrderService {
  public async createOrder() {
    const sagaParams = new CreateOrderSagaParams();
    const saga = new CreateOrderSaga();
    await saga.execute(sagaParams)
  }
}

