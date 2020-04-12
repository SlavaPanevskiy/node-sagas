export class CreateOrderSagaParams {
  private orderId: number;
  private customerId: number;

  public getOrderId() {
    return this.orderId;
  }

  public setOrderId(orderId) {
    this.orderId = orderId;
  }

  public getCustomerId() {
    return this.customerId;
  }

  public setCustomerId(customerId) {
    this.customerId = customerId;
  }
}
