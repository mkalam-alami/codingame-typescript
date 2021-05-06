import { runBot } from "./runner";

describe('Bot', () => {

  it('should say hello', () => {
    const inputs = ['Bob'];
    const outputs = runBot(inputs);
    expect(outputs[0]).toBe('Hello Bob');
  });

});
