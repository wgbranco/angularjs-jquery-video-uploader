"use strict";

angular.module('myApp')
  .component('uploadListComponent', {
    templateUrl: 'views/upload-list-component.html',
    bindings: {
      uploads: '<'
    },
    controller: function()
    {
      var ctrl = this;
    }
  })
;
