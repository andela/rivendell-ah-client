import actionTypes from '../../../src/actions/actionTypes';

describe('Action Types', () => {
  it('should have PROFILE action type', () => {
    expect(actionTypes.PROFILE).toEqual('PROFILE')
  });
  it('should have PROFILE action type', () => {
    expect(actionTypes.PROFILE_UPDATE).toEqual('PROFILE_UPDATE');
  });
})
