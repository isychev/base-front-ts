import getEntityAlias from '../getEntityAlias';

test('should return entityAlias', () => {
  const entityAlias = 'entityAlias';
  const payload = {
    entityAlias,
    test: 'entityAlias',
  };
  expect(entityAlias).toEqual(getEntityAlias({}, payload));
  expect('').toEqual(getEntityAlias({}, {} as any));
});
