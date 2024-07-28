const { presentData } = require('../assets/js/javascript.js');

describe('presentData', () => {
  test('should create an element with the specified content', () => {
    const elementName = 'div';
    const elementContent = 'Hello World';
    const element = presentData(elementName, elementContent);

    expect(element.tagName.toLowerCase()).toBe(elementName);
    expect(element.textContent).toBe(elementContent);
  });
});