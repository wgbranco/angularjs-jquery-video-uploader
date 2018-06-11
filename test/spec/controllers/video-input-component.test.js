'use strict';

describe('Component: videoInputComponent', function() {
  var $compile, scope;

  beforeEach(module('myApp'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    scope.fileSelected = jasmine.createSpy('fileSelected');
  }));

  // it('should create an input element of type file', function() {
  //   var element = angular.element(`<video-input-component/>`);
  //   element = $compile(element)(scope);
  //   scope.$digest();
  //   expect().toHaveBeenCalled();
  // });

});
