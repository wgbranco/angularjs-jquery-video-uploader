"use strict";

angular.module('myApp')
  .component('uploadItemComponent', {
    templateUrl: 'views/upload-item-component.html',
    bindings: {
      item: '<'
    },
    controller: function()
    {
      var ctrl = this;

      ctrl.$onChanges = function() {
        ctrl.videoId = ctrl.item.hashed_id;
        ctrl.videoName = ctrl.item.name;
        ctrl.videoIdClass = "wistia_async_"+ctrl.videoId;
        ctrl.thumbnailUrl = ctrl.item.thumbnail.url;
      };

    }
  })
;
