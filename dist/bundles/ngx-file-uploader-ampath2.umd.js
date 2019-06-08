(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('jspdf'), require('rxjs'), require('ngx-webcam'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-file-uploader-ampath2', ['exports', '@angular/core', '@angular/forms', 'jspdf', 'rxjs', 'ngx-webcam', '@angular/common'], factory) :
    (factory((global['ngx-file-uploader-ampath2'] = {}),global.ng.core,global.ng.forms,null,global.rxjs,null,global.ng.common));
}(this, (function (exports,i0,forms,jsPDF,rxjs,ngxWebcam,common) { 'use strict';

    jsPDF = jsPDF && jsPDF.hasOwnProperty('default') ? jsPDF['default'] : jsPDF;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFileUploaderService = (function () {
        function NgxFileUploaderService() {
        }
        NgxFileUploaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        NgxFileUploaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxFileUploaderService.ngInjectableDef = i0.defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });
        return NgxFileUploaderService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = (function () {
        // placeholder call backs
    });
    var NgxFileUploaderComponent = (function () {
        function NgxFileUploaderComponent() {
            this.urls = new Array();
            this.selectFileType = true;
            this.fileList = new Array();
            this.message = '';
            this.liveCamera = false;
            this.pdfAvailable = false;
            this.mobile = false;
            this.UploadCaptions = false;
            this.multiple = true;
            this.fileUpload = false;
            this.merge = true;
            this.backButton = false;
            this.fileChanged = new i0.EventEmitter();
            this.uploadData = new i0.EventEmitter();
            this._onClear = new i0.EventEmitter();
            this.showWebcam = true;
            this.allowCameraSwitch = true;
            this.multipleWebcamsAvailable = false;
            this.videoOptions = {};
            this.errors = [];
            // latest snapshot
            this.webcamImage = null;
            // webcam snapshot trigger
            this.trigger = new rxjs.Subject();
            // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
            this.nextWebcam = new rxjs.Subject();
            this.uploading = false;
            // The internal data model
            this.innerValue = '';
            // Placeholders for the callbacks which are later providesd
            // by the Control Value Accessor
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.singleFile) {
                    this.multiple = false;
                }
                if (window.screen.width <= 692) {
                    this.mobile = true;
                }
                ngxWebcam.WebcamUtil.getAvailableVideoInputs()
                    .then((function (mediaDevices) {
                    _this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
                }));
            };
        Object.defineProperty(NgxFileUploaderComponent.prototype, "value", {
            // get accessor
            get: 
            // get accessor
            /**
             * @return {?}
             */
            function () {
                return this.innerValue;
            },
            // set accessor including call the onchange callback
            set: 
            // set accessor including call the onchange callback
            /**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                if (v !== this.innerValue) {
                    this.innerValue = v;
                    this.onChangeCallback(v);
                }
            },
            enumerable: true,
            configurable: true
        });
        // Current time string.
        // Current time string.
        /**
         * @param {?} value
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.writeValue =
            // Current time string.
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this.innerValue) {
                    this.innerValue = value;
                }
            };
        // From ControlValueAccessor interface
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.registerOnChange =
            // From ControlValueAccessor interface
            /**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                this.onChangeCallback = fn;
            };
        // From ControlValueAccessor interface
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.registerOnTouched =
            // From ControlValueAccessor interface
            /**
             * @param {?} fn
             * @return {?}
             */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.onBlur = /**
         * @return {?}
         */
            function () {
                this.onTouchedCallback();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.onChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                var _this = this;
                /** @type {?} */
                var files = event.srcElement.files;
                this.uploading = true;
                // const fileToLoad = files;
                if (files) {
                    var _loop_1 = function (file) {
                        /** @type {?} */
                        var fileReader = new FileReader();
                        fileReader.onload = (function (fileLoadedEvent) {
                            /** @type {?} */
                            var data = fileReader.result;
                            /** @type {?} */
                            var name = file.name;
                            /** @type {?} */
                            var fileSize = Math.round(file.size / 1024);
                            /** @type {?} */
                            var payload = {
                                data: data,
                                id: _this.urls.length + 1,
                                name: name,
                                size: fileSize
                            };
                            if (!_this.singleFile) {
                                _this.urls.push(payload);
                                _this.fileList.push(payload);
                            }
                            else {
                                _this.fileChanged.emit(payload);
                                _this.back();
                            }
                        });
                        fileReader.readAsDataURL(file);
                    };
                    try {
                        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                            var file = files_1_1.value;
                            _loop_1(file);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (files_1_1 && !files_1_1.done && (_a = files_1.return))
                                _a.call(files_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                var e_1, _a;
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.clear = /**
         * @return {?}
         */
            function () {
                this.value = '';
                this.onChangeCallback(this.value);
                this.urls = [];
                this.back();
                this._onClear.emit();
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.back = /**
         * @return {?}
         */
            function () {
                this.selectFileType = true;
                this.urls = [];
                this.backButton = false;
                this.fileList = [];
                this.UploadCaptions = false;
                this.pdfAvailable = false;
                this.fileUpload = false;
                this.liveCamera = false;
            };
        /**
         * @param {?} filetype
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.toggleVisibility = /**
         * @param {?} filetype
         * @return {?}
         */
            function (filetype) {
                if (filetype === 'image') {
                    this.fileType = 'image/png, image/jpeg, image/gif';
                    this.fileUpload = true;
                }
                else if (filetype === 'pdf') {
                    this.fileType = 'application/pdf';
                    this.pdfAvailable = true;
                    this.fileUpload = true;
                }
                else if (filetype === 'both') {
                    this.fileType = 'image/png, image/jpeg, image/gif , application/pdf';
                    this.pdfAvailable = true;
                    this.fileUpload = true;
                }
                else if (filetype === 'liveCamera') {
                    this.liveCamera = true;
                }
                this.selectFileType = false;
                this.backButton = true;
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.upload = /**
         * @return {?}
         */
            function () {
                if (this.formEntry && !this.pdfAvailable) {
                    this.MergeImages();
                }
                this.uploadData.emit(this.fileList);
                this.back();
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.MergeImages = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var doc = new jsPDF({ compress: true });
                doc.page = 1;
                for (var i = 0; i < this.fileList.length; i++) {
                    /** @type {?} */
                    var imageData = this.fileList[i].data || this.fileList[i].imageAsDataUrl;
                    doc.addImage(imageData, 'JPG', 10, 10, 190, 270, undefined, 'FAST');
                    doc.setFont('courier');
                    doc.setFontType('normal');
                    doc.text(180, 290, 'page ' + doc.page);
                    doc.page++;
                    if (i < this.fileList.length) {
                        doc.addPage();
                    }
                }
                doc.setProperties({
                    title: 'Ampath Medical Data',
                    author: 'POC',
                    creator: 'AMPATH'
                });
                doc.deletePage(this.fileList.length + 1);
                this.fileList = [];
                this.urls = [];
                /** @type {?} */
                var output = doc.output('datauristring');
                /** @type {?} */
                var re = /filename=generated.pdf;/gi;
                /** @type {?} */
                var data = output.replace(re, '');
                /** @type {?} */
                var payload = {
                    data: data,
                };
                if (this.formEntry) {
                    this.fileList = [];
                    this.urls = [];
                }
                this.message = 'The images have been merged into one pdf';
                this.fileList.push(payload);
                this.urls.push(payload);
                this.singleFile = 'true';
            };
        /**
         * @param {?} urls
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.delete = /**
         * @param {?} urls
         * @return {?}
         */
            function (urls) {
                for (var i = 0; i <= this.urls.length; i++) {
                    if (urls.data) {
                        if (this.urls[i].data === urls.data) {
                            this.urls.splice(i, 1);
                            this.fileList.splice(i, 1);
                            break;
                        }
                    }
                    else if (urls.imageAsDataUrl) {
                        if (this.urls[i].imageAsDataUrl === urls.imageAsDataUrl) {
                            this.urls.splice(i);
                            this.fileList.splice(i, 1);
                            break;
                        }
                    }
                }
                // enabling merge button if remaining on urls is images
                /** @type {?} */
                var re = /pdf/gi;
                for (var index = 0; index < this.urls.length; index++) {
                    if (this.urls[index].data.search(re) === -1) {
                        this.pdfAvailable = true;
                        break;
                    }
                    else {
                        this.merge = true;
                        this.pdfAvailable = false;
                        this.fileUpload = true;
                    }
                }
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.triggerSnapshot = /**
         * @return {?}
         */
            function () {
                this.trigger.next();
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.toggleWebcam = /**
         * @return {?}
         */
            function () {
                this.showWebcam = !this.showWebcam;
            };
        /**
         * @param {?} error
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.handleInitError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                this.errors.push(error);
            };
        /**
         * @param {?} directionOrDeviceId
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.showNextWebcam = /**
         * @param {?} directionOrDeviceId
         * @return {?}
         */
            function (directionOrDeviceId) {
                // true => move forward through devices
                // false => move backwards through devices
                // string => move to device with given deviceId
                this.nextWebcam.next(directionOrDeviceId);
            };
        /**
         * @param {?} webcamImage
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.handleImage = /**
         * @param {?} webcamImage
         * @return {?}
         */
            function (webcamImage) {
                // console.info('received webcam image', webcamImage);
                if (this.singleFile) {
                    this.urls = [];
                    this.fileList = [];
                    this.pushData(webcamImage);
                }
                this.pushData(webcamImage);
            };
        /**
         * @param {?} webcamImage
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.pushData = /**
         * @param {?} webcamImage
         * @return {?}
         */
            function (webcamImage) {
                this.urls.push(webcamImage);
                this.fileList.push(webcamImage);
            };
        /**
         * @param {?} deviceId
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.cameraWasSwitched = /**
         * @param {?} deviceId
         * @return {?}
         */
            function (deviceId) {
                // console.log('active device: ' + deviceId);
                this.deviceId = deviceId;
            };
        Object.defineProperty(NgxFileUploaderComponent.prototype, "triggerObservable", {
            get: /**
             * @return {?}
             */ function () {
                return this.trigger.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxFileUploaderComponent.prototype, "nextWebcamObservable", {
            get: /**
             * @return {?}
             */ function () {
                return this.nextWebcam.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        NgxFileUploaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-file-uploader',
                        template: "<div *ngIf=\"message\" class=\"alert alert-success alert-dismissible\" role=\"alert\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span\n        aria-hidden=\"true\">&times;</span></button> {{message}}\n  </div>\n<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-primary\" type=\"button\" (click)=\"back()\" >\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n</button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n  <label for=\"pdf\">PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div *ngIf=\"!singleFile\" class=\"row-cb\">\n  <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n  <label  for=\"both\">Image & PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n  <label for=\"camera\" >Live Camera</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n  </div>\n</div>\n<div [hidden]=\"!urls[0]\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">SELECTED FILES</div>\n  <div class=\"panel-body\">\n      <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n          <a class = \"columne\" id = \"caption\">\n           <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\" [src]=\"url.data || url.imageAsDataUrl\" \n           onError=\"this.onerror=null;this.src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' ;\" class=\"rounded mb-3\" width=\"100\" height=\"200\">\n           <div class=\"text\"><h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"  style=\"color: red; font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE</h2></div>\n          </a>\n         </div>\n    </div>\n    <div class=\"panel-footer\">\n        <!-- <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n        </button> -->\n        <button *ngIf=\"!pdfAvailable && fileUpload || liveCamera || merge\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"  title=\"merge the images as pages in one pdf document\"  class=\"btn btn-default image-preview-clear\">\n          <span class=\"glyphicon glyphicon-upload\"></span> Merge\n        </button>\n    </div>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n    </button>\n    <button *ngIf=\"multiple\" type=\"button\" (click)=\"upload()\" class=\"button\">\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload\n</button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"liveCamera\">\n  <div style=\"text-align:center\">\n    <div>\n      <webcam [height]=\"700\" [width]=\"600\" [trigger]=\"triggerObservable\" (imageCapture)=\"handleImage($event)\" *ngIf=\"showWebcam\"\n              [allowCameraSwitch]=\"allowCameraSwitch\" [switchCamera]=\"nextWebcamObservable\"\n              [videoOptions]=\"videoOptions\"\n              [imageQuality]=\"1\"\n              (cameraSwitched)=\"cameraWasSwitched($event)\"\n              (initError)=\"handleInitError($event)\"\n      ></webcam>\n      <br/>\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"triggerSnapshot();\"><span class=\"glyphicon glyphicon-camera\"></span>Take A Snapshot</button>\n      <!-- <button class=\"actionBtn\" (click)=\"toggleWebcam();\">Toggle Webcam</button> -->\n      <!-- <br/> -->\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"showNextWebcam(true);\" [disabled]=\"!multipleWebcamsAvailable\">Change Camera</button>\n      <!-- <input id=\"cameraSwitchCheckbox\" type=\"checkbox\" [(ngModel)]=\"allowCameraSwitch\"><label for=\"cameraSwitchCheckbox\">Allow Camera Switch</label>\n      <br/> -->\n      <!-- DeviceId: <input id=\"deviceId\" type=\"text\" [(ngModel)]=\"deviceId\" style=\"width: 500px\">\n      <button (click)=\"showNextWebcam(deviceId);\">Activate</button> -->\n    </div>\n  </div>\n  <h4 *ngIf=\"errors.length > 0\">Messages:</h4>\n  <ul *ngFor=\"let error of errors\">\n    <li>{{error | json}}</li>\n  </ul>\n</div>\n\n\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                // tslint:disable-next-line:no-forward-ref
                                useExisting: i0.forwardRef((function () { return NgxFileUploaderComponent; })), multi: true
                            }
                        ],
                        styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:blur(4px);filter:blur(4px)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
                    }] }
        ];
        NgxFileUploaderComponent.propDecorators = {
            singleFile: [{ type: i0.Input }],
            formEntry: [{ type: i0.Input }],
            source: [{ type: i0.Input }],
            fileChanged: [{ type: i0.Output }],
            uploadData: [{ type: i0.Output }],
            _onClear: [{ type: i0.Output }]
        };
        return NgxFileUploaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFileUploaderModule = (function () {
        function NgxFileUploaderModule() {
        }
        NgxFileUploaderModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule, forms.FormsModule, ngxWebcam.WebcamModule
                        ],
                        declarations: [NgxFileUploaderComponent],
                        exports: [NgxFileUploaderComponent]
                    },] }
        ];
        return NgxFileUploaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxFileUploaderService = NgxFileUploaderService;
    exports.NgxFileUploaderComponent = NgxFileUploaderComponent;
    exports.NgxFileUploaderModule = NgxFileUploaderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1maWxlLXVwbG9hZGVyLWFtcGF0aDIvbGliL25neC1maWxlLXVwbG9hZGVyLnNlcnZpY2UudHMiLG51bGwsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci1hbXBhdGgyL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIMOJwrVDb25zb2xlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UnO1xuaW1wb3J0IGpzUERGIGZyb20gJ2pzcGRmJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdlYmNhbUltYWdlLCBXZWJjYW1Jbml0RXJyb3IsIFdlYmNhbVV0aWwgfSBmcm9tICduZ3gtd2ViY2FtJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbiAgLy8gcGxhY2Vob2xkZXIgY2FsbCBiYWNrc1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWZpbGUtdXBsb2FkZXInLFxuICBzdHlsZXM6IFtgLmJ0bi1maWxle3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uYnRuLWZpbGUgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21pbi13aWR0aDoxMDAlO21pbi1oZWlnaHQ6MTAwJTtmb250LXNpemU6MTAwcHg7dGV4dC1hbGlnbjpyaWdodDtvcGFjaXR5OjA7b3V0bGluZTowO2JhY2tncm91bmQ6I2ZmZjtjdXJzb3I6aW5oZXJpdDtkaXNwbGF5OmJsb2NrfSNpbWctdXBsb2Fke3dpZHRoOjEwMCV9LmltYWdlLXByZXZpZXctaW5wdXQgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21hcmdpbjowO3BhZGRpbmc6MDtmb250LXNpemU6MjBweDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjB9LmZpbGUtdXBsb2Fke2JhY2tncm91bmQtY29sb3I6I2ZmZjt3aWR0aDo2MDBweDttYXJnaW46MCBhdXRvO3BhZGRpbmc6MjBweH0uZmlsZS11cGxvYWQtYnRue3dpZHRoOjEwMCU7bWFyZ2luOjA7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiMxZmIyNjQ7Ym9yZGVyOm5vbmU7cGFkZGluZzoxMHB4O2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b206NHB4IHNvbGlkICMxNTgyNGI7dHJhbnNpdGlvbjouMnM7b3V0bGluZTowO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo3MDB9dWx7bGlzdC1zdHlsZS10eXBlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowfS5maWxlLXVwbG9hZC1idG46aG92ZXJ7YmFja2dyb3VuZDojMWFhMDU5O2NvbG9yOiNmZmY7dHJhbnNpdGlvbjouMnM7Y3Vyc29yOnBvaW50ZXJ9LmZpbGUtdXBsb2FkLWJ0bjphY3RpdmV7Ym9yZGVyOjA7dHJhbnNpdGlvbjouMnN9LmZpbGUtdXBsb2FkLWNvbnRlbnR7ZGlzcGxheTpub25lO3RleHQtYWxpZ246Y2VudGVyfS5maWxlLXVwbG9hZC1pbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvdXRsaW5lOjA7b3BhY2l0eTowO2N1cnNvcjpwb2ludGVyfS5pbWFnZS11cGxvYWQtd3JhcHttYXJnaW4tdG9wOjIwcHg7Ym9yZGVyOjRweCBkYXNoZWQgIzM2ODNjNztwb3NpdGlvbjpyZWxhdGl2ZX0uaW1hZ2UtZHJvcHBpbmcsLmltYWdlLXVwbG9hZC13cmFwOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzMzN2FiNztib3JkZXI6NHB4IGRhc2hlZCAjZmZmfS5pbWFnZS10aXRsZS13cmFwe3BhZGRpbmc6MCAxNXB4IDE1cHg7Y29sb3I6IzIyMn0uZHJhZy10ZXh0e3RleHQtYWxpZ246Y2VudGVyfS5kcmFnLXRleHQgaDN7Zm9udC13ZWlnaHQ6MTAwO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtjb2xvcjojMTU1YTgyO3BhZGRpbmc6NjBweCAwfS5maWxlLXVwbG9hZC1pbWFnZXttYXgtaGVpZ2h0OjIwMHB4O21heC13aWR0aDoyMDBweDttYXJnaW46YXV0bztwYWRkaW5nOjIwcHh9LmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mzt0ZXh0LWFsaWduOmNlbnRlcjt3aGl0ZS1zcGFjZTpub3dyYXA7dmVydGljYWwtYWxpZ246bWlkZGxlO3RvdWNoLWFjdGlvbjptYW5pcHVsYXRpb247Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDA0YTdmO2JvcmRlcjpub25lO2NvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nO2FuaW1hdGlvbjoxLjVzIGluZmluaXRlIGdsb3dpbmd9QC13ZWJraXQta2V5ZnJhbWVzIGdsb3dpbmd7MCV7YmFja2dyb3VuZC1jb2xvcjojMDAyZmIyOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9NTAle2JhY2tncm91bmQtY29sb3I6IzIwMzg2NDstd2Via2l0LWJveC1zaGFkb3c6MCAwIDQwcHggIzIwMzg2NH0xMDAle2JhY2tncm91bmQtY29sb3I6IzAwNWNiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfX1Aa2V5ZnJhbWVzIGdsb3dpbmd7MCUsMTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7Ym94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9NTAle2JhY2tncm91bmQtY29sb3I6IzIwMzg2NDtib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9fS5hY3Rpb25CdG57bWFyZ2luLXRvcDo1cHg7bWFyZ2luLWJvdHRvbToycHg7Zm9udC1zaXplOjEuMmVtfWxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDoxMDAlO21hcmdpbi1ib3R0b206NXB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tcmlnaHQ6MTBweH0ucm93LWNie21hcmdpbjphdXRvO2ZvbnQtc2l6ZToxNXB4fS5yb3ctY2IgbGFiZWx7ZmxvYXQ6bGVmdH0ucm93LWNiIHNwYW57ZmxvYXQ6bGVmdDt0ZXh0LWFsaWduOmxlZnR9LnNuYXBzaG90e3RleHQtYWxpZ246Y2VudGVyfS5zbmFwc2hvdCBpbWd7bWF4LXdpZHRoOjgwMHB4O21heC1oZWlnaHQ6ODAwcHh9LmNvbHVtbmUjY2FwdGlvbiAudGV4dCBoMXttYXJnaW46MDtjb2xvcjojZmZmfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgLnRleHR7b3BhY2l0eToxO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MX0uY29sdW1uZSNjYXB0aW9ue3Bvc2l0aW9uOnJlbGF0aXZlfS5jb2x1bW5lI2NhcHRpb24gLnRleHR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7ei1pbmRleDoxMDtvcGFjaXR5OjA7dHJhbnNpdGlvbjouOHN9LmNvbHVtbmUjY2FwdGlvbjpob3ZlciBpbWd7LXdlYmtpdC1maWx0ZXI6Ymx1cig0cHgpO2ZpbHRlcjpibHVyKDRweCl9QG1lZGlhIChtYXgtd2lkdGg6NjI5cHgpey5maWxlLXVwbG9hZC1pbnB1dHtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1gXSxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZVwiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW5cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPiB7e21lc3NhZ2V9fVxyXG4gIDwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiYmFja0J1dHRvblwiPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIiA+XHJcbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2lyY2xlLWFycm93LWxlZnRcIj48L3NwYW4+IEJhY2tcclxuPC9idXR0b24+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwic2VsZWN0RmlsZVR5cGVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcmVhZG9ubHkgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+VVBMT0FEIEZJTEUgVFlQRTwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiaW1hZ2VcIiBpZD1cImltYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnaW1hZ2UnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiaW1hXCI+SW1hZ2U8L2xhYmVsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwicGRmXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdwZGYnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCBmb3I9XCJwZGZcIj5QREY8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cIiFzaW5nbGVGaWxlXCIgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwiYm90aFwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnYm90aCcpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XHJcbiAgPGxhYmVsICBmb3I9XCJib3RoXCI+SW1hZ2UgJiBQREY8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gIDxzcGFuPjxpbnB1dCBuYW1lPVwiY2FtZXJhXCIgaWQ9XCJjYW1lcmFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2xpdmVDYW1lcmEnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCBmb3I9XCJjYW1lcmFcIiA+TGl2ZSBDYW1lcmE8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgW2hpZGRlbl09XCIhdXJsc1swXVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+U0VMRUNURUQgRklMRVM8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICpuZ0Zvcj1cImxldCB1cmwgb2YgdXJscztsZXQgaT1pbmRleFwiPlxyXG4gICAgICAgICAgPGEgY2xhc3MgPSBcImNvbHVtbmVcIiBpZCA9IFwiY2FwdGlvblwiPlxyXG4gICAgICAgICAgIDxpbWcgc3R5bGU9XCIgYm9yZGVyOiAxcHggc29saWQgcmdiKDk3LCA5NywgOTcpOyBtYXJnaW46IDJweDsgYm9yZGVyLXJhZGl1czogNHB4O3BhZGRpbmc6IDVweDtcIiBpZD1cImltZ3t7aX19XCIgW3NyY109XCJ1cmwuZGF0YSB8fCB1cmwuaW1hZ2VBc0RhdGFVcmxcIiBcclxuICAgICAgICAgICBvbkVycm9yPVwidGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9J2h0dHBzOi8vc3RvcmUtaW1hZ2VzLnMtbWljcm9zb2Z0LmNvbS9pbWFnZS9hcHBzLjM0OTYxLjEzNTEwNzk4ODg3NjIxOTYyLjQ3YjYyYzRjLWEwYzYtNGUzYy04N2JiLTUwOTMxN2Q5YzM2NC5hNjM1NGI0OC1jNjhhLTQ3ZmEtYjY5ZS00Y2I1OTJkNDJmZmM/bW9kZT1zY2FsZSZxPTkwJmg9MzAwJnc9MzAwJyA7XCIgY2xhc3M9XCJyb3VuZGVkIG1iLTNcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjIwMFwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+PGgyIHRpdGxlPVwiQ2xpY2sgdG8gRGVsZXRlIEZpbGUge3t1cmwubmFtZX19XCIgKGNsaWNrKT1cImRlbGV0ZSh1cmwpXCIgIHN0eWxlPVwiY29sb3I6IHJlZDsgZm9udC1mYW1pbHk6IGZhbnRhc3k7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCI+PC9zcGFuPlJFTU9WRTwvaDI+PC9kaXY+XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XHJcbiAgICAgICAgPCEtLSA8YnV0dG9uICpuZ0lmPVwiVXBsb2FkQ2FwdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b25cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gVXBsb2FkIEZpbGVzXHJcbiAgICAgICAgPC9idXR0b24+IC0tPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCIhcGRmQXZhaWxhYmxlICYmIGZpbGVVcGxvYWQgfHwgbGl2ZUNhbWVyYSB8fCBtZXJnZVwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiIXVybHNbMV1cIiAoY2xpY2spPVwiTWVyZ2VJbWFnZXMoKVwiICB0aXRsZT1cIm1lcmdlIHRoZSBpbWFnZXMgYXMgcGFnZXMgaW4gb25lIHBkZiBkb2N1bWVudFwiICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBNZXJnZVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiZmlsZVVwbG9hZFwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcmVhZG9ubHkgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWlucHV0XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWZvbGRlci1vcGVuXCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaW1hZ2UtcHJldmlldy1pbnB1dC10aXRsZVwiPlNFTEVDVCBGSUxFPC9zcGFuPlxyXG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBtdWx0aXBsZSBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgIC8+IFxyXG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAvPiBcclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xlYXIoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiPjwvc3Bhbj4gQ2xlYXJcclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiAqbmdJZj1cIm11bHRpcGxlXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZFxyXG48L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCIhbW9iaWxlXCIgY2xhc3M9XCJpbWFnZS11cGxvYWQtd3JhcFwiPlxyXG4gICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cclxuICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImRyYWctdGV4dFwiPlxyXG4gICAgICA8aDM+RHJhZyBhbmQgRHJvcCBmaWxlKHMpPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImxpdmVDYW1lcmFcIj5cclxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDx3ZWJjYW0gW2hlaWdodF09XCI3MDBcIiBbd2lkdGhdPVwiNjAwXCIgW3RyaWdnZXJdPVwidHJpZ2dlck9ic2VydmFibGVcIiAoaW1hZ2VDYXB0dXJlKT1cImhhbmRsZUltYWdlKCRldmVudClcIiAqbmdJZj1cInNob3dXZWJjYW1cIlxyXG4gICAgICAgICAgICAgIFthbGxvd0NhbWVyYVN3aXRjaF09XCJhbGxvd0NhbWVyYVN3aXRjaFwiIFtzd2l0Y2hDYW1lcmFdPVwibmV4dFdlYmNhbU9ic2VydmFibGVcIlxyXG4gICAgICAgICAgICAgIFt2aWRlb09wdGlvbnNdPVwidmlkZW9PcHRpb25zXCJcclxuICAgICAgICAgICAgICBbaW1hZ2VRdWFsaXR5XT1cIjFcIlxyXG4gICAgICAgICAgICAgIChjYW1lcmFTd2l0Y2hlZCk9XCJjYW1lcmFXYXNTd2l0Y2hlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoaW5pdEVycm9yKT1cImhhbmRsZUluaXRFcnJvcigkZXZlbnQpXCJcclxuICAgICAgPjwvd2ViY2FtPlxyXG4gICAgICA8YnIvPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiAoY2xpY2spPVwidHJpZ2dlclNuYXBzaG90KCk7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYVwiPjwvc3Bhbj5UYWtlIEEgU25hcHNob3Q8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uQnRuXCIgKGNsaWNrKT1cInRvZ2dsZVdlYmNhbSgpO1wiPlRvZ2dsZSBXZWJjYW08L2J1dHRvbj4gLS0+XHJcbiAgICAgIDwhLS0gPGJyLz4gLS0+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiIChjbGljayk9XCJzaG93TmV4dFdlYmNhbSh0cnVlKTtcIiBbZGlzYWJsZWRdPVwiIW11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZVwiPkNoYW5nZSBDYW1lcmE8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8aW5wdXQgaWQ9XCJjYW1lcmFTd2l0Y2hDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIj48bGFiZWwgZm9yPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIj5BbGxvdyBDYW1lcmEgU3dpdGNoPC9sYWJlbD5cclxuICAgICAgPGJyLz4gLS0+XHJcbiAgICAgIDwhLS0gRGV2aWNlSWQ6IDxpbnB1dCBpZD1cImRldmljZUlkXCIgdHlwZT1cInRleHRcIiBbKG5nTW9kZWwpXT1cImRldmljZUlkXCIgc3R5bGU9XCJ3aWR0aDogNTAwcHhcIj5cclxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0oZGV2aWNlSWQpO1wiPkFjdGl2YXRlPC9idXR0b24+IC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGg0ICpuZ0lmPVwiZXJyb3JzLmxlbmd0aCA+IDBcIj5NZXNzYWdlczo8L2g0PlxyXG4gIDx1bCAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzXCI+XHJcbiAgICA8bGk+e3tlcnJvciB8IGpzb259fTwvbGk+XHJcbiAgPC91bD5cclxuPC9kaXY+XHJcblxyXG5cclxuYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwdWJsaWMgdXJscyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBzZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBmaWxlVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbWVzc2FnZSA9ICcnO1xuICBwdWJsaWMgbGl2ZUNhbWVyYSA9IGZhbHNlO1xuICBwdWJsaWMgcGRmQXZhaWxhYmxlID0gZmFsc2U7XG4gIHB1YmxpYyBtb2JpbGUgPSBmYWxzZTtcbiAgcHVibGljIFVwbG9hZENhcHRpb25zID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzaW5nbGVGaWxlOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JtRW50cnk6IGFueTtcbiAgcHVibGljIG11bHRpcGxlID0gdHJ1ZTtcbiAgcHVibGljIGZpbGVVcGxvYWQgPSBmYWxzZTtcbiAgcHVibGljIG1lcmdlID0gdHJ1ZTtcbiAgcHVibGljIGJhY2tCdXR0b24gPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNvdXJjZTogYW55O1xuICBAT3V0cHV0KCkgcHVibGljIGZpbGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyB1cGxvYWREYXRhOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBfb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBfaW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93V2ViY2FtID0gdHJ1ZTtcbiAgcHVibGljIGFsbG93Q2FtZXJhU3dpdGNoID0gdHJ1ZTtcbiAgcHVibGljIG11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgZGV2aWNlSWQ6IHN0cmluZztcbiAgcHVibGljIHZpZGVvT3B0aW9uczogTWVkaWFUcmFja0NvbnN0cmFpbnRzID0ge1xuICAgIC8vIHdpZHRoOiB7aWRlYWw6IDEwMjR9LFxuICAgIC8vIGhlaWdodDoge2lkZWFsOiA1NzZ9XG4gIH07XG4gIHB1YmxpYyBlcnJvcnM6IFdlYmNhbUluaXRFcnJvcltdID0gW107XG5cbiAgLy8gbGF0ZXN0IHNuYXBzaG90XG4gIHB1YmxpYyB3ZWJjYW1JbWFnZTogV2ViY2FtSW1hZ2UgPSBudWxsO1xuXG4gIC8vIHdlYmNhbSBzbmFwc2hvdCB0cmlnZ2VyXG4gIHByaXZhdGUgdHJpZ2dlcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIC8vIHN3aXRjaCB0byBuZXh0IC8gcHJldmlvdXMgLyBzcGVjaWZpYyB3ZWJjYW07IHRydWUvZmFsc2U6IGZvcndhcmQvYmFja3dhcmRzLCBzdHJpbmc6IGRldmljZUlkXG4gIHByaXZhdGUgbmV4dFdlYmNhbTogU3ViamVjdDxib29sZWFuIHwgc3RyaW5nPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4gfCBzdHJpbmc+KCk7XG4gIHB1YmxpYyB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVzZFxuICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLm11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDY5MikgeyAvLyA3NjhweCBwb3J0cmFpdFxuICAgICAgdGhpcy5tb2JpbGUgPSB0cnVlO1xuICAgIH1cbiAgICBXZWJjYW1VdGlsLmdldEF2YWlsYWJsZVZpZGVvSW5wdXRzKClcbiAgICAgIC50aGVuKChtZWRpYURldmljZXM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gbWVkaWFEZXZpY2VzICYmIG1lZGlhRGV2aWNlcy5sZW5ndGggPiAxO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlcztcblxuICAgIGlmIChmaWxlcykge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpO1xuXG4gICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBpZDogdGhpcy51cmxzLmxlbmd0aCArIDEsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgc2l6ZTogZmlsZVNpemVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlQ2hhbmdlZC5lbWl0KHBheWxvYWQpO1xuICAgICAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2soKTtcbiAgICB0aGlzLl9vbkNsZWFyLmVtaXQoKTtcbiAgfVxuICBwdWJsaWMgYmFjaygpIHtcbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gdHJ1ZTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy5VcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMucGRmQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5maWxlVXBsb2FkID0gZmFsc2U7XG4gICAgdGhpcy5saXZlQ2FtZXJhID0gZmFsc2U7XG4gIH1cbiAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoZmlsZXR5cGU6IHN0cmluZykge1xuICAgIGlmIChmaWxldHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgdGhpcy5maWxlVHlwZSA9ICdpbWFnZS9wbmcsIGltYWdlL2pwZWcsIGltYWdlL2dpZic7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ3BkZicpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYgLCBhcHBsaWNhdGlvbi9wZGYnO1xuICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnbGl2ZUNhbWVyYScpIHtcbiAgICAgIHRoaXMubGl2ZUNhbWVyYSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSB0cnVlO1xuXG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKCkge1xuICAgIGlmICh0aGlzLmZvcm1FbnRyeSAmJiAhdGhpcy5wZGZBdmFpbGFibGUpIHtcbiAgICAgIHRoaXMuTWVyZ2VJbWFnZXMoKTtcbiAgICB9XG4gICAgdGhpcy51cGxvYWREYXRhLmVtaXQodGhpcy5maWxlTGlzdCk7XG4gICAgdGhpcy5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgTWVyZ2VJbWFnZXMoKSB7XG4gICAgY29uc3QgZG9jID0gbmV3IGpzUERGKHsgY29tcHJlc3M6IHRydWUgfSk7XG4gICAgZG9jLnBhZ2UgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5maWxlTGlzdFtpXS5kYXRhIHx8IHRoaXMuZmlsZUxpc3RbaV0uaW1hZ2VBc0RhdGFVcmw7XG4gICAgICBkb2MuYWRkSW1hZ2UoaW1hZ2VEYXRhLCAnSlBHJywgMTAsIDEwLCAxOTAsIDI3MCwgdW5kZWZpbmVkLCAnRkFTVCcpO1xuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcbiAgICAgIGRvYy5zZXRGb250VHlwZSgnbm9ybWFsJyk7XG4gICAgICBkb2MudGV4dCgxODAsIDI5MCwgJ3BhZ2UgJyArIGRvYy5wYWdlKTtcbiAgICAgIGRvYy5wYWdlKys7XG4gICAgICBpZiAoaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRvYy5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgIHRpdGxlOiAnQW1wYXRoIE1lZGljYWwgRGF0YScsXG4gICAgICBhdXRob3I6ICdQT0MnLFxuICAgICAgY3JlYXRvcjogJ0FNUEFUSCdcbiAgICB9KTtcbiAgICBkb2MuZGVsZXRlUGFnZSh0aGlzLmZpbGVMaXN0Lmxlbmd0aCArIDEpO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBkb2Mub3V0cHV0KCdkYXRhdXJpc3RyaW5nJyk7XG4gICAgY29uc3QgcmUgPSAvZmlsZW5hbWU9Z2VuZXJhdGVkLnBkZjsvZ2k7XG4gICAgY29uc3QgZGF0YSA9IG91dHB1dC5yZXBsYWNlKHJlLCAnJyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGRhdGEsXG4gICAgfTtcbiAgICBpZiAodGhpcy5mb3JtRW50cnkpIHtcbiAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXJscyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2UgPSAnVGhlIGltYWdlcyBoYXZlIGJlZW4gbWVyZ2VkIGludG8gb25lIHBkZic7XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMuc2luZ2xlRmlsZSA9ICd0cnVlJztcblxuICB9XG4gIHB1YmxpYyBkZWxldGUodXJsczogYW55KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy51cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodXJscy5kYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uZGF0YSA9PT0gdXJscy5kYXRhKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uaW1hZ2VBc0RhdGFVcmwgPT09IHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGkpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVuYWJsaW5nIG1lcmdlIGJ1dHRvbiBpZiByZW1haW5pbmcgb24gdXJscyBpcyBpbWFnZXNcbiAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudXJscy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLnVybHNbaW5kZXhdLmRhdGEuc2VhcmNoKHJlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVyZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwdWJsaWMgdHJpZ2dlclNuYXBzaG90KCk6IHZvaWQge1xuICAgIHRoaXMudHJpZ2dlci5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlV2ViY2FtKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1dlYmNhbSA9ICF0aGlzLnNob3dXZWJjYW07XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlSW5pdEVycm9yKGVycm9yOiBXZWJjYW1Jbml0RXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TmV4dFdlYmNhbShkaXJlY3Rpb25PckRldmljZUlkOiBib29sZWFuIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gdHJ1ZSA9PiBtb3ZlIGZvcndhcmQgdGhyb3VnaCBkZXZpY2VzXG4gICAgLy8gZmFsc2UgPT4gbW92ZSBiYWNrd2FyZHMgdGhyb3VnaCBkZXZpY2VzXG4gICAgLy8gc3RyaW5nID0+IG1vdmUgdG8gZGV2aWNlIHdpdGggZ2l2ZW4gZGV2aWNlSWRcbiAgICB0aGlzLm5leHRXZWJjYW0ubmV4dChkaXJlY3Rpb25PckRldmljZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbWFnZSh3ZWJjYW1JbWFnZTogV2ViY2FtSW1hZ2UpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmluZm8oJ3JlY2VpdmVkIHdlYmNhbSBpbWFnZScsIHdlYmNhbUltYWdlKTtcbiAgICBpZiAodGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLnVybHMgPSBbXTtcbiAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMucHVzaERhdGEod2ViY2FtSW1hZ2UpO1xuXG4gICAgfVxuICAgIHRoaXMucHVzaERhdGEod2ViY2FtSW1hZ2UpO1xuICB9XG4gIHB1YmxpYyBwdXNoRGF0YSh3ZWJjYW1JbWFnZSkge1xuICAgIHRoaXMudXJscy5wdXNoKHdlYmNhbUltYWdlKTtcbiAgICB0aGlzLmZpbGVMaXN0LnB1c2god2ViY2FtSW1hZ2UpO1xuICB9XG5cbiAgcHVibGljIGNhbWVyYVdhc1N3aXRjaGVkKGRldmljZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYWN0aXZlIGRldmljZTogJyArIGRldmljZUlkKTtcbiAgICB0aGlzLmRldmljZUlkID0gZGV2aWNlSWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRyaWdnZXJPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5leHRXZWJjYW1PYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLm5leHRXZWJjYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1dlYmNhbU1vZHVsZX0gZnJvbSAnbmd4LXdlYmNhbSc7XHJcblxyXG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFdlYmNhbU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIlN1YmplY3QiLCJXZWJjYW1VdGlsIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIldlYmNhbU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7O3FDQUpEO0tBUUM7O0lDUkQ7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztRQ3hHSyxJQUFJLElBQUc7O0lBRWIsQ0FBQyxDQUFBOztRQUVEO1lBa0lTLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFD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