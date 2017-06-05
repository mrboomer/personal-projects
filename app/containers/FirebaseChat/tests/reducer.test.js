
import { fromJS } from 'immutable';
import firebaseChatReducer from '../reducer';

describe('firebaseChatReducer', () => {
  it('returns the initial state', () => {
    expect(firebaseChatReducer(undefined, {})).toEqual(fromJS({}));
  });
});
