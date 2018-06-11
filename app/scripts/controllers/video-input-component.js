"use strict";

angular.module('myApp')
  .component('videoInputComponent', {
    templateUrl: 'views/video-input-component.html',
    bindings: {
      pending: '<',
      fileSelected: '&'
    },
    controller: function($scope)
    {
      var ctrl = this;

      ctrl.$onInit = function() {
        // Initializations

        // Get video button
        var fileButton = document.getElementById("file_select");
        fileButton.addEventListener('click', function() {
          // Call file input when clicked
          fileInput.click();
        });

        // Create file input, but do not add it to the DOM
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.mp4';
        fileInput.onchange = function() {
          // When selected file changes
          var file = fileInput.files[0];

          if (!file) return;

          // Update displayed name
          ctrl.fileName = file.name;

          // Call output function
          ctrl.fileSelected({file: file});

          // Force change detection
          $scope.$apply();
        };

        ctrl.$onChanges = function() {
          if (!ctrl.pending) ctrl.fileName = undefined;
        };
      };
    }
  })
;
