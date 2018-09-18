import errorMiddleware from '../../src/middleware/errorMiddleware';

describe('Testing errorMiddleware', () => {
  const next = action => action;
  it('should catch a thrown error', async () => {
    const error = 'THIS IS A VIRUS!!!';
    const next = action => {
      return action.payload;
    };
    const action = {
      type: '_FAILURE',
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(error);
        }, 10);
      })
    } 
    const result = await errorMiddleware()(next)(action);
    expect(result).toEqual(error);
  });
  it('should decongest the nested error response on login failure', () => {
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
    };
    const prevAction = { ...action };
    const result = errorMiddleware()(next)(action);
    expect(result.payload.message).toEqual(prevAction.payload.response.data.errors.message);
  });
  it('should return the error response if there is no message', () => {
    const action = {
      type: 'LOGIN_FAILURE',
      payload: {
        response: {
          data: {
            errors: {
              password: 'password error'
            }
          }
        }
      }
    };
    const prevAction = { ...action };
    const result = errorMiddleware()(next)(action);
    expect(result.payload.response).toEqual(prevAction.payload.response.data.errors);
  });
  it('should call next for every other action type', () => {
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
    const result = errorMiddleware()(next)(action);
    expect(result.payload.data.user.token).toEqual(action.payload.data.user.token);
  });
  it('should return an empty object if there is no error response', () => {
    const action = {
      type: 'LOGIN_FAILURE',
      payload: {
        message: 'error'
      }
    };
    const result = errorMiddleware()(next)(action);
    expect(result.payload.response).toEqual({});
  })
});
