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
            this.messageType = '';
            this.liveCamera = false;
            this.pdfAvailable = false;
            this.mobile = false;
            this.UploadCaptions = false;
            this.multiple = true;
            this.fileUpload = false;
            this.both = true;
            this.merge = false;
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
                    this.both = false;
                }
                else if (this.formEntry) {
                    this.both = false;
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
                            if (fileSize >= 3000) {
                                _this.message = 'File Too large';
                                _this.messageType = 'danger';
                                setTimeout((function () {
                                    _this.message = '';
                                }), 3000);
                                _this.back();
                            }
                            else {
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
                this.singleFile = false;
                this.pdfAvailable = false;
                this.merge = false;
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
                    if (this.formEntry) {
                        this.multiple = false;
                    }
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
                if (this.value) {
                    this.clear();
                }
            };
        /**
         * @return {?}
         */
        NgxFileUploaderComponent.prototype.upload = /**
         * @return {?}
         */
            function () {
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
                var _this = this;
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
                this.message = 'The images have been merged into one pdf, You can now upload';
                this.messageType = 'success';
                setTimeout((function () {
                    _this.message = '';
                }), 3000);
                this.fileList.push(payload);
                this.urls.push(payload);
                this.singleFile = false;
                this.UploadCaptions = true;
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
                        template: "<div *ngIf=\"message\" class=\"alert alert-{{messageType}} alert-dismissible\" role=\"alert\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span\n        aria-hidden=\"true\">&times;</span></button> {{message}}\n  </div>\n<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-primary\" type=\"button\" (click)=\"back()\" >\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n</button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n    <div class=\"card\">\n        <div class=\"card-body\">\n            {{value}} \n            <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                <span class=\"glyphicon glyphicon-remove\"></span> Clear</button>\n        </div>\n      </div>\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n  <label for=\"pdf\">PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div *ngIf=\"both\" class=\"row-cb\">\n  <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n  <label  for=\"both\">Image & PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n  <label for=\"camera\" >Live Camera</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n  </div>\n</div>\n<div [hidden]=\"!urls[0]\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">SELECTED FILES</div>\n  <div class=\"panel-body\">\n      <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n          <a class = \"columne\" id = \"caption\">\n           <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\" [src]=\"url.data || url.imageAsDataUrl\" \n           onError=\"this.onerror=null;this.src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' ;\" class=\"rounded mb-3\" width=\"100\" height=\"200\">\n           <div class=\"text\"><h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"  style=\"color: red; font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE</h2></div>\n          </a>\n         </div>\n    </div>\n    <div class=\"panel-footer\">\n        <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button pull-right\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n        </button>\n        <button *ngIf=\"!pdfAvailable && fileUpload || liveCamera || merge\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"  title=\"merge the images as pages in one pdf document\"  class=\"btn btn-default image-preview-clear\">\n          <span class=\"glyphicon glyphicon-upload\"></span> Merge Files\n        </button>\n    </div>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n    </button>\n    <button type=\"button\" (click)=\"upload()\" class=\"button\">\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload\n</button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"liveCamera\">\n  <div style=\"text-align:center\">\n    <div>\n      <webcam [height]=\"700\" [width]=\"600\" [trigger]=\"triggerObservable\" (imageCapture)=\"handleImage($event)\" *ngIf=\"showWebcam\"\n              [allowCameraSwitch]=\"allowCameraSwitch\" [switchCamera]=\"nextWebcamObservable\"\n              [videoOptions]=\"videoOptions\"\n              [imageQuality]=\"1\"\n              (cameraSwitched)=\"cameraWasSwitched($event)\"\n              (initError)=\"handleInitError($event)\"\n      ></webcam>\n      <br/>\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"triggerSnapshot();\"><span class=\"glyphicon glyphicon-camera\"></span>Take A Snapshot</button>\n      <!-- <button class=\"actionBtn\" (click)=\"toggleWebcam();\">Toggle Webcam</button> -->\n      <!-- <br/> -->\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"showNextWebcam(true);\" [disabled]=\"!multipleWebcamsAvailable\">Change Camera</button>\n      <!-- <input id=\"cameraSwitchCheckbox\" type=\"checkbox\" [(ngModel)]=\"allowCameraSwitch\"><label for=\"cameraSwitchCheckbox\">Allow Camera Switch</label>\n      <br/> -->\n      <!-- DeviceId: <input id=\"deviceId\" type=\"text\" [(ngModel)]=\"deviceId\" style=\"width: 500px\">\n      <button (click)=\"showNextWebcam(deviceId);\">Activate</button> -->\n    </div>\n  </div>\n  <h4 *ngIf=\"errors.length > 0\">Messages:</h4>\n  <ul *ngFor=\"let error of errors\">\n    <li>{{error | json}}</li>\n  </ul>\n</div>\n\n\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                // tslint:disable-next-line:no-forward-ref
                                useExisting: i0.forwardRef((function () { return NgxFileUploaderComponent; })), multi: true
                            }
                        ],
                        styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:200px}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:blur(4px);filter:blur(4px)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1maWxlLXVwbG9hZGVyLWFtcGF0aDIvbGliL25neC1maWxlLXVwbG9hZGVyLnNlcnZpY2UudHMiLG51bGwsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci1hbXBhdGgyL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIMOJwrVDb25zb2xlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UnO1xuaW1wb3J0IGpzUERGIGZyb20gJ2pzcGRmJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdlYmNhbUltYWdlLCBXZWJjYW1Jbml0RXJyb3IsIFdlYmNhbVV0aWwgfSBmcm9tICduZ3gtd2ViY2FtJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbiAgLy8gcGxhY2Vob2xkZXIgY2FsbCBiYWNrc1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWZpbGUtdXBsb2FkZXInLFxuICBzdHlsZXM6IFtgLmJ0bi1maWxle3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uYnRuLWZpbGUgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21pbi13aWR0aDoxMDAlO21pbi1oZWlnaHQ6MTAwJTtmb250LXNpemU6MTAwcHg7dGV4dC1hbGlnbjpyaWdodDtvcGFjaXR5OjA7b3V0bGluZTowO2JhY2tncm91bmQ6I2ZmZjtjdXJzb3I6aW5oZXJpdDtkaXNwbGF5OmJsb2NrfSNpbWctdXBsb2Fke3dpZHRoOjIwMHB4fS5pbWFnZS1wcmV2aWV3LWlucHV0IGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowfS5maWxlLXVwbG9hZHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6NjAwcHg7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjIwcHh9LmZpbGUtdXBsb2FkLWJ0bnt3aWR0aDoxMDAlO21hcmdpbjowO2NvbG9yOiNmZmY7YmFja2dyb3VuZDojMWZiMjY0O2JvcmRlcjpub25lO3BhZGRpbmc6MTBweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItYm90dG9tOjRweCBzb2xpZCAjMTU4MjRiO3RyYW5zaXRpb246LjJzO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NzAwfXVse2xpc3Qtc3R5bGUtdHlwZTpub25lO21hcmdpbjowO3BhZGRpbmc6MH0uZmlsZS11cGxvYWQtYnRuOmhvdmVye2JhY2tncm91bmQ6IzFhYTA1OTtjb2xvcjojZmZmO3RyYW5zaXRpb246LjJzO2N1cnNvcjpwb2ludGVyfS5maWxlLXVwbG9hZC1idG46YWN0aXZle2JvcmRlcjowO3RyYW5zaXRpb246LjJzfS5maWxlLXVwbG9hZC1jb250ZW50e2Rpc3BsYXk6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uZmlsZS11cGxvYWQtaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3V0bGluZTowO29wYWNpdHk6MDtjdXJzb3I6cG9pbnRlcn0uaW1hZ2UtdXBsb2FkLXdyYXB7bWFyZ2luLXRvcDoyMHB4O2JvcmRlcjo0cHggZGFzaGVkICMzNjgzYzc7cG9zaXRpb246cmVsYXRpdmV9LmltYWdlLWRyb3BwaW5nLC5pbWFnZS11cGxvYWQtd3JhcDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMzdhYjc7Ym9yZGVyOjRweCBkYXNoZWQgI2ZmZn0uaW1hZ2UtdGl0bGUtd3JhcHtwYWRkaW5nOjAgMTVweCAxNXB4O2NvbG9yOiMyMjJ9LmRyYWctdGV4dHt0ZXh0LWFsaWduOmNlbnRlcn0uZHJhZy10ZXh0IGgze2ZvbnQtd2VpZ2h0OjEwMDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Y29sb3I6IzE1NWE4MjtwYWRkaW5nOjYwcHggMH0uZmlsZS11cGxvYWQtaW1hZ2V7bWF4LWhlaWdodDoyMDBweDttYXgtd2lkdGg6MjAwcHg7bWFyZ2luOmF1dG87cGFkZGluZzoyMHB4fS5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtY29sb3I6IzAwNGE3Zjtib3JkZXI6bm9uZTtjb2xvcjojZmZmO3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtYW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZzthbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nfUAtd2Via2l0LWtleWZyYW1lcyBnbG93aW5nezAle2JhY2tncm91bmQtY29sb3I6IzAwMmZiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9MTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn19QGtleWZyYW1lcyBnbG93aW5nezAlLDEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyO2JveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7Ym94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fX0uYWN0aW9uQnRue21hcmdpbi10b3A6NXB4O21hcmdpbi1ib3R0b206MnB4O2ZvbnQtc2l6ZToxLjJlbX1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLXJpZ2h0OjEwcHh9LnJvdy1jYnttYXJnaW46YXV0bztmb250LXNpemU6MTVweH0ucm93LWNiIGxhYmVse2Zsb2F0OmxlZnR9LnJvdy1jYiBzcGFue2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpsZWZ0fS5zbmFwc2hvdHt0ZXh0LWFsaWduOmNlbnRlcn0uc25hcHNob3QgaW1ne21heC13aWR0aDo4MDBweDttYXgtaGVpZ2h0OjgwMHB4fS5jb2x1bW5lI2NhcHRpb24gLnRleHQgaDF7bWFyZ2luOjA7Y29sb3I6I2ZmZn0uY29sdW1uZSNjYXB0aW9uOmhvdmVyIC50ZXh0e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjF9LmNvbHVtbmUjY2FwdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0uY29sdW1uZSNjYXB0aW9uIC50ZXh0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6MTA7b3BhY2l0eTowO3RyYW5zaXRpb246LjhzfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgaW1ney13ZWJraXQtZmlsdGVyOmJsdXIoNHB4KTtmaWx0ZXI6Ymx1cig0cHgpfUBtZWRpYSAobWF4LXdpZHRoOjYyOXB4KXsuZmlsZS11cGxvYWQtaW5wdXR7ZGlzcGxheTpub25lIWltcG9ydGFudH19YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIm1lc3NhZ2VcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXt7bWVzc2FnZVR5cGV9fSBhbGVydC1kaXNtaXNzaWJsZVwiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW5cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPiB7e21lc3NhZ2V9fVxyXG4gIDwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiYmFja0J1dHRvblwiPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIiA+XHJcbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2lyY2xlLWFycm93LWxlZnRcIj48L3NwYW4+IEJhY2tcclxuPC9idXR0b24+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwic2VsZWN0RmlsZVR5cGVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICB7e3ZhbHVlfX0gXHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xlYXIoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+VVBMT0FEIEZJTEUgVFlQRTwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiaW1hZ2VcIiBpZD1cImltYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnaW1hZ2UnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiaW1hXCI+SW1hZ2U8L2xhYmVsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwicGRmXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdwZGYnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCBmb3I9XCJwZGZcIj5QREY8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImJvdGhcIiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gIDxzcGFuPjxpbnB1dCBuYW1lPVwib3B0aW9uXCIgaWQ9XCJib3RoXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdib3RoJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICA8bGFiZWwgIGZvcj1cImJvdGhcIj5JbWFnZSAmIFBERjwvbGFiZWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgPHNwYW4+PGlucHV0IG5hbWU9XCJjYW1lcmFcIiBpZD1cImNhbWVyYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnbGl2ZUNhbWVyYScpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XHJcbiAgPGxhYmVsIGZvcj1cImNhbWVyYVwiID5MaXZlIENhbWVyYTwvbGFiZWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBbaGlkZGVuXT1cIiF1cmxzWzBdXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcbiAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5TRUxFQ1RFRCBGSUxFUzwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgKm5nRm9yPVwibGV0IHVybCBvZiB1cmxzO2xldCBpPWluZGV4XCI+XHJcbiAgICAgICAgICA8YSBjbGFzcyA9IFwiY29sdW1uZVwiIGlkID0gXCJjYXB0aW9uXCI+XHJcbiAgICAgICAgICAgPGltZyBzdHlsZT1cIiBib3JkZXI6IDFweCBzb2xpZCByZ2IoOTcsIDk3LCA5Nyk7IG1hcmdpbjogMnB4OyBib3JkZXItcmFkaXVzOiA0cHg7cGFkZGluZzogNXB4O1wiIGlkPVwiaW1ne3tpfX1cIiBbc3JjXT1cInVybC5kYXRhIHx8IHVybC5pbWFnZUFzRGF0YVVybFwiIFxyXG4gICAgICAgICAgIG9uRXJyb3I9XCJ0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz0naHR0cHM6Ly9zdG9yZS1pbWFnZXMucy1taWNyb3NvZnQuY29tL2ltYWdlL2FwcHMuMzQ5NjEuMTM1MTA3OTg4ODc2MjE5NjIuNDdiNjJjNGMtYTBjNi00ZTNjLTg3YmItNTA5MzE3ZDljMzY0LmE2MzU0YjQ4LWM2OGEtNDdmYS1iNjllLTRjYjU5MmQ0MmZmYz9tb2RlPXNjYWxlJnE9OTAmaD0zMDAmdz0zMDAnIDtcIiBjbGFzcz1cInJvdW5kZWQgbWItM1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMjAwXCI+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj48aDIgdGl0bGU9XCJDbGljayB0byBEZWxldGUgRmlsZSB7e3VybC5uYW1lfX1cIiAoY2xpY2spPVwiZGVsZXRlKHVybClcIiAgc3R5bGU9XCJjb2xvcjogcmVkOyBmb250LWZhbWlseTogZmFudGFzeTtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIj48L3NwYW4+UkVNT1ZFPC9oMj48L2Rpdj5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiVXBsb2FkQ2FwdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b24gcHVsbC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWQgRmlsZXNcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXBkZkF2YWlsYWJsZSAmJiBmaWxlVXBsb2FkIHx8IGxpdmVDYW1lcmEgfHwgbWVyZ2VcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiF1cmxzWzFdXCIgKGNsaWNrKT1cIk1lcmdlSW1hZ2VzKClcIiAgdGl0bGU9XCJtZXJnZSB0aGUgaW1hZ2VzIGFzIHBhZ2VzIGluIG9uZSBwZGYgZG9jdW1lbnRcIiAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gTWVyZ2UgRmlsZXNcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImZpbGVVcGxvYWRcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlYWRvbmx5IFsobmdNb2RlbCldPVwidmFsdWVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1pbnB1dFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1mb2xkZXItb3BlblwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImltYWdlLXByZXZpZXctaW5wdXQtdGl0bGVcIj5TRUxFQ1QgRklMRTwvc3Bhbj5cclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAvPiBcclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgLz4gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyXHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZFxyXG48L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCIhbW9iaWxlXCIgY2xhc3M9XCJpbWFnZS11cGxvYWQtd3JhcFwiPlxyXG4gICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cclxuICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImRyYWctdGV4dFwiPlxyXG4gICAgICA8aDM+RHJhZyBhbmQgRHJvcCBmaWxlKHMpPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImxpdmVDYW1lcmFcIj5cclxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDx3ZWJjYW0gW2hlaWdodF09XCI3MDBcIiBbd2lkdGhdPVwiNjAwXCIgW3RyaWdnZXJdPVwidHJpZ2dlck9ic2VydmFibGVcIiAoaW1hZ2VDYXB0dXJlKT1cImhhbmRsZUltYWdlKCRldmVudClcIiAqbmdJZj1cInNob3dXZWJjYW1cIlxyXG4gICAgICAgICAgICAgIFthbGxvd0NhbWVyYVN3aXRjaF09XCJhbGxvd0NhbWVyYVN3aXRjaFwiIFtzd2l0Y2hDYW1lcmFdPVwibmV4dFdlYmNhbU9ic2VydmFibGVcIlxyXG4gICAgICAgICAgICAgIFt2aWRlb09wdGlvbnNdPVwidmlkZW9PcHRpb25zXCJcclxuICAgICAgICAgICAgICBbaW1hZ2VRdWFsaXR5XT1cIjFcIlxyXG4gICAgICAgICAgICAgIChjYW1lcmFTd2l0Y2hlZCk9XCJjYW1lcmFXYXNTd2l0Y2hlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoaW5pdEVycm9yKT1cImhhbmRsZUluaXRFcnJvcigkZXZlbnQpXCJcclxuICAgICAgPjwvd2ViY2FtPlxyXG4gICAgICA8YnIvPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiAoY2xpY2spPVwidHJpZ2dlclNuYXBzaG90KCk7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYVwiPjwvc3Bhbj5UYWtlIEEgU25hcHNob3Q8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uQnRuXCIgKGNsaWNrKT1cInRvZ2dsZVdlYmNhbSgpO1wiPlRvZ2dsZSBXZWJjYW08L2J1dHRvbj4gLS0+XHJcbiAgICAgIDwhLS0gPGJyLz4gLS0+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiIChjbGljayk9XCJzaG93TmV4dFdlYmNhbSh0cnVlKTtcIiBbZGlzYWJsZWRdPVwiIW11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZVwiPkNoYW5nZSBDYW1lcmE8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8aW5wdXQgaWQ9XCJjYW1lcmFTd2l0Y2hDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIj48bGFiZWwgZm9yPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIj5BbGxvdyBDYW1lcmEgU3dpdGNoPC9sYWJlbD5cclxuICAgICAgPGJyLz4gLS0+XHJcbiAgICAgIDwhLS0gRGV2aWNlSWQ6IDxpbnB1dCBpZD1cImRldmljZUlkXCIgdHlwZT1cInRleHRcIiBbKG5nTW9kZWwpXT1cImRldmljZUlkXCIgc3R5bGU9XCJ3aWR0aDogNTAwcHhcIj5cclxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0oZGV2aWNlSWQpO1wiPkFjdGl2YXRlPC9idXR0b24+IC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGg0ICpuZ0lmPVwiZXJyb3JzLmxlbmd0aCA+IDBcIj5NZXNzYWdlczo8L2g0PlxyXG4gIDx1bCAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzXCI+XHJcbiAgICA8bGk+e3tlcnJvciB8IGpzb259fTwvbGk+XHJcbiAgPC91bD5cclxuPC9kaXY+XHJcblxyXG5cclxuYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwdWJsaWMgdXJscyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBzZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBmaWxlVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbWVzc2FnZSA9ICcnO1xuICBwdWJsaWMgbWVzc2FnZVR5cGUgPSAnJztcbiAgcHVibGljIGxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgcHVibGljIHBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgbW9iaWxlID0gZmFsc2U7XG4gIHB1YmxpYyBVcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2luZ2xlRmlsZTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZm9ybUVudHJ5OiBhbnk7XG4gIHB1YmxpYyBtdWx0aXBsZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlVXBsb2FkID0gZmFsc2U7XG4gIHB1YmxpYyBib3RoID0gdHJ1ZTtcbiAgcHVibGljIG1lcmdlID0gZmFsc2U7XG4gIHB1YmxpYyBiYWNrQnV0dG9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IGFueTtcbiAgQE91dHB1dCgpIHB1YmxpYyBmaWxlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkRGF0YTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgX29uQ2xlYXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgX2ltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd1dlYmNhbSA9IHRydWU7XG4gIHB1YmxpYyBhbGxvd0NhbWVyYVN3aXRjaCA9IHRydWU7XG4gIHB1YmxpYyBtdWx0aXBsZVdlYmNhbXNBdmFpbGFibGUgPSBmYWxzZTtcbiAgcHVibGljIGRldmljZUlkOiBzdHJpbmc7XG4gIHB1YmxpYyB2aWRlb09wdGlvbnM6IE1lZGlhVHJhY2tDb25zdHJhaW50cyA9IHtcbiAgICAvLyB3aWR0aDoge2lkZWFsOiAxMDI0fSxcbiAgICAvLyBoZWlnaHQ6IHtpZGVhbDogNTc2fVxuICB9O1xuICBwdWJsaWMgZXJyb3JzOiBXZWJjYW1Jbml0RXJyb3JbXSA9IFtdO1xuXG4gIC8vIGxhdGVzdCBzbmFwc2hvdFxuICBwdWJsaWMgd2ViY2FtSW1hZ2U6IFdlYmNhbUltYWdlID0gbnVsbDtcblxuICAvLyB3ZWJjYW0gc25hcHNob3QgdHJpZ2dlclxuICBwcml2YXRlIHRyaWdnZXI6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAvLyBzd2l0Y2ggdG8gbmV4dCAvIHByZXZpb3VzIC8gc3BlY2lmaWMgd2ViY2FtOyB0cnVlL2ZhbHNlOiBmb3J3YXJkL2JhY2t3YXJkcywgc3RyaW5nOiBkZXZpY2VJZFxuICBwcml2YXRlIG5leHRXZWJjYW06IFN1YmplY3Q8Ym9vbGVhbiB8IHN0cmluZz4gPSBuZXcgU3ViamVjdDxib29sZWFuIHwgc3RyaW5nPigpO1xuICBwdWJsaWMgdXBsb2FkaW5nID0gZmFsc2U7XG4gIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5ib3RoID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm1FbnRyeSkge1xuICAgICAgdGhpcy5ib3RoID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDY5MikgeyAvLyA3NjhweCBwb3J0cmFpdFxuICAgICAgdGhpcy5tb2JpbGUgPSB0cnVlO1xuICAgIH1cbiAgICBXZWJjYW1VdGlsLmdldEF2YWlsYWJsZVZpZGVvSW5wdXRzKClcbiAgICAgIC50aGVuKChtZWRpYURldmljZXM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gbWVkaWFEZXZpY2VzICYmIG1lZGlhRGV2aWNlcy5sZW5ndGggPiAxO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlcztcblxuICAgIGlmIChmaWxlcykge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpO1xuICAgICAgICAgIGlmIChmaWxlU2l6ZSA+PSAzMDAwKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnRmlsZSBUb28gbGFyZ2UnO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVHlwZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMudXJscy5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBzaXplOiBmaWxlU2l6ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICAgICAgICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmZpbGVDaGFuZ2VkLmVtaXQocGF5bG9hZCk7XG4gICAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrKCk7XG4gICAgdGhpcy5fb25DbGVhci5lbWl0KCk7XG4gIH1cbiAgcHVibGljIGJhY2soKSB7XG4gICAgdGhpcy5zZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLnNpbmdsZUZpbGUgPSBmYWxzZTtcbiAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMubWVyZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVVcGxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgfVxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eShmaWxldHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKGZpbGV0eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmJztcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAncGRmJykge1xuICAgICAgaWYgKHRoaXMuZm9ybUVudHJ5KSB7XG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYgLCBhcHBsaWNhdGlvbi9wZGYnO1xuICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnbGl2ZUNhbWVyYScpIHtcbiAgICAgIHRoaXMubGl2ZUNhbWVyYSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSB0cnVlO1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoKSB7XG4gICAgdGhpcy51cGxvYWREYXRhLmVtaXQodGhpcy5maWxlTGlzdCk7XG4gICAgdGhpcy5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgTWVyZ2VJbWFnZXMoKSB7XG4gICAgY29uc3QgZG9jID0gbmV3IGpzUERGKHsgY29tcHJlc3M6IHRydWUgfSk7XG4gICAgZG9jLnBhZ2UgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5maWxlTGlzdFtpXS5kYXRhIHx8IHRoaXMuZmlsZUxpc3RbaV0uaW1hZ2VBc0RhdGFVcmw7XG4gICAgICBkb2MuYWRkSW1hZ2UoaW1hZ2VEYXRhLCAnSlBHJywgMTAsIDEwLCAxOTAsIDI3MCwgdW5kZWZpbmVkLCAnRkFTVCcpO1xuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcbiAgICAgIGRvYy5zZXRGb250VHlwZSgnbm9ybWFsJyk7XG4gICAgICBkb2MudGV4dCgxODAsIDI5MCwgJ3BhZ2UgJyArIGRvYy5wYWdlKTtcbiAgICAgIGRvYy5wYWdlKys7XG4gICAgICBpZiAoaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRvYy5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgIHRpdGxlOiAnQW1wYXRoIE1lZGljYWwgRGF0YScsXG4gICAgICBhdXRob3I6ICdQT0MnLFxuICAgICAgY3JlYXRvcjogJ0FNUEFUSCdcbiAgICB9KTtcbiAgICBkb2MuZGVsZXRlUGFnZSh0aGlzLmZpbGVMaXN0Lmxlbmd0aCArIDEpO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBkb2Mub3V0cHV0KCdkYXRhdXJpc3RyaW5nJyk7XG4gICAgY29uc3QgcmUgPSAvZmlsZW5hbWU9Z2VuZXJhdGVkLnBkZjsvZ2k7XG4gICAgY29uc3QgZGF0YSA9IG91dHB1dC5yZXBsYWNlKHJlLCAnJyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGRhdGEsXG4gICAgfTtcbiAgICBpZiAodGhpcy5mb3JtRW50cnkpIHtcbiAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXJscyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2UgPSAnVGhlIGltYWdlcyBoYXZlIGJlZW4gbWVyZ2VkIGludG8gb25lIHBkZiwgWW91IGNhbiBub3cgdXBsb2FkJztcbiAgICB0aGlzLm1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfSwgMzAwMCk7XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMuc2luZ2xlRmlsZSA9IGZhbHNlO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSB0cnVlO1xuXG4gIH1cbiAgcHVibGljIGRlbGV0ZSh1cmxzOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh1cmxzLmRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5kYXRhID09PSB1cmxzLmRhdGEpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5pbWFnZUFzRGF0YVVybCA9PT0gdXJscy5pbWFnZUFzRGF0YVVybCkge1xuICAgICAgICAgIHRoaXMudXJscy5zcGxpY2UoaSk7XG4gICAgICAgICAgdGhpcy5maWxlTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZW5hYmxpbmcgbWVyZ2UgYnV0dG9uIGlmIHJlbWFpbmluZyBvbiB1cmxzIGlzIGltYWdlc1xuICAgIGNvbnN0IHJlID0gL3BkZi9naTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy51cmxzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKHRoaXMudXJsc1tpbmRleF0uZGF0YS5zZWFyY2gocmUpID09PSAtMSkge1xuICAgICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZXJnZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0cmlnZ2VyU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVXZWJjYW0oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93V2ViY2FtID0gIXRoaXMuc2hvd1dlYmNhbTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbml0RXJyb3IoZXJyb3I6IFdlYmNhbUluaXRFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIHNob3dOZXh0V2ViY2FtKGRpcmVjdGlvbk9yRGV2aWNlSWQ6IGJvb2xlYW4gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyB0cnVlID0+IG1vdmUgZm9yd2FyZCB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBmYWxzZSA9PiBtb3ZlIGJhY2t3YXJkcyB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBzdHJpbmcgPT4gbW92ZSB0byBkZXZpY2Ugd2l0aCBnaXZlbiBkZXZpY2VJZFxuICAgIHRoaXMubmV4dFdlYmNhbS5uZXh0KGRpcmVjdGlvbk9yRGV2aWNlSWQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUltYWdlKHdlYmNhbUltYWdlOiBXZWJjYW1JbWFnZSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmVjZWl2ZWQgd2ViY2FtIGltYWdlJywgd2ViY2FtSW1hZ2UpO1xuICAgIGlmICh0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMudXJscyA9IFtdO1xuICAgICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgICAgdGhpcy5wdXNoRGF0YSh3ZWJjYW1JbWFnZSk7XG5cbiAgICB9XG4gICAgdGhpcy5wdXNoRGF0YSh3ZWJjYW1JbWFnZSk7XG4gIH1cbiAgcHVibGljIHB1c2hEYXRhKHdlYmNhbUltYWdlKSB7XG4gICAgdGhpcy51cmxzLnB1c2god2ViY2FtSW1hZ2UpO1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaCh3ZWJjYW1JbWFnZSk7XG4gIH1cblxuICBwdWJsaWMgY2FtZXJhV2FzU3dpdGNoZWQoZGV2aWNlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhY3RpdmUgZGV2aWNlOiAnICsgZGV2aWNlSWQpO1xuICAgIHRoaXMuZGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJpZ2dlck9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmV4dFdlYmNhbU9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMubmV4dFdlYmNhbS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7V2ViY2FtTW9kdWxlfSBmcm9tICduZ3gtd2ViY2FtJztcclxuXHJcbmltcG9ydCB7IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgV2ViY2FtTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiU3ViamVjdCIsIldlYmNhbVV0aWwiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiQ29tcG9uZW50IiwiTkdfVkFMVUVfQUNDRVNTT1IiLCJmb3J3YXJkUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiV2ViY2FtTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7cUNBSkQ7S0FRQzs7SUNSRDs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkE0RnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDOzs7Ozs7O1FDeEdLLElBQUksSUFBRzs7SUFFYixDQUFDLENBQUE7O1FBRUQ7WUF3SVMsU0FBSSxHQUFHLElB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