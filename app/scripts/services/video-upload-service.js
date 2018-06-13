'use strict';

angular.module('myApp')
  .factory('videoUploadService', ["$rootScope", function($rootScope) {

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
  }]
);
