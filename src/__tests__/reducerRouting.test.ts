import { LOCATION_CHANGE } from 'react-router-redux';
import reducerRouting from '../reducerRouting';

describe('test reducerRouting', () => {
  it('should return default state ', function() {
    const state = {};
    expect(reducerRouting(state as any, { type: 'temp' }) === state).toEqual(
      true,
    );
    expect((reducerRouting as any)(undefined, {})).toEqual({ location: null });
  });
  it('should return parse query', function() {
    expect(
      reducerRouting({ location: { query: {} } } as any, {
        type: LOCATION_CHANGE,
        payload: {
          pathname: 'test',
          search: '&qwe=123',
        },
      }),
    ).toEqual({
      location: { pathname: 'test', search: '&qwe=123', query: { qwe: '123' } },
    });
    expect(
      reducerRouting({} as any, {
        type: LOCATION_CHANGE,
        payload: {
          pathname: 'test',
          search: '&qwe=123',
        },
      }),
    ).toEqual({
      location: { pathname: 'test', search: '&qwe=123', query: { qwe: '123' } },
    });
  });
});
