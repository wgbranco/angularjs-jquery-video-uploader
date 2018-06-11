'use strict';

describe('Component: uploadListComponent', function() {
  var $compile, $rootScope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should display a uploadItemComponent for each item in uploads', function() {
    $rootScope['items'] = [
      {name: 'any name', hashed_id: 'any_id', thumbnail: { url: 'any.url' }},
      {name: 'any name 2', hashed_id: 'any_id2', thumbnail: { url: 'any.url2' }},
      {name: 'any name 3', hashed_id: 'any_id3', thumbnail: { url: 'any.url3' }},
    ];

    var element = angular.element(`<upload-list-component uploads="items"/>`);
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.find('upload-item-component').length).toBe(3);
  });

});
