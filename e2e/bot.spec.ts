import { runBot } from "@e2e/runner";

describe('Bot', () => {

  it('should say hello', () => {
    const inputs = ['Bob'];
    const outputs = runBot(inputs);
    expect(outputs[0]).toBe('Hello Bob');
  });

});
