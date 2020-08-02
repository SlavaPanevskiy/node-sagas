# Node sagas 
This is a repository for the `node-sagas` package.
`node-sagas` is a convenient library for managing data consistency in a microservice architecture.
It helps create distributed transaction across services.

Why Sagas?

A distinctive characteristic of the microservice architecture is that in order to ensure loose coupling each service’s 
data is private. Unlike in a monolithic application, you no longer have a single database that any module 
of the application can update. As a result, one of the key challenges that you will face is maintaining
data consistency across services.

Please read more about [saga pattern](https://chrisrichardson.net/post/microservices/2019/07/09/developing-sagas-part-1.html).

## Installing / Getting started

This module is installed via npm::

```shell
npm i --save node-sagas 
```

## Example

This package provides you with main classes for creating sagas.
The first main class is `SagaBuilder`. 
```typescript
  import { SagaBuilder } from 'node-sagas';
  
  const sagaBuilder = new SagaBuilder<CreateOrderSagaParams>();
  const saga = sagaBuilder
    .step('Create order')
    .invoke((params: CreateOrderSagaParams) => {
      // create order logic
    })
    .withCompensation((params: CreateOrderSagaParams) => {
      // reject order logic
    })
    .step('Reserve credit')
    .invoke((params: CreateOrderSagaParams) => {
      // reserve credit
    })
    .step('Approve order')
    .invoke((params: CreateOrderSagaParams) => {
      // approve order
    })
    .build();

    const params = new CreateOrderSagaParams();

    try {
      return await saga.execute(params);
    } catch (e) {
      if (e instanceof SagaExecutionFailed) {
        // Throws, when invocation flow was failed, but compensation has been completed
      }
      if (e instanceof SagaCompensationFailed) {
        // Throws, when compensation flow was failed
      }
    }
```

A step could be defined using `step()` method, for each step you can set an action for a positive 
case with `invoke()` method. Also for each step, you can define compensation action with `withCompensation()` method.

`SagaBuilder` class use generic class for the handler's params:
```typescript
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
````
That class represents scope with params between the steps. Also, an instance of that class will be returned 
after the saga success execution.  

## Links

The article on Medium with a practical example will be prepared soon.

## Licensing

The code in this project is licensed under MIT license.
