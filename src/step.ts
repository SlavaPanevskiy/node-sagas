export class Step<T> {
  private invocation: Function;
  private compensation: Function;
  private readonly name: string;

  constructor(name = '') {
    this.name = name;
  }

  public setInvocation(method: (params: T) => Promise<void> | void): void {
    this.invocation = method;
  }

  public setCompensation(method: (params: T) => Promise<void> | void): void {
    this.compensation = method;
  }

  public async invoke(params: T): Promise<void> {
    if (this.invocation) {
      return this.invocation(params);
    }
  }

  public async compensate(params: T): Promise<void> {
    if (this.compensation) {
      return this.compensation(params);
    }
  }

  public getName() {
    return this.name;
  }
}
