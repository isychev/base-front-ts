import getTempAlias from '../getTempAlias';

test('should return geTtempAlias', () => {
  const tempAlias = 'tempAlias';
  const payload = {
    tempAlias,
    test: 'test',
  };
  expect(tempAlias).toEqual(getTempAlias({}, payload));
  expect('').toEqual(getTempAlias({}, {} as any));
});
