import { SagaBuilder } from '../saga-builder';
import { Saga } from '../saga';

describe('SagaBuilder', () => {
  let sagaBuilder;

  beforeEach(() => {
    sagaBuilder = new SagaBuilder();
  });

  it('should build saga', () => {
    const saga = sagaBuilder.build();

    expect(saga).toBeInstanceOf(Saga);
  });

  it('should return builder instance on step', () => {
    const builder = sagaBuilder.step();

    expect(builder).toBeInstanceOf(SagaBuilder);
  });

  it('should return builder instance on invoke', () => {
    const builder = sagaBuilder.step().invoke(() => 'Invocation logic');

    expect(builder).toBeInstanceOf(SagaBuilder);
  });

  it('should return builder instance with compensation', () => {
    const builder = sagaBuilder
      .step()
      .invoke(() => 'Invocation logic')
      .withCompensation(() => 'Compensation logic');

    expect(builder).toBeInstanceOf(SagaBuilder);
  });
});
