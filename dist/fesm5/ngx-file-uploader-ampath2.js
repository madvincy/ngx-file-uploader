import { Injectable, NgModule, defineInjectable, EventEmitter, Component, forwardRef, Input, Output } from '@angular/core';
import { __values } from 'tslib';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { WebcamUtil, WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFileUploaderService = /** @class */ (function () {
    function NgxFileUploaderService() {
    }
    NgxFileUploaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgxFileUploaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxFileUploaderService.ngInjectableDef = defineInjectable({ factory: function NgxFileUploaderService_Factory() { return new NgxFileUploaderService(); }, token: NgxFileUploaderService, providedIn: "root" });
    return NgxFileUploaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () {
    // placeholder call backs
});
var NgxFileUploaderComponent = /** @class */ (function () {
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
        this.fileChanged = new EventEmitter();
        this.uploadData = new EventEmitter();
        this._onClear = new EventEmitter();
        this.showWebcam = true;
        this.allowCameraSwitch = true;
        this.multipleWebcamsAvailable = false;
        this.videoOptions = {};
        this.errors = [];
        // latest snapshot
        this.webcamImage = null;
        // webcam snapshot trigger
        this.trigger = new Subject();
        // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
        this.nextWebcam = new Subject();
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
        WebcamUtil.getAvailableVideoInputs()
            .then((/**
         * @param {?} mediaDevices
         * @return {?}
         */
        function (mediaDevices) {
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
                fileReader.onload = (/**
                 * @param {?} fileLoadedEvent
                 * @return {?}
                 */
                function (fileLoadedEvent) {
                    /** @type {?} */
                    var data = fileReader.result;
                    /** @type {?} */
                    var name = file.name;
                    /** @type {?} */
                    var fileSize = Math.round(file.size / 1024);
                    if (fileSize >= 3000) {
                        _this.message = 'File Too large';
                        _this.messageType = 'danger';
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        setTimeout((/**
         * @return {?}
         */
        function () {
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
         */
        function () {
            return this.trigger.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxFileUploaderComponent.prototype, "nextWebcamObservable", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nextWebcam.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NgxFileUploaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-file-uploader',
                    template: "<div *ngIf=\"message\" class=\"alert alert-{{messageType}} alert-dismissible\" role=\"alert\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span\n        aria-hidden=\"true\">&times;</span></button> {{message}}\n  </div>\n<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-primary\" type=\"button\" (click)=\"back()\" >\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n</button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n    <div class=\"card\">\n        <div class=\"card-body\">\n            {{value}} \n            <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                <span class=\"glyphicon glyphicon-remove\"></span> Clear</button>\n        </div>\n      </div>\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n  <label for=\"pdf\">PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div *ngIf=\"both\" class=\"row-cb\">\n  <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n  <label  for=\"both\">Image & PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n  <label for=\"camera\" >Live Camera</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n  </div>\n</div>\n<div [hidden]=\"!urls[0]\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">SELECTED FILES</div>\n  <div class=\"panel-body\">\n      <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n          <a class = \"columne\" id = \"caption\">\n           <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\" [src]=\"url.data || url.imageAsDataUrl\" \n           onError=\"this.onerror=null;this.src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' ;\" class=\"rounded mb-3\" width=\"100\" height=\"200\">\n           <div class=\"text\"><h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"  style=\"color: red; font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE</h2></div>\n          </a>\n         </div>\n    </div>\n    <div class=\"panel-footer\">\n        <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button pull-right\">\n            <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n        </button>\n        <button *ngIf=\"!pdfAvailable && fileUpload || liveCamera || merge\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"  title=\"merge the images as pages in one pdf document\"  class=\"btn btn-default image-preview-clear\">\n          <span class=\"glyphicon glyphicon-upload\"></span> Merge Files\n        </button>\n    </div>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n    </button>\n    <button type=\"button\" (click)=\"upload()\" class=\"button\">\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload\n</button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"liveCamera\">\n  <div style=\"text-align:center\">\n    <div>\n      <webcam [height]=\"700\" [width]=\"600\" [trigger]=\"triggerObservable\" (imageCapture)=\"handleImage($event)\" *ngIf=\"showWebcam\"\n              [allowCameraSwitch]=\"allowCameraSwitch\" [switchCamera]=\"nextWebcamObservable\"\n              [videoOptions]=\"videoOptions\"\n              [imageQuality]=\"1\"\n              (cameraSwitched)=\"cameraWasSwitched($event)\"\n              (initError)=\"handleInitError($event)\"\n      ></webcam>\n      <br/>\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"triggerSnapshot();\"><span class=\"glyphicon glyphicon-camera\"></span>Take A Snapshot</button>\n      <!-- <button class=\"actionBtn\" (click)=\"toggleWebcam();\">Toggle Webcam</button> -->\n      <!-- <br/> -->\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"showNextWebcam(true);\" [disabled]=\"!multipleWebcamsAvailable\">Change Camera</button>\n      <!-- <input id=\"cameraSwitchCheckbox\" type=\"checkbox\" [(ngModel)]=\"allowCameraSwitch\"><label for=\"cameraSwitchCheckbox\">Allow Camera Switch</label>\n      <br/> -->\n      <!-- DeviceId: <input id=\"deviceId\" type=\"text\" [(ngModel)]=\"deviceId\" style=\"width: 500px\">\n      <button (click)=\"showNextWebcam(deviceId);\">Activate</button> -->\n    </div>\n  </div>\n  <h4 *ngIf=\"errors.length > 0\">Messages:</h4>\n  <ul *ngFor=\"let error of errors\">\n    <li>{{error | json}}</li>\n  </ul>\n</div>\n\n\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NgxFileUploaderComponent; })), multi: true
                        }
                    ],
                    styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:200px}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:blur(4px);filter:blur(4px)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
                }] }
    ];
    NgxFileUploaderComponent.propDecorators = {
        singleFile: [{ type: Input }],
        formEntry: [{ type: Input }],
        source: [{ type: Input }],
        fileChanged: [{ type: Output }],
        uploadData: [{ type: Output }],
        _onClear: [{ type: Output }]
    };
    return NgxFileUploaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxFileUploaderModule = /** @class */ (function () {
    function NgxFileUploaderModule() {
    }
    NgxFileUploaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, FormsModule, WebcamModule
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

export { NgxFileUploaderService, NgxFileUploaderComponent, NgxFileUploaderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi9saWIvbmd4LWZpbGUtdXBsb2FkZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi9saWIvbmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtZmlsZS11cGxvYWRlci1hbXBhdGgyL2xpYi9uZ3gtZmlsZS11cGxvYWRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxuICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCDDicK1Q29uc29sZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlJztcbmltcG9ydCBqc1BERiBmcm9tICdqc3BkZic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBXZWJjYW1JbWFnZSwgV2ViY2FtSW5pdEVycm9yLCBXZWJjYW1VdGlsIH0gZnJvbSAnbmd4LXdlYmNhbSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG4gIC8vIHBsYWNlaG9sZGVyIGNhbGwgYmFja3Ncbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1maWxlLXVwbG9hZGVyJyxcbiAgc3R5bGVzOiBbYC5idG4tZmlsZXtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmJ0bi1maWxlIGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttaW4td2lkdGg6MTAwJTttaW4taGVpZ2h0OjEwMCU7Zm9udC1zaXplOjEwMHB4O3RleHQtYWxpZ246cmlnaHQ7b3BhY2l0eTowO291dGxpbmU6MDtiYWNrZ3JvdW5kOiNmZmY7Y3Vyc29yOmluaGVyaXQ7ZGlzcGxheTpibG9ja30jaW1nLXVwbG9hZHt3aWR0aDoyMDBweH0uaW1hZ2UtcHJldmlldy1pbnB1dCBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7bWFyZ2luOjA7cGFkZGluZzowO2ZvbnQtc2l6ZToyMHB4O2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MH0uZmlsZS11cGxvYWR7YmFja2dyb3VuZC1jb2xvcjojZmZmO3dpZHRoOjYwMHB4O21hcmdpbjowIGF1dG87cGFkZGluZzoyMHB4fS5maWxlLXVwbG9hZC1idG57d2lkdGg6MTAwJTttYXJnaW46MDtjb2xvcjojZmZmO2JhY2tncm91bmQ6IzFmYjI2NDtib3JkZXI6bm9uZTtwYWRkaW5nOjEwcHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLWJvdHRvbTo0cHggc29saWQgIzE1ODI0Yjt0cmFuc2l0aW9uOi4ycztvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjcwMH11bHtsaXN0LXN0eWxlLXR5cGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjB9LmZpbGUtdXBsb2FkLWJ0bjpob3ZlcntiYWNrZ3JvdW5kOiMxYWEwNTk7Y29sb3I6I2ZmZjt0cmFuc2l0aW9uOi4ycztjdXJzb3I6cG9pbnRlcn0uZmlsZS11cGxvYWQtYnRuOmFjdGl2ZXtib3JkZXI6MDt0cmFuc2l0aW9uOi4yc30uZmlsZS11cGxvYWQtY29udGVudHtkaXNwbGF5Om5vbmU7dGV4dC1hbGlnbjpjZW50ZXJ9LmZpbGUtdXBsb2FkLWlucHV0e3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO291dGxpbmU6MDtvcGFjaXR5OjA7Y3Vyc29yOnBvaW50ZXJ9LmltYWdlLXVwbG9hZC13cmFwe21hcmdpbi10b3A6MjBweDtib3JkZXI6NHB4IGRhc2hlZCAjMzY4M2M3O3Bvc2l0aW9uOnJlbGF0aXZlfS5pbWFnZS1kcm9wcGluZywuaW1hZ2UtdXBsb2FkLXdyYXA6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzM3YWI3O2JvcmRlcjo0cHggZGFzaGVkICNmZmZ9LmltYWdlLXRpdGxlLXdyYXB7cGFkZGluZzowIDE1cHggMTVweDtjb2xvcjojMjIyfS5kcmFnLXRleHR7dGV4dC1hbGlnbjpjZW50ZXJ9LmRyYWctdGV4dCBoM3tmb250LXdlaWdodDoxMDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOiMxNTVhODI7cGFkZGluZzo2MHB4IDB9LmZpbGUtdXBsb2FkLWltYWdle21heC1oZWlnaHQ6MjAwcHg7bWF4LXdpZHRoOjIwMHB4O21hcmdpbjphdXRvO3BhZGRpbmc6MjBweH0uYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NnB4IDEycHg7bWFyZ2luLWJvdHRvbTowO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO3RleHQtYWxpZ246Y2VudGVyO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbjtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDRhN2Y7Ym9yZGVyOm5vbmU7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LWFuaW1hdGlvbjoxLjVzIGluZmluaXRlIGdsb3dpbmc7YW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZ31ALXdlYmtpdC1rZXlmcmFtZXMgZ2xvd2luZ3swJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDJmYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0Oy13ZWJraXQtYm94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fTEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9fUBrZXlmcmFtZXMgZ2xvd2luZ3swJSwxMDAle2JhY2tncm91bmQtY29sb3I6IzAwNWNiMjtib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0O2JveC1zaGFkb3c6MCAwIDQwcHggIzIwMzg2NH19LmFjdGlvbkJ0bnttYXJnaW4tdG9wOjVweDttYXJnaW4tYm90dG9tOjJweDtmb250LXNpemU6MS4yZW19bGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTo1cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1yaWdodDoxMHB4fS5yb3ctY2J7bWFyZ2luOmF1dG87Zm9udC1zaXplOjE1cHh9LnJvdy1jYiBsYWJlbHtmbG9hdDpsZWZ0fS5yb3ctY2Igc3BhbntmbG9hdDpsZWZ0O3RleHQtYWxpZ246bGVmdH0uc25hcHNob3R7dGV4dC1hbGlnbjpjZW50ZXJ9LnNuYXBzaG90IGltZ3ttYXgtd2lkdGg6ODAwcHg7bWF4LWhlaWdodDo4MDBweH0uY29sdW1uZSNjYXB0aW9uIC50ZXh0IGgxe21hcmdpbjowO2NvbG9yOiNmZmZ9LmNvbHVtbmUjY2FwdGlvbjpob3ZlciAudGV4dHtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eToxfS5jb2x1bW5lI2NhcHRpb257cG9zaXRpb246cmVsYXRpdmV9LmNvbHVtbmUjY2FwdGlvbiAudGV4dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4OjEwO29wYWNpdHk6MDt0cmFuc2l0aW9uOi44c30uY29sdW1uZSNjYXB0aW9uOmhvdmVyIGltZ3std2Via2l0LWZpbHRlcjpibHVyKDRweCk7ZmlsdGVyOmJsdXIoNHB4KX1AbWVkaWEgKG1heC13aWR0aDo2MjlweCl7LmZpbGUtdXBsb2FkLWlucHV0e2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fWBdLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJtZXNzYWdlXCIgY2xhc3M9XCJhbGVydCBhbGVydC17e21lc3NhZ2VUeXBlfX0gYWxlcnQtZGlzbWlzc2libGVcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj4ge3ttZXNzYWdlfX1cclxuICA8L2Rpdj5cclxuPGRpdiAqbmdJZj1cImJhY2tCdXR0b25cIj5cclxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiYmFjaygpXCIgPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1sZWZ0XCI+PC9zcGFuPiBCYWNrXHJcbjwvYnV0dG9uPlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cInNlbGVjdEZpbGVUeXBlXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAge3t2YWx1ZX19IFxyXG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCI+PC9zcGFuPiBDbGVhcjwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlVQTE9BRCBGSUxFIFRZUEU8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cImltYWdlXCIgaWQ9XCJpbWFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2ltYWdlJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICAgICAgPGxhYmVsIGZvcj1cImltYVwiPkltYWdlPC9sYWJlbD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgPHNwYW4+PGlucHV0IG5hbWU9XCJvcHRpb25cIiBpZD1cInBkZlwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgncGRmJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICA8bGFiZWwgZm9yPVwicGRmXCI+UERGPC9sYWJlbD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgKm5nSWY9XCJib3RoXCIgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwiYm90aFwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnYm90aCcpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XHJcbiAgPGxhYmVsICBmb3I9XCJib3RoXCI+SW1hZ2UgJiBQREY8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gIDxzcGFuPjxpbnB1dCBuYW1lPVwiY2FtZXJhXCIgaWQ9XCJjYW1lcmFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2xpdmVDYW1lcmEnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCBmb3I9XCJjYW1lcmFcIiA+TGl2ZSBDYW1lcmE8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgW2hpZGRlbl09XCIhdXJsc1swXVwiIGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+U0VMRUNURUQgRklMRVM8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICpuZ0Zvcj1cImxldCB1cmwgb2YgdXJscztsZXQgaT1pbmRleFwiPlxyXG4gICAgICAgICAgPGEgY2xhc3MgPSBcImNvbHVtbmVcIiBpZCA9IFwiY2FwdGlvblwiPlxyXG4gICAgICAgICAgIDxpbWcgc3R5bGU9XCIgYm9yZGVyOiAxcHggc29saWQgcmdiKDk3LCA5NywgOTcpOyBtYXJnaW46IDJweDsgYm9yZGVyLXJhZGl1czogNHB4O3BhZGRpbmc6IDVweDtcIiBpZD1cImltZ3t7aX19XCIgW3NyY109XCJ1cmwuZGF0YSB8fCB1cmwuaW1hZ2VBc0RhdGFVcmxcIiBcclxuICAgICAgICAgICBvbkVycm9yPVwidGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9J2h0dHBzOi8vc3RvcmUtaW1hZ2VzLnMtbWljcm9zb2Z0LmNvbS9pbWFnZS9hcHBzLjM0OTYxLjEzNTEwNzk4ODg3NjIxOTYyLjQ3YjYyYzRjLWEwYzYtNGUzYy04N2JiLTUwOTMxN2Q5YzM2NC5hNjM1NGI0OC1jNjhhLTQ3ZmEtYjY5ZS00Y2I1OTJkNDJmZmM/bW9kZT1zY2FsZSZxPTkwJmg9MzAwJnc9MzAwJyA7XCIgY2xhc3M9XCJyb3VuZGVkIG1iLTNcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjIwMFwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+PGgyIHRpdGxlPVwiQ2xpY2sgdG8gRGVsZXRlIEZpbGUge3t1cmwubmFtZX19XCIgKGNsaWNrKT1cImRlbGV0ZSh1cmwpXCIgIHN0eWxlPVwiY29sb3I6IHJlZDsgZm9udC1mYW1pbHk6IGZhbnRhc3k7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCI+PC9zcGFuPlJFTU9WRTwvaDI+PC9kaXY+XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZm9vdGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIlVwbG9hZENhcHRpb25zXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uIHB1bGwtcmlnaHRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gVXBsb2FkIEZpbGVzXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFwZGZBdmFpbGFibGUgJiYgZmlsZVVwbG9hZCB8fCBsaXZlQ2FtZXJhIHx8IG1lcmdlXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhdXJsc1sxXVwiIChjbGljayk9XCJNZXJnZUltYWdlcygpXCIgIHRpdGxlPVwibWVyZ2UgdGhlIGltYWdlcyBhcyBwYWdlcyBpbiBvbmUgcGRmIGRvY3VtZW50XCIgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IE1lcmdlIEZpbGVzXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgKm5nSWY9XCJmaWxlVXBsb2FkXCI+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiByZWFkb25seSBbKG5nTW9kZWwpXT1cInZhbHVlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctaW5wdXRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZm9sZGVyLW9wZW5cIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbWFnZS1wcmV2aWV3LWlucHV0LXRpdGxlXCI+U0VMRUNUIEZJTEU8L3NwYW4+XHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIG11bHRpcGxlIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgLz4gXHJcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIW11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgIC8+IFxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbGVhcigpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCI+PC9zcGFuPiBDbGVhclxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkKClcIiBjbGFzcz1cImJ1dHRvblwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWRcclxuPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwiIW1vYmlsZVwiIGNsYXNzPVwiaW1hZ2UtdXBsb2FkLXdyYXBcIj5cclxuICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbnB1dFwiIHR5cGU9J2ZpbGUnIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIG11bHRpcGxlIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIC8+XHJcbiAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJkcmFnLXRleHRcIj5cclxuICAgICAgPGgzPkRyYWcgYW5kIERyb3AgZmlsZShzKTwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgKm5nSWY9XCJsaXZlQ2FtZXJhXCI+XHJcbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8d2ViY2FtIFtoZWlnaHRdPVwiNzAwXCIgW3dpZHRoXT1cIjYwMFwiIFt0cmlnZ2VyXT1cInRyaWdnZXJPYnNlcnZhYmxlXCIgKGltYWdlQ2FwdHVyZSk9XCJoYW5kbGVJbWFnZSgkZXZlbnQpXCIgKm5nSWY9XCJzaG93V2ViY2FtXCJcclxuICAgICAgICAgICAgICBbYWxsb3dDYW1lcmFTd2l0Y2hdPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIiBbc3dpdGNoQ2FtZXJhXT1cIm5leHRXZWJjYW1PYnNlcnZhYmxlXCJcclxuICAgICAgICAgICAgICBbdmlkZW9PcHRpb25zXT1cInZpZGVvT3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgW2ltYWdlUXVhbGl0eV09XCIxXCJcclxuICAgICAgICAgICAgICAoY2FtZXJhU3dpdGNoZWQpPVwiY2FtZXJhV2FzU3dpdGNoZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgKGluaXRFcnJvcik9XCJoYW5kbGVJbml0RXJyb3IoJGV2ZW50KVwiXHJcbiAgICAgID48L3dlYmNhbT5cclxuICAgICAgPGJyLz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCIgKGNsaWNrKT1cInRyaWdnZXJTbmFwc2hvdCgpO1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYW1lcmFcIj48L3NwYW4+VGFrZSBBIFNuYXBzaG90PC9idXR0b24+XHJcbiAgICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cImFjdGlvbkJ0blwiIChjbGljayk9XCJ0b2dnbGVXZWJjYW0oKTtcIj5Ub2dnbGUgV2ViY2FtPC9idXR0b24+IC0tPlxyXG4gICAgICA8IS0tIDxici8+IC0tPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0odHJ1ZSk7XCIgW2Rpc2FibGVkXT1cIiFtdWx0aXBsZVdlYmNhbXNBdmFpbGFibGVcIj5DaGFuZ2UgQ2FtZXJhPC9idXR0b24+XHJcbiAgICAgIDwhLS0gPGlucHV0IGlkPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImFsbG93Q2FtZXJhU3dpdGNoXCI+PGxhYmVsIGZvcj1cImNhbWVyYVN3aXRjaENoZWNrYm94XCI+QWxsb3cgQ2FtZXJhIFN3aXRjaDwvbGFiZWw+XHJcbiAgICAgIDxici8+IC0tPlxyXG4gICAgICA8IS0tIERldmljZUlkOiA8aW5wdXQgaWQ9XCJkZXZpY2VJZFwiIHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJkZXZpY2VJZFwiIHN0eWxlPVwid2lkdGg6IDUwMHB4XCI+XHJcbiAgICAgIDxidXR0b24gKGNsaWNrKT1cInNob3dOZXh0V2ViY2FtKGRldmljZUlkKTtcIj5BY3RpdmF0ZTwvYnV0dG9uPiAtLT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxoNCAqbmdJZj1cImVycm9ycy5sZW5ndGggPiAwXCI+TWVzc2FnZXM6PC9oND5cclxuICA8dWwgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiPlxyXG4gICAgPGxpPnt7ZXJyb3IgfCBqc29ufX08L2xpPlxyXG4gIDwvdWw+XHJcbjwvZGl2PlxyXG5cclxuXHJcbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHVibGljIHVybHMgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgZmlsZVR5cGU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2UgPSAnJztcbiAgcHVibGljIG1lc3NhZ2VUeXBlID0gJyc7XG4gIHB1YmxpYyBsaXZlQ2FtZXJhID0gZmFsc2U7XG4gIHB1YmxpYyBwZGZBdmFpbGFibGUgPSBmYWxzZTtcbiAgcHVibGljIG1vYmlsZSA9IGZhbHNlO1xuICBwdWJsaWMgVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIHNpbmdsZUZpbGU6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGZvcm1FbnRyeTogYW55O1xuICBwdWJsaWMgbXVsdGlwbGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZVVwbG9hZCA9IGZhbHNlO1xuICBwdWJsaWMgYm90aCA9IHRydWU7XG4gIHB1YmxpYyBtZXJnZSA9IGZhbHNlO1xuICBwdWJsaWMgYmFja0J1dHRvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZmlsZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZERhdGE6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIF9vbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIF9pbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIHNob3dXZWJjYW0gPSB0cnVlO1xuICBwdWJsaWMgYWxsb3dDYW1lcmFTd2l0Y2ggPSB0cnVlO1xuICBwdWJsaWMgbXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gZmFsc2U7XG4gIHB1YmxpYyBkZXZpY2VJZDogc3RyaW5nO1xuICBwdWJsaWMgdmlkZW9PcHRpb25zOiBNZWRpYVRyYWNrQ29uc3RyYWludHMgPSB7XG4gICAgLy8gd2lkdGg6IHtpZGVhbDogMTAyNH0sXG4gICAgLy8gaGVpZ2h0OiB7aWRlYWw6IDU3Nn1cbiAgfTtcbiAgcHVibGljIGVycm9yczogV2ViY2FtSW5pdEVycm9yW10gPSBbXTtcblxuICAvLyBsYXRlc3Qgc25hcHNob3RcbiAgcHVibGljIHdlYmNhbUltYWdlOiBXZWJjYW1JbWFnZSA9IG51bGw7XG5cbiAgLy8gd2ViY2FtIHNuYXBzaG90IHRyaWdnZXJcbiAgcHJpdmF0ZSB0cmlnZ2VyOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgLy8gc3dpdGNoIHRvIG5leHQgLyBwcmV2aW91cyAvIHNwZWNpZmljIHdlYmNhbTsgdHJ1ZS9mYWxzZTogZm9yd2FyZC9iYWNrd2FyZHMsIHN0cmluZzogZGV2aWNlSWRcbiAgcHJpdmF0ZSBuZXh0V2ViY2FtOiBTdWJqZWN0PGJvb2xlYW4gfCBzdHJpbmc+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbiB8IHN0cmluZz4oKTtcbiAgcHVibGljIHVwbG9hZGluZyA9IGZhbHNlO1xuICAvLyBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMubXVsdGlwbGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuYm90aCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtRW50cnkpIHtcbiAgICAgIHRoaXMuYm90aCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA2OTIpIHsgLy8gNzY4cHggcG9ydHJhaXRcbiAgICAgIHRoaXMubW9iaWxlID0gdHJ1ZTtcbiAgICB9XG4gICAgV2ViY2FtVXRpbC5nZXRBdmFpbGFibGVWaWRlb0lucHV0cygpXG4gICAgICAudGhlbigobWVkaWFEZXZpY2VzOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZSA9IG1lZGlhRGV2aWNlcyAmJiBtZWRpYURldmljZXMubGVuZ3RoID4gMTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXM7XG5cbiAgICBpZiAoZmlsZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICBjb25zdCBuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0KTtcbiAgICAgICAgICBpZiAoZmlsZVNpemUgPj0gMzAwMCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0ZpbGUgVG9vIGxhcmdlJztcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVR5cGUgPSAnZGFuZ2VyJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgIGlkOiB0aGlzLnVybHMubGVuZ3RoICsgMSxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgc2l6ZTogZmlsZVNpemVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgICAgICAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5maWxlQ2hhbmdlZC5lbWl0KHBheWxvYWQpO1xuICAgICAgICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgIHRoaXMudXJscyA9IFtdO1xuICAgIHRoaXMuYmFjaygpO1xuICAgIHRoaXMuX29uQ2xlYXIuZW1pdCgpO1xuICB9XG4gIHB1YmxpYyBiYWNrKCkge1xuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICAgIHRoaXMudXJscyA9IFtdO1xuICAgIHRoaXMuYmFja0J1dHRvbiA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLlVwbG9hZENhcHRpb25zID0gZmFsc2U7XG4gICAgdGhpcy5zaW5nbGVGaWxlID0gZmFsc2U7XG4gICAgdGhpcy5wZGZBdmFpbGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLm1lcmdlID0gZmFsc2U7XG4gICAgdGhpcy5maWxlVXBsb2FkID0gZmFsc2U7XG4gICAgdGhpcy5saXZlQ2FtZXJhID0gZmFsc2U7XG4gIH1cbiAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoZmlsZXR5cGU6IHN0cmluZykge1xuICAgIGlmIChmaWxldHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgdGhpcy5maWxlVHlwZSA9ICdpbWFnZS9wbmcsIGltYWdlL2pwZWcsIGltYWdlL2dpZic7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ3BkZicpIHtcbiAgICAgIGlmICh0aGlzLmZvcm1FbnRyeSkge1xuICAgICAgICB0aGlzLm11bHRpcGxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmICwgYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2xpdmVDYW1lcmEnKSB7XG4gICAgICB0aGlzLmxpdmVDYW1lcmEgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gZmFsc2U7XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gdHJ1ZTtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKCkge1xuICAgIHRoaXMudXBsb2FkRGF0YS5lbWl0KHRoaXMuZmlsZUxpc3QpO1xuICAgIHRoaXMuYmFjaygpO1xuICB9XG5cbiAgcHVibGljIE1lcmdlSW1hZ2VzKCkge1xuICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERih7IGNvbXByZXNzOiB0cnVlIH0pO1xuICAgIGRvYy5wYWdlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuZmlsZUxpc3RbaV0uZGF0YSB8fCB0aGlzLmZpbGVMaXN0W2ldLmltYWdlQXNEYXRhVXJsO1xuICAgICAgZG9jLmFkZEltYWdlKGltYWdlRGF0YSwgJ0pQRycsIDEwLCAxMCwgMTkwLCAyNzAsIHVuZGVmaW5lZCwgJ0ZBU1QnKTtcbiAgICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XG4gICAgICBkb2Muc2V0Rm9udFR5cGUoJ25vcm1hbCcpO1xuICAgICAgZG9jLnRleHQoMTgwLCAyOTAsICdwYWdlICcgKyBkb2MucGFnZSk7XG4gICAgICBkb2MucGFnZSsrO1xuICAgICAgaWYgKGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aCkge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBkb2Muc2V0UHJvcGVydGllcyh7XG4gICAgICB0aXRsZTogJ0FtcGF0aCBNZWRpY2FsIERhdGEnLFxuICAgICAgYXV0aG9yOiAnUE9DJyxcbiAgICAgIGNyZWF0b3I6ICdBTVBBVEgnXG4gICAgfSk7XG4gICAgZG9jLmRlbGV0ZVBhZ2UodGhpcy5maWxlTGlzdC5sZW5ndGggKyAxKTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jLm91dHB1dCgnZGF0YXVyaXN0cmluZycpO1xuICAgIGNvbnN0IHJlID0gL2ZpbGVuYW1lPWdlbmVyYXRlZC5wZGY7L2dpO1xuICAgIGNvbnN0IGRhdGEgPSBvdXRwdXQucmVwbGFjZShyZSwgJycpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBkYXRhLFxuICAgIH07XG4gICAgaWYgKHRoaXMuZm9ybUVudHJ5KSB7XG4gICAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlID0gJ1RoZSBpbWFnZXMgaGF2ZSBiZWVuIG1lcmdlZCBpbnRvIG9uZSBwZGYsIFlvdSBjYW4gbm93IHVwbG9hZCc7XG4gICAgdGhpcy5tZXNzYWdlVHlwZSA9ICdzdWNjZXNzJztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgIH0sIDMwMDApO1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICB0aGlzLnNpbmdsZUZpbGUgPSBmYWxzZTtcbiAgICB0aGlzLlVwbG9hZENhcHRpb25zID0gdHJ1ZTtcblxuICB9XG4gIHB1YmxpYyBkZWxldGUodXJsczogYW55KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy51cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodXJscy5kYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uZGF0YSA9PT0gdXJscy5kYXRhKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uaW1hZ2VBc0RhdGFVcmwgPT09IHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGkpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVuYWJsaW5nIG1lcmdlIGJ1dHRvbiBpZiByZW1haW5pbmcgb24gdXJscyBpcyBpbWFnZXNcbiAgICBjb25zdCByZSA9IC9wZGYvZ2k7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudXJscy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmICh0aGlzLnVybHNbaW5kZXhdLmRhdGEuc2VhcmNoKHJlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVyZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwdWJsaWMgdHJpZ2dlclNuYXBzaG90KCk6IHZvaWQge1xuICAgIHRoaXMudHJpZ2dlci5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlV2ViY2FtKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1dlYmNhbSA9ICF0aGlzLnNob3dXZWJjYW07XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlSW5pdEVycm9yKGVycm9yOiBXZWJjYW1Jbml0RXJyb3IpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93TmV4dFdlYmNhbShkaXJlY3Rpb25PckRldmljZUlkOiBib29sZWFuIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gdHJ1ZSA9PiBtb3ZlIGZvcndhcmQgdGhyb3VnaCBkZXZpY2VzXG4gICAgLy8gZmFsc2UgPT4gbW92ZSBiYWNrd2FyZHMgdGhyb3VnaCBkZXZpY2VzXG4gICAgLy8gc3RyaW5nID0+IG1vdmUgdG8gZGV2aWNlIHdpdGggZ2l2ZW4gZGV2aWNlSWRcbiAgICB0aGlzLm5leHRXZWJjYW0ubmV4dChkaXJlY3Rpb25PckRldmljZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbWFnZSh3ZWJjYW1JbWFnZTogV2ViY2FtSW1hZ2UpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmluZm8oJ3JlY2VpdmVkIHdlYmNhbSBpbWFnZScsIHdlYmNhbUltYWdlKTtcbiAgICBpZiAodGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLnVybHMgPSBbXTtcbiAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMucHVzaERhdGEod2ViY2FtSW1hZ2UpO1xuXG4gICAgfVxuICAgIHRoaXMucHVzaERhdGEod2ViY2FtSW1hZ2UpO1xuICB9XG4gIHB1YmxpYyBwdXNoRGF0YSh3ZWJjYW1JbWFnZSkge1xuICAgIHRoaXMudXJscy5wdXNoKHdlYmNhbUltYWdlKTtcbiAgICB0aGlzLmZpbGVMaXN0LnB1c2god2ViY2FtSW1hZ2UpO1xuICB9XG5cbiAgcHVibGljIGNhbWVyYVdhc1N3aXRjaGVkKGRldmljZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBjb25zb2xlLmxvZygnYWN0aXZlIGRldmljZTogJyArIGRldmljZUlkKTtcbiAgICB0aGlzLmRldmljZUlkID0gZGV2aWNlSWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRyaWdnZXJPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5leHRXZWJjYW1PYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLm5leHRXZWJjYW0uYXNPYnNlcnZhYmxlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1dlYmNhbU1vZHVsZX0gZnJvbSAnbmd4LXdlYmNhbSc7XHJcblxyXG5pbXBvcnQgeyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL25neC1maWxlLXVwbG9hZGVyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFdlYmNhbU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4RmlsZVVwbG9hZGVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RmlsZVVwbG9hZGVyTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7aUNBSkQ7Q0FRQzs7Ozs7OztJQ0dLLElBQUk7OztBQUFHOztDQUVaLENBQUE7O0lBRUQ7UUF3SVMsU0FBSSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsYUFBUSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFFNUIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FB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