'use strict';

describe('Component: uploadItemComponent', function() {
  var $compile, $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should display an icon, a title and a video wrapper', function() {
    $rootScope['item'] = {
      name: 'any name', hashed_id: 'any_id', thumbnail: {url: 'any.url'}
    };

    var element = angular.element(`<upload-item-component item="item"/>`);
    var compiledElement = $compile(element)($rootScope);
    $rootScope.$digest();

    expect(compiledElement.find('md-icon').length).toBe(1);
    expect(compiledElement.find('span').length).toBe(1);
    expect(compiledElement.find('wistia_responsive_wrapper').length).toBe(1);
    expect(compiledElement.html()).toContain('any name')
  });

});
