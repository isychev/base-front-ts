import {
  LIST_LOAD_COMPLETE,
  LIST_LOAD_ERROR,
  LIST_LOAD_START,
  LIST_LOAD_SUCCESS,
} from '../constantsList';
import { TEMP_PREFIX } from '../constantsRedux';
import onCreateList from '../onCreateList';
import onDeleteList from '../onDeleteList';
import onUpdateList from '../onUpdateList';
import reducerList from '../reducerList';


describe('test reducerLists', () => {
  const listAlias = 'listAlias';
  const listAlias2 = 'listAlias2';
  const testList = [4, 5, 6];
  const list = [1, 2, 3];
  const list2 = [3, 2, 1];

  const fullState = {
    [listAlias]: {
      data: list,
      error: false,
      loading: false,
      loaded: true,
    },
    [listAlias2]: {
      data: list2,
      error: false,
      loading: false,
      loaded: true,
    },
  };

  it('should return origin state', () => {
    expect(reducerList(fullState, { type: 'TEMP' }) === fullState).toEqual(
      true,
    );
  });
  it('should create list', () => {
    // bad params -  without listAlias
    expect(
      reducerList(
        fullState,
        onCreateList({ listAlias: 'temp', data: testList }),
      ),
    ).toEqual({
      ...fullState,
      temp: {
        data: testList,
        error: false,
        loaded: true,
        loading: false,
      },
    });
    expect(reducerList(fullState, onCreateList({} as any))).toEqual(fullState);
    expect(reducerList(fullState, onCreateList({ listAlias: 'temp' }))).toEqual(
      {
        ...fullState,
        temp: {
          data: null,
          error: false,
          loaded: true,
          loading: false,
        },
      },
    );
  });

  it('should remove list', () => {
    expect(reducerList(fullState, onDeleteList({ listAlias }))).toEqual({
      ...fullState,
      [listAlias]: undefined,
    });
    expect(reducerList({}, onDeleteList({ listAlias: 'test12' }))).toEqual({});
    expect(
      reducerList(fullState, onDeleteList({ listAlias: 'test12' })),
    ).toEqual(fullState);
    expect(reducerList(fullState, onDeleteList({} as any))).toEqual(fullState);
  });

  describe('should update list', () => {
    it('should update list', () => {
      // normal update
      expect(
        reducerList(fullState, onUpdateList({ listAlias, data: testList })),
      ).toEqual({
        ...fullState,
        [listAlias]: {
          ...fullState[listAlias],
          data: testList,
        },
      });
    });
    it('should update list with before flag', () => {
      // test before
      expect(
        reducerList(
          fullState,
          onUpdateList({ listAlias, data: testList, before: true }),
        ),
      ).toEqual({
        ...fullState,
        [listAlias]: {
          ...fullState[listAlias],
          data: [...testList, ...list],
        },
      });
    });
    it('should update list with after flag', () => {
      // test after
      expect(
        reducerList(
          fullState,
          onUpdateList({ listAlias, data: testList, after: true }),
        ),
      ).toEqual({
        ...fullState,
        [listAlias]: {
          ...fullState[listAlias],
          data: [...list, ...testList],
        },
      });
    });
    it('should update list listAlias not exist', () => {
      // listAlias not exist
      expect(
        reducerList(
          fullState,
          onUpdateList({ listAlias: 'temp', data: testList }),
        ),
      ).toEqual({
        ...fullState,
        temp: {
          data: testList,
        },
      });
    });
    it('should update list empty state', () => {
      // empty state;
      expect(
        reducerList({}, onUpdateList({ listAlias: 'temp', data: testList })),
      ).toEqual({
        temp: {
          data: testList,
        },
      });
    });
    it('should update list with error flag', () => {
      // update loading error loaded
      expect(
        reducerList(
          fullState,
          onUpdateList({
            listAlias,
            error: true,
            loading: true,
            loaded: true,
          }),
        ),
      ).toEqual({
        ...fullState,
        [listAlias]: {
          ...fullState[listAlias],
          error: true,
          loading: true,
          loaded: true,
        },
      });
    });
    it('should update list bad params -  without listAlias', () => {
      // bad params -  without listAlias
      expect(reducerList(fullState, onUpdateList({} as any))).toEqual(
        fullState,
      );
    });
  });

  it('should set flag loading', () => {
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_START,
        payload: {
          listAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [listAlias]: {
        ...fullState[listAlias],
        error: false,
        loaded: false,
        loading: true,
      },
    });
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_START,
        payload: {
          listAlias: 'temp',
        },
      }),
    ).toEqual({
      ...fullState,
      temp: {
        data: null,
        error: false,
        loaded: false,
        loading: true,
      },
    });

    expect(
      reducerList(fullState, {
        type: LIST_LOAD_START,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should set flag error', () => {
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_ERROR,
        payload: {
          listAlias: 'asd',
        },
      }),
    ).toEqual({
      ...fullState,
      asd: {
        data: null,
        error: true,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_ERROR,
        payload: {
          listAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [listAlias]: {
        ...fullState[listAlias],
        error: true,
        loaded: false,
      },
    });
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_ERROR,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should create list with temp prefix', () => {
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_COMPLETE,
        payload: {
          listAlias: 'temp',
          data: list,
        },
      }),
    ).toEqual({
      ...fullState,
      [`temp_${TEMP_PREFIX}`]: {
        data: list,
        error: false,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_COMPLETE,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should copy temp list', () => {
    expect(
      reducerList(
        {
          ...fullState,
          [`${listAlias}_${TEMP_PREFIX}`]: {
            data: {
              temp: 'temp',
            },
          },
        },
        {
          type: LIST_LOAD_SUCCESS,
          payload: {
            listAlias,
          },
        },
      ),
    ).toEqual({
      ...fullState,
      [listAlias]: {
        data: {
          temp: 'temp',
        },
        error: false,
        loaded: true,
        loading: false,
      },
    });
    expect(
      reducerList(fullState, {
        type: LIST_LOAD_SUCCESS,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });
});
