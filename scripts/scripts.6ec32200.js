'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
  .module('myApp', [
    'ngMaterial',
    'ngMessages'
  ]);

'use strict';

angular.module('myApp')
  .factory('videoUploadService', function($rootScope) {

    var WISTIA_SERVER_URL = "https://upload.wistia.com";
    var WISTIA_API_KEY = "8d090944caf0a683d4e2daa0b0e555f0faa528d3373410e44972ad4fba71b7ed";

    var uploadStartCallbacks = [];
    var uploadProgressCallbacks = [];
    var uploadDoneCallbacks = [];
    var uploadFailCallbacks = [];

    initUploadWidget();

    function initUploadWidget()
    {
      // Initialize File Upload widget
      $('#fileupload')
      .fileupload()
      .bind('fileuploadstart', onUploadStart)
      .bind('fileuploadprogressall', onUploadProgress)
      .bind('fileuploaddone', onUploadDone)
      .bind('fileuploadfail', onUploadFail);

      clearCallbacks();
    }

    function clearCallbacks() {
      uploadStartCallbacks = [];
      uploadProgressCallbacks = [];
      uploadDoneCallbacks = [];
      uploadFailCallbacks = [];
    }

    function setCallbacks(callbacks) {
      if (!callbacks) return;

      uploadStartCallbacks.push(callbacks.start);
      uploadProgressCallbacks.push(callbacks.progress);
      uploadDoneCallbacks.push(callbacks.done);
      uploadFailCallbacks.push(callbacks.fail);
    }

    function onUploadStart(err, data) {
      uploadStartCallbacks.forEach(function(callback) {
        // Call function and trigger change detection
        $rootScope.$apply(callback(err, data));
      });
    }

    function onUploadProgress(err, data) {
      uploadProgressCallbacks.forEach(function(callback) {
        // Call function and trigger change detection
        $rootScope.$apply(callback(err, data));
      });
    }

    function onUploadDone(err, data) {
      uploadDoneCallbacks.forEach(function(callback) {
        // Call function and trigger change detection
        $rootScope.$apply(callback(err, data));
      });
    }

    function onUploadFail(err, data) {
      uploadFailCallbacks.forEach(function(callback) {
        // Call function and trigger change detection
        $rootScope.$apply(callback(err, data));
      });
    }

    function sendVideo(file) {
      if (!file) return;

      // Send video file to server with the JQuery File Upload library
      $('#fileupload').fileupload('send',
        {
          url: WISTIA_SERVER_URL,
          type: 'POST',
          multipart: true,
          paramName: 'file',
          progressInterval: 250,
          autoUpload: false,
          formData: {
            api_password: WISTIA_API_KEY
          },
          files: [file]
        }
      );
    }

    return {
      setCallbacks: setCallbacks,
      sendVideo: sendVideo
    };
  })
;

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

"use strict";

angular.module('myApp')
  .component('videoUploadComponent', {
    templateUrl: 'views/video-upload-component.html',
    bindings: { },
    controller: function($scope, $mdToast, videoUploadService)
    {
      var ctrl = this;

      ctrl.$onInit = function() {
        // Initializations
        ctrl.uploading = false;

        // Initialize service
        videoUploadService.setCallbacks({
          start: ctrl.onUploadStart,
          progress: ctrl.onUploadProgress,
          done: ctrl.onUploadDone,
          fail: ctrl.onUploadFail
        });
      };

      ctrl.onUploadStart = function(err, data) {
        ctrl.uploadPercentage = 0;
        ctrl.uploading = true;
        // console.log('STARTED...')
      };

      ctrl.onUploadProgress = function(err, data) {
        ctrl.uploadPercentage = parseInt(data.loaded / data.total * 100, 10);
        // console.log('PROGRESS: ', ctrl.uploadPercentage);
      };

      ctrl.onUploadDone = function(err, data) {
        ctrl.uploading = false;

        var item = data._response.result;
        ctrl.addToUploadedList(item);

        ctrl.showToast('Video uploaded successfully!');
        // console.log('DONE!');
      };

      ctrl.addToUploadedList = function(video) {
          if (!video) return;

          if (!ctrl.uploads) ctrl.uploads = [];

          ctrl.uploads.push(video);
      };

      ctrl.onUploadFail = function(err, data) {
          ctrl.uploading = false;
          ctrl.showToast('Something went wrong :(');
          // console.log('FAILED', err, data);
      };

      ctrl.onVideoSelected = function(file) {
        videoUploadService.sendVideo(file);
      };

      ctrl.showToast = function(msg) {
        if (!msg || !msg.length) return;

        $mdToast.show(
          $mdToast.simple()
          .textContent(msg)
          .position('top right')
          .hideDelay(3000)
        );
      };

    }
  })
;

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
