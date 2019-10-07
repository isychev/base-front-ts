import {
  TEMP_LOAD_COMPLETE,
  TEMP_LOAD_ERROR,
  TEMP_LOAD_START,
  TEMP_LOAD_SUCCESS,
} from '../constantsTemp';
import onCreateTemp from '../onCreateTemp';
import onDeleteTemp from '../onDeleteTemp';
import onUpdateTemp from '../onUpdateTemp';
import reducerTemp from '../reducerTemp';
import { TEMP_PREFIX } from '../constantsRedux';

describe('test reducerTemp', () => {
  const tempAlias = 'tempAlias';
  const tempAlias2 = 'tempAlias2';
  const temp = {
    propertyTemp: '123',
  };
  const temp2 = {
    propertyTemp2: '321',
  };

  const fullState = {
    [tempAlias]: {
      data: temp,
      hold: false,
      error: false,
      loading: false,
      loaded: true,
    },
    [tempAlias2]: {
      data: temp2,
      hold: true,
      error: false,
      loading: false,
      loaded: true,
    },
  };

  it('should return origin state', () => {
    expect(reducerTemp(fullState, { type: 'TEMP' }) === fullState).toEqual(
      true,
    );
  });

  it('should remove temp', () => {
    expect(reducerTemp(fullState, onDeleteTemp({ tempAlias }))).toEqual({
      ...fullState,
      [tempAlias]: undefined,
    });
    // expect(
    //   reducerTemp({}, onDeleteTemp({ tempAlias: 'test12' })),
    // ).toEqual({});
    // expect(
    //   reducerTemp(fullState, onDeleteTemp({ tempAlias: 'test12' })),
    // ).toEqual(fullState);
    // expect(reducerTemp(fullState, onDeleteTemp({} as any))).toEqual(
    //   fullState,
    // );
  });
  describe('should update temp', () => {
    it('normal update', function() {
      // normal update
      expect(
        reducerTemp(
          fullState,
          onUpdateTemp({ tempAlias, data: { test2: 'test2' } }),
        ),
      ).toEqual({
        ...fullState,
        [tempAlias]: {
          ...fullState[tempAlias],
          data: {
            ...fullState[tempAlias].data,
            test2: 'test2',
          },
        },
      });
    });
    it('update primitive type', function() {
      expect(
        reducerTemp(
          {
            ...fullState,
            [tempAlias]: {
              ...fullState[tempAlias],
              data: 'test',
            },
          },
          onUpdateTemp({ tempAlias, data: 'test' }),
        ),
      ).toEqual({
        ...fullState,
        [tempAlias]: {
          ...fullState[tempAlias],
          data: 'test',
        },
      });
    });

    it('tempAlias not exist', function() {
      // tempAlias not exist
      expect(
        reducerTemp(
          fullState,
          onUpdateTemp({ tempAlias: 'temp', data: { test2: 'test2' } }),
        ),
      ).toEqual({
        ...fullState,
        temp: {
          data: {
            test2: 'test2',
          },
        },
      });
    });

    it('empty state', function() {
      // empty state;
      expect(
        reducerTemp(
          {},
          onUpdateTemp({ tempAlias: 'temp', data: { test2: 'test2' } }),
        ),
      ).toEqual({
        temp: {
          data: {
            test2: 'test2',
          },
        },
      });
    });

    it('should update loading error loaded', function() {
      // update loading error loaded
      expect(
        reducerTemp(
          fullState,
          onUpdateTemp({
            tempAlias,
            error: true,
            loading: true,
            loaded: true,
          }),
        ),
      ).toEqual({
        ...fullState,
        [tempAlias]: {
          ...fullState[tempAlias],
          error: true,
          loading: true,
          loaded: true,
        },
      });
    });

    it('should return state temp alias dismiss', function() {
      expect(reducerTemp(fullState, onUpdateTemp({} as any))).toEqual(
        fullState,
      );
    });
  });

  it('should create temp', () => {
    // bad params -  without tempAlias
    expect(
      reducerTemp(
        fullState,
        onCreateTemp({ tempAlias: 'temp', data: { test3: 'test3' } }),
      ),
    ).toEqual({
      ...fullState,
      temp: {
        data: { test3: 'test3' },
        error: false,
        loaded: true,
        hold: false,
        loading: false,
      },
    });
    expect(reducerTemp(fullState, onCreateTemp({} as any))).toEqual(fullState);
    expect(reducerTemp(fullState, onCreateTemp({ tempAlias: 'temp' }))).toEqual(
      fullState,
    );
  });
  it('should set flag loading', () => {
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_START,
        payload: {
          tempAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [tempAlias]: {
        ...fullState[tempAlias],
        error: false,
        loaded: false,
        loading: true,
      },
    });
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_START,
        payload: {
          tempAlias: 'temp',
        },
      }),
    ).toEqual({
      ...fullState,
      temp: {
        data: null,
        hold: false,
        error: false,
        loaded: false,
        loading: true,
      },
    });

    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_START,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });
  it('should set flag error', () => {
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_ERROR,
        payload: {
          tempAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [tempAlias]: {
        ...fullState[tempAlias],
        error: true,
        loaded: false,
      },
    });

    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_ERROR,
        payload: {
          tempAlias: 'temp',
        },
      }),
    ).toEqual({
      ...fullState,
      temp: {
        data: null,
        hold: false,
        error: true,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_ERROR,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should create temp with temp prefix', () => {
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_COMPLETE,
        payload: {
          tempAlias: 'temp',
          data: temp,
        },
      }),
    ).toEqual({
      ...fullState,
      [`temp_${TEMP_PREFIX}`]: {
        data: temp,
        hold: false,
        error: false,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_COMPLETE,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should copy temp temp', () => {
    expect(
      reducerTemp(
        {
          ...fullState,
          [`${tempAlias}_${TEMP_PREFIX}`]: {
            data: {
              temp: 'temp',
            },
          },
        },
        {
          type: TEMP_LOAD_SUCCESS,
          payload: {
            tempAlias,
          },
        },
      ),
    ).toEqual({
      ...fullState,
      [tempAlias]: {
        data: {
          temp: 'temp',
        },
        hold: false,
        error: false,
        loaded: true,
        loading: false,
      },
    });
    expect(
      reducerTemp(fullState, {
        type: TEMP_LOAD_SUCCESS,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });
});
