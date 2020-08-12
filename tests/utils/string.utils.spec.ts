import { toPascalCase, pluralize } from '../../src/utils/string.utils';

describe('toPascalCase', () => {
  test('should return pascal case string', () => {
    const testString = 'racoon';
    expect(toPascalCase(testString)).toBe('Racoon');
  });
  
  test('should return the same string if it is already pascal case', () => {
    const testString = 'PascalCaseString';
    expect(toPascalCase(testString)).toBe(testString);
  });
  
  test('should handle empty strings', () => {
    const testString = '';
    expect(toPascalCase(testString)).toBe(testString);
  });
});

describe('pluralize', () => {
  test('should return pluralized string', () => {
    const testString = 'racoon';
    expect(pluralize(testString)).toBe('racoons');
  });
  
  test('should return the same string if it is already plural', () => {
    const testString = 'humans';
    expect(pluralize(testString)).toBe(testString);
  });
  
  test('should handle empty strings', () => {
    const testString = '';
    expect(pluralize(testString)).toBe(testString);
  });
});
