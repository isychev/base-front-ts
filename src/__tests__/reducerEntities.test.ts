import {
  ENTITY_LOAD_COMPLETE,
  ENTITY_LOAD_ERROR,
  ENTITY_LOAD_START,
  ENTITY_LOAD_SUCCESS,
} from '../constantsEntity';
import onCreateEntity from '../onCreateEntity';
import onDeleteEntity from '../onDeleteEntity';
import onUpdateEntity from '../onUpdateEntity';
import reducerEntities from '../reducerEntities';
import { TEMP_PREFIX } from '../constantsRedux';

describe('test reducerEntities', () => {
  const entityAlias = 'entityAlias';
  const entityAlias2 = 'entityAlias2';
  const entity = {
    propertyEntity: '123',
  };
  const entity2 = {
    propertyEntity2: '321',
  };

  const fullState = {
    [entityAlias]: {
      data: entity,
      error: false,
      loading: false,
      loaded: true,
    },
    [entityAlias2]: {
      data: entity2,
      error: false,
      loading: false,
      loaded: true,
    },
  };

  it('should return origin state', () => {
    expect(reducerEntities(fullState, { type: 'TEMP' }) === fullState).toEqual(
      true,
    );
  });

  it('should remove entity', () => {
    expect(reducerEntities(fullState, onDeleteEntity({ entityAlias }))).toEqual(
      { ...fullState, [entityAlias]: undefined },
    );
    expect(
      reducerEntities({}, onDeleteEntity({ entityAlias: 'test12' })),
    ).toEqual({});
    expect(
      reducerEntities(fullState, onDeleteEntity({ entityAlias: 'test12' })),
    ).toEqual(fullState);
    expect(reducerEntities(fullState, onDeleteEntity({} as any))).toEqual(
      fullState,
    );
  });

  it('should update entity', function() {
    // normal update
    expect(
      reducerEntities(
        fullState,
        onUpdateEntity({ entityAlias, data: { test2: 'test2' } }),
      ),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        ...fullState[entityAlias],
        data: {
          ...fullState[entityAlias].data,
          test2: 'test2',
        },
      },
    });

    expect(
      reducerEntities(
        {
          ...fullState,
          [entityAlias]: {
            ...fullState[entityAlias],
            data: 'test',
          },
        },
        onUpdateEntity({ entityAlias, data: 'test' }),
      ),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        ...fullState[entityAlias],
        data: 'test',
      },
    });
    // entityAlias not exist
    expect(
      reducerEntities(
        fullState,
        onUpdateEntity({ entityAlias: 'temp', data: { test2: 'test2' } }),
      ),
    ).toEqual({
      ...fullState,
      temp: {
        data: {
          test2: 'test2',
        },
      },
    });
    // empty state;
    expect(
      reducerEntities(
        {},
        onUpdateEntity({ entityAlias: 'temp', data: { test2: 'test2' } }),
      ),
    ).toEqual({
      temp: {
        data: {
          test2: 'test2',
        },
      },
    });
    // update loading error loaded
    expect(
      reducerEntities(
        fullState,
        onUpdateEntity({
          entityAlias,
          error: true,
          loading: true,
          loaded: true,
        }),
      ),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        ...fullState[entityAlias],
        error: true,
        loading: true,
        loaded: true,
      },
    });
    // bad params -  without entityAlias
    expect(reducerEntities(fullState, onUpdateEntity({} as any))).toEqual(
      fullState,
    );
  });

  it('should create entity', () => {
    // bad params -  without entityAlias
    expect(
      reducerEntities(
        fullState,
        onCreateEntity({ entityAlias: 'temp', data: { test3: 'test3' } }),
      ),
    ).toEqual({
      ...fullState,
      temp: {
        data: { test3: 'test3' },
        error: false,
        loaded: true,
        loading: false,
      },
    });
    expect(reducerEntities(fullState, onCreateEntity({} as any))).toEqual(
      fullState,
    );
    expect(
      reducerEntities(fullState, onCreateEntity({ entityAlias: 'temp' })),
    ).toEqual(fullState);
  });
  it('should set flag loading', () => {
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_START,
        payload: {
          entityAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        ...fullState[entityAlias],
        error: false,
        loaded: false,
        loading: true,
      },
    });
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_START,
        payload: {
          entityAlias: 'temp',
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
      reducerEntities(fullState, {
        type: ENTITY_LOAD_START,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });
  it('should set flag error', () => {
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_ERROR,
        payload: {
          entityAlias,
        },
      }),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        ...fullState[entityAlias],
        error: true,
        loaded: false,
      },
    });

    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_ERROR,
        payload: {
          entityAlias: 'temp',
        },
      }),
    ).toEqual({
      ...fullState,
      temp: {
        data: null,
        error: true,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_ERROR,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should create entity with temp prefix', () => {
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_COMPLETE,
        payload: {
          entityAlias: 'temp',
          data: entity,
        },
      }),
    ).toEqual({
      ...fullState,
      [`temp_${TEMP_PREFIX}`]: {
        data: entity,
        error: false,
        loaded: false,
        loading: false,
      },
    });
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_COMPLETE,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });

  it('should copy temp entity', () => {
    expect(
      reducerEntities(
        {
          ...fullState,
          [`${entityAlias}_${TEMP_PREFIX}`]: {
            data: {
              temp: 'temp',
            },
          },
        },
        {
          type: ENTITY_LOAD_SUCCESS,
          payload: {
            entityAlias,
          },
        },
      ),
    ).toEqual({
      ...fullState,
      [entityAlias]: {
        data: {
          temp: 'temp',
        },
        error: false,
        loaded: true,
        loading: false,
      },
    });
    expect(
      reducerEntities(fullState, {
        type: ENTITY_LOAD_SUCCESS,
        payload: {},
      }) === fullState,
    ).toEqual(true);
  });
});
