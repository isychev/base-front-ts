import actionCreator from '../actionCreator';

const basePayload = {
  payload1: 1,
};
const baseMeta = {
  meta1: 1,
};
const mainPayload = {
  payload2: 2,
};
const mainMeta = {
  meta2: 2,
};
const TYPE = 'TYPE';
describe('test action creator', () => {
  it('should crete action with  meta', () => {
    const action = actionCreator('TYPE', basePayload, baseMeta);
    const result = action(mainPayload, mainMeta);

    expect(result.type).toEqual(TYPE);
    expect(result.payload).toEqual({
      ...basePayload,
      ...mainPayload,
    });
    expect(result.meta).toEqual({
      ...baseMeta,
      ...mainMeta,
    });
  });
});
