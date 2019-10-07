import getListAlias from '../getListAlias';

test('should return getListAlias', () => {
  const listAlias = 'listAlias';
  const payload = {
    listAlias,
    test: 'test',
  };
  expect(listAlias).toEqual(getListAlias({}, payload));
  expect('').toEqual(getListAlias({}, {} as any));
});
