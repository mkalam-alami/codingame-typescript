import { Move } from "../io/move";
import isEqual from "./isEqual";

describe('isEqual', () => {

  it('should detect number equality', () => {
    expect(isEqual(1, 1)).toBeTruthy();
    expect(isEqual(1, 2)).toBeFalsy();
  });

  it('should consider two identical objects as equal', () => {
    const waitMove: Move = { type: 'WAIT' };
    const otherWaitMove: Move = { type: 'WAIT' };

    expect(isEqual(waitMove, otherWaitMove)).toBeTruthy();

  });

  it('should consider two different objects as different', () => {
    const waitMove: Move = { type: 'WAIT' };
    const otherMove: Move = { type: 'GROW', cellId: 1 };

    expect(isEqual(waitMove, otherMove)).toBeFalsy();
  });

});
