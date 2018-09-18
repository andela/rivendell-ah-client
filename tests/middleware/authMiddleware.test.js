import authMiddleware from '../../src/middleware/authMiddleware';

describe('Testing authMiddleware', () => {
  const next = action => action;
  it('should decongest the nested response on login success', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      payload: {
        data: {
          user: {
            token: 'nested_token'
          }
        }
      }
    }
    const result = authMiddleware()(next)(action);
    expect(result.payload.token).toEqual(action.payload.data.user.token);
  });
  it('should call next for every other action type', () => {
    const action = {
      type: 'LOGIN_FAILURE',
      payload: {
        response: {
          data: {
            errors: {
              message: 'nested_error'
            }
          }
        }
      }
    }
    const result = authMiddleware()(next)(action);
    expect(result.payload.response.data.errors.message).toEqual(action.payload.response.data.errors.message);
  });
});
