import Routing, {
  getPathDataValue,
  generateFromData,
  generatePathRouting,
} from '../routing';

describe('test routing', () => {
  it('should exist static methods', () => {
    expect(typeof Routing.generate).toEqual('function');
    expect(typeof Routing.generateFromData).toEqual('function');
  });
  it('should contain generate and generateFromData method', () => {
    const rout = new Routing({ test: '/test' });
    expect(typeof rout.generate).toEqual('function');
    expect(typeof rout.generateFromData).toEqual('function');
    expect(typeof rout.routes).toEqual('object');
    expect(rout.routes).toEqual({ test: '/test' });
  });
  describe('test generatePathRouting', () => {
    it('should generate path without query', () => {
      expect(generatePathRouting('/asd/:id/:id2', { id: 1, id2: 2 })).toEqual(
        '/asd/1/2',
      );
    });
    it('should generate path with query', () => {
      expect(
        generatePathRouting('/asd/:id/:id2', {
          id: 1,
          id2: 2,
          id3: 3,
          id4: undefined,
        } as any),
      ).toEqual('/asd/1/2?id3=3');
      expect(
        generatePathRouting('/asd/:id/:id2', {
          id: 1,
          id2: 2,
          id3: undefined,
        } as any),
      ).toEqual('/asd/1/2');
    });
  });

  describe('test getPathDataValue', () => {
    it('should return static value', () => {
      expect(getPathDataValue('test', { test: 1 })).toEqual('test');
      expect(getPathDataValue(1, { test: 1 })).toEqual(1);
      expect(getPathDataValue(':id', { test: 1 })).toEqual(':id');
    });
    it('should return id value from object', () => {
      expect(getPathDataValue(':test', { test: 1 })).toEqual(1);
    });
  });
  describe('test generateFromData', () => {
    it('should generate url without rowData', () => {
      expect(
        generateFromData({
          routingName: '/test/:id',
          routingParams: {
            id: 123,
          },
        }),
      ).toEqual('/test/123');
    });
    it('should generate url without rowData and  with array data', () => {
      expect(
        generateFromData({
          routingName: '/test/:id',
          routingParams: {
            id: [123, 321],
          },
        }),
      ).toEqual('/test/123,321');
    });
    it('should generate url with rowData', () => {
      expect(
        generateFromData(
          {
            routingName: '/test/:id/:nameInRouting',
            routingParams: {
              id: 123,
              nameInRouting: ':nameInRowData',
            },
          },
          {
            nameInRowData: 321,
            id: 321,
          },
        ),
      ).toEqual('/test/123/321');
    });
    it('should generate url with array data', () => {
      expect(
        generateFromData(
          {
            routingName: '/test/:id/:nameInRouting',
            routingParams: {
              id: 123,
              nameInRouting: [':nameInRowData', 'test'],
            },
          },
          {
            nameInRowData: 321,
            id: 444,
          },
        ),
      ).toEqual('/test/123/321,test');
    });
  });
});
