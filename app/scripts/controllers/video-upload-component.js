"use strict";

function videoUploadController($scope, $mdToast, videoUploadService)
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

angular.module('myApp')
  .component('videoUploadComponent', {
    templateUrl: 'views/video-upload-component.html',
    bindings: { },
    controller: ["$scope", "$mdToast", "videoUploadService", videoUploadController]
  })
;
