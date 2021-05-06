import { sayHello } from "./utils";

describe('Utils', () => {

  it('should say hello', () => {
    const result = sayHello('Bob');

    expect(result).toBe('Hello Bob');
  });

});
