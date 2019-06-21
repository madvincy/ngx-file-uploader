/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { WebcamUtil } from 'ngx-webcam';
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () {
    // placeholder call backs
});
var ɵ0 = noop;
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
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
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
export { NgxFileUploaderComponent };
if (false) {
    /** @type {?} */
    NgxFileUploaderComponent.prototype.urls;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.selectFileType;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileList;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileType;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.message;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.messageType;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.liveCamera;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.pdfAvailable;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.mobile;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.UploadCaptions;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.singleFile;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.formEntry;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.multiple;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileUpload;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.both;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.merge;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.backButton;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.source;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileChanged;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.uploadData;
    /** @type {?} */
    NgxFileUploaderComponent.prototype._onClear;
    /** @type {?} */
    NgxFileUploaderComponent.prototype._imagePath;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.showWebcam;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.allowCameraSwitch;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.multipleWebcamsAvailable;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.deviceId;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.videoOptions;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.errors;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.webcamImage;
    /**
     * @type {?}
     * @private
     */
    NgxFileUploaderComponent.prototype.trigger;
    /**
     * @type {?}
     * @private
     */
    NgxFileUploaderComponent.prototype.nextWebcam;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.uploading;
    /**
     * @type {?}
     * @private
     */
    NgxFileUploaderComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    NgxFileUploaderComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    NgxFileUploaderComponent.prototype.onChangeCallback;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQ3pCLE1BQU0sRUFBRSxZQUFZLEVBQ2hDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekUsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBRWhFLElBQUk7OztBQUFHO0lBQ1gseUJBQXlCO0FBQzNCLENBQUMsQ0FBQTs7QUFFRDtJQUFBO1FBd0lTLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBRTVCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUd2QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRVQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTNELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUVqQyxpQkFBWSxHQUEwQixFQUc1QyxDQUFDO1FBQ0ssV0FBTSxHQUFzQixFQUFFLENBQUM7UUFFdEMsa0JBQWtCO1FBQ1gsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRXZDLDBCQUEwQjtRQUNsQixZQUFPLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDckQsK0ZBQStGO1FBQ3ZGLGVBQVUsR0FBOEIsSUFBSSxPQUFPLEVBQW9CLENBQUM7UUFDekUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QiwwQkFBMEI7UUFDbEIsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUU3QiwyREFBMkQ7UUFDM0QsZ0NBQWdDO1FBQ3hCLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO0lBeVFwRCxDQUFDOzs7O0lBdFFRLDJDQUFROzs7SUFBZjtRQUFBLGlCQWNDO1FBYkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0QsVUFBVSxDQUFDLHVCQUF1QixFQUFFO2FBQ2pDLElBQUk7Ozs7UUFBQyxVQUFDLFlBQStCO1lBQ3BDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUUsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Qsc0JBQUksMkNBQUs7UUFEVCxlQUFlOzs7Ozs7UUFDZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7Ozs7Ozs7UUFDcEQsVUFBVSxDQUFNO1lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDOzs7T0FSQTtJQVNELHVCQUF1Qjs7Ozs7O0lBRWhCLDZDQUFVOzs7Ozs7SUFBakIsVUFBa0IsS0FBVTtRQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFFRCxzQ0FBc0M7Ozs7OztJQUMvQixtREFBZ0I7Ozs7OztJQUF2QixVQUF3QixFQUFPO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHNDQUFzQzs7Ozs7O0lBQy9CLG9EQUFpQjs7Ozs7O0lBQXhCLFVBQXlCLEVBQU87UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRU0seUNBQU07OztJQUFiO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTSwyQ0FBUTs7OztJQUFmLFVBQWdCLEtBQVU7UUFBMUIsaUJBd0NDOztZQXZDTyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLDRCQUE0QjtRQUU1QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29DQUNDLElBQUk7O29CQUNQLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFFbkMsVUFBVSxDQUFDLE1BQU07Ozs7Z0JBQUcsVUFBQyxlQUFvQjs7d0JBQ2pDLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTTs7d0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTs7d0JBQ2hCLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUM3QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQzt3QkFDaEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7d0JBQzVCLFVBQVU7Ozt3QkFBQzs0QkFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDcEIsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNULEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDOzs0QkFDQSxPQUFPLEdBQUc7NEJBQ2QsSUFBSSxNQUFBOzRCQUNKLEVBQUUsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUN4QixJQUFJLEVBQUUsSUFBSTs0QkFDVixJQUFJLEVBQUUsUUFBUTt5QkFDZjt3QkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQy9CLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDZCxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDOztnQkEvQkQsR0FBRyxDQUFDLENBQWUsSUFBQSxVQUFBLGlCQUFBLEtBQUssQ0FBQSw0QkFBQTtvQkFBbkIsSUFBTSxJQUFJLGtCQUFBOzRCQUFKLElBQUk7aUJBK0JkOzs7Ozs7Ozs7UUFFSCxDQUFDOztJQUNILENBQUM7Ozs7SUFFTSx3Q0FBSzs7O0lBQVo7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBQ00sdUNBQUk7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7OztJQUNNLG1EQUFnQjs7OztJQUF2QixVQUF3QixRQUFnQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLGtDQUFrQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXpCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXpCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxvREFBb0QsQ0FBQztZQUNyRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDO0lBRUgsQ0FBQzs7OztJQUVNLHlDQUFNOzs7SUFBYjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7O0lBRU0sOENBQVc7OztJQUFsQjtRQUFBLGlCQTBDQzs7WUF6Q08sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztnQkFDeEMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYztZQUMxRSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLENBQUM7UUFDSCxDQUFDO1FBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUNoQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLFFBQVE7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7WUFDVCxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7O1lBQ3BDLEVBQUUsR0FBRywyQkFBMkI7O1lBQ2hDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7O1lBQzdCLE9BQU8sR0FBRztZQUNkLElBQUksTUFBQTtTQUNMO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsOERBQThELENBQUM7UUFDOUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsVUFBVTs7O1FBQUM7WUFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUU3QixDQUFDOzs7OztJQUNNLHlDQUFNOzs7O0lBQWIsVUFBYyxJQUFTO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEtBQUssQ0FBQztnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7OztZQUVLLEVBQUUsR0FBRyxPQUFPO1FBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsS0FBSyxDQUFDO1lBQ1IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOzs7O0lBQ00sa0RBQWU7OztJQUF0QjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVNLCtDQUFZOzs7SUFBbkI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVNLGtEQUFlOzs7O0lBQXRCLFVBQXVCLEtBQXNCO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU0saURBQWM7Ozs7SUFBckIsVUFBc0IsbUJBQXFDO1FBQ3pELHVDQUF1QztRQUN2QywwQ0FBMEM7UUFDMUMsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFTSw4Q0FBVzs7OztJQUFsQixVQUFtQixXQUF3QjtRQUN6QyxzREFBc0Q7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdCLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBQ00sMkNBQVE7Ozs7SUFBZixVQUFnQixXQUFXO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRU0sb0RBQWlCOzs7O0lBQXhCLFVBQXlCLFFBQWdCO1FBQ3ZDLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQVcsdURBQWlCOzs7O1FBQTVCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwREFBb0I7Ozs7UUFBL0I7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTs7Z0JBOWJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUU3QixRQUFRLEVBQUUsNjJNQTJIWDtvQkFDQyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs7NEJBRTFCLFdBQVcsRUFBRSxVQUFVOzs7NEJBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUk7eUJBQ3JFO3FCQUNGOzZCQW5JUSwwMUZBQTAxRjtpQkFvSXAyRjs7OzZCQVlFLEtBQUs7NEJBQ0wsS0FBSzt5QkFNTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sTUFBTTsyQkFDTixNQUFNOztJQW1TVCwrQkFBQztDQUFBLEFBL2JELElBK2JDO1NBeFRZLHdCQUF3Qjs7O0lBQ25DLHdDQUErQjs7SUFDL0Isa0RBQTZCOztJQUM3Qiw0Q0FBbUM7O0lBQ25DLDRDQUF3Qjs7SUFDeEIsMkNBQW9COztJQUNwQiwrQ0FBd0I7O0lBQ3hCLDhDQUEwQjs7SUFDMUIsZ0RBQTRCOztJQUM1QiwwQ0FBc0I7O0lBQ3RCLGtEQUE4Qjs7SUFDOUIsOENBQWdDOztJQUNoQyw2Q0FBK0I7O0lBQy9CLDRDQUF1Qjs7SUFDdkIsOENBQTBCOztJQUMxQix3Q0FBbUI7O0lBQ25CLHlDQUFxQjs7SUFDckIsOENBQTBCOztJQUMxQiwwQ0FBNEI7O0lBQzVCLCtDQUFxRTs7SUFDckUsOENBQW9FOztJQUNwRSw0Q0FBa0U7O0lBQ2xFLDhDQUEwQjs7SUFDMUIsOENBQXlCOztJQUN6QixxREFBZ0M7O0lBQ2hDLDREQUF3Qzs7SUFDeEMsNENBQXdCOztJQUN4QixnREFHRTs7SUFDRiwwQ0FBc0M7O0lBR3RDLCtDQUF1Qzs7Ozs7SUFHdkMsMkNBQXFEOzs7OztJQUVyRCw4Q0FBZ0Y7O0lBQ2hGLDZDQUF5Qjs7Ozs7SUFFekIsOENBQTZCOzs7OztJQUk3QixxREFBNkM7Ozs7O0lBQzdDLG9EQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgZm9yd2FyZFJlZixcbiAgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgybVDb25zb2xlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy8gaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UnO1xuaW1wb3J0IGpzUERGIGZyb20gJ2pzcGRmJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFdlYmNhbUltYWdlLCBXZWJjYW1Jbml0RXJyb3IsIFdlYmNhbVV0aWwgfSBmcm9tICduZ3gtd2ViY2FtJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbiAgLy8gcGxhY2Vob2xkZXIgY2FsbCBiYWNrc1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWZpbGUtdXBsb2FkZXInLFxuICBzdHlsZXM6IFtgLmJ0bi1maWxle3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uYnRuLWZpbGUgaW5wdXRbdHlwZT1maWxlXXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO21pbi13aWR0aDoxMDAlO21pbi1oZWlnaHQ6MTAwJTtmb250LXNpemU6MTAwcHg7dGV4dC1hbGlnbjpyaWdodDtvcGFjaXR5OjA7b3V0bGluZTowO2JhY2tncm91bmQ6I2ZmZjtjdXJzb3I6aW5oZXJpdDtkaXNwbGF5OmJsb2NrfSNpbWctdXBsb2Fke3dpZHRoOjIwMHB4fS5pbWFnZS1wcmV2aWV3LWlucHV0IGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowfS5maWxlLXVwbG9hZHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6NjAwcHg7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjIwcHh9LmZpbGUtdXBsb2FkLWJ0bnt3aWR0aDoxMDAlO21hcmdpbjowO2NvbG9yOiNmZmY7YmFja2dyb3VuZDojMWZiMjY0O2JvcmRlcjpub25lO3BhZGRpbmc6MTBweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItYm90dG9tOjRweCBzb2xpZCAjMTU4MjRiO3RyYW5zaXRpb246LjJzO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NzAwfXVse2xpc3Qtc3R5bGUtdHlwZTpub25lO21hcmdpbjowO3BhZGRpbmc6MH0uZmlsZS11cGxvYWQtYnRuOmhvdmVye2JhY2tncm91bmQ6IzFhYTA1OTtjb2xvcjojZmZmO3RyYW5zaXRpb246LjJzO2N1cnNvcjpwb2ludGVyfS5maWxlLXVwbG9hZC1idG46YWN0aXZle2JvcmRlcjowO3RyYW5zaXRpb246LjJzfS5maWxlLXVwbG9hZC1jb250ZW50e2Rpc3BsYXk6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uZmlsZS11cGxvYWQtaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3V0bGluZTowO29wYWNpdHk6MDtjdXJzb3I6cG9pbnRlcn0uaW1hZ2UtdXBsb2FkLXdyYXB7bWFyZ2luLXRvcDoyMHB4O2JvcmRlcjo0cHggZGFzaGVkICMzNjgzYzc7cG9zaXRpb246cmVsYXRpdmV9LmltYWdlLWRyb3BwaW5nLC5pbWFnZS11cGxvYWQtd3JhcDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMzdhYjc7Ym9yZGVyOjRweCBkYXNoZWQgI2ZmZn0uaW1hZ2UtdGl0bGUtd3JhcHtwYWRkaW5nOjAgMTVweCAxNXB4O2NvbG9yOiMyMjJ9LmRyYWctdGV4dHt0ZXh0LWFsaWduOmNlbnRlcn0uZHJhZy10ZXh0IGgze2ZvbnQtd2VpZ2h0OjEwMDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Y29sb3I6IzE1NWE4MjtwYWRkaW5nOjYwcHggMH0uZmlsZS11cGxvYWQtaW1hZ2V7bWF4LWhlaWdodDoyMDBweDttYXgtd2lkdGg6MjAwcHg7bWFyZ2luOmF1dG87cGFkZGluZzoyMHB4fS5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtY29sb3I6IzAwNGE3Zjtib3JkZXI6bm9uZTtjb2xvcjojZmZmO3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtYW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZzthbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nfUAtd2Via2l0LWtleWZyYW1lcyBnbG93aW5nezAle2JhY2tncm91bmQtY29sb3I6IzAwMmZiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9MTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn19QGtleWZyYW1lcyBnbG93aW5nezAlLDEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyO2JveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7Ym94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fX0uYWN0aW9uQnRue21hcmdpbi10b3A6NXB4O21hcmdpbi1ib3R0b206MnB4O2ZvbnQtc2l6ZToxLjJlbX1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLXJpZ2h0OjEwcHh9LnJvdy1jYnttYXJnaW46YXV0bztmb250LXNpemU6MTVweH0ucm93LWNiIGxhYmVse2Zsb2F0OmxlZnR9LnJvdy1jYiBzcGFue2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpsZWZ0fS5zbmFwc2hvdHt0ZXh0LWFsaWduOmNlbnRlcn0uc25hcHNob3QgaW1ne21heC13aWR0aDo4MDBweDttYXgtaGVpZ2h0OjgwMHB4fS5jb2x1bW5lI2NhcHRpb24gLnRleHQgaDF7bWFyZ2luOjA7Y29sb3I6I2ZmZn0uY29sdW1uZSNjYXB0aW9uOmhvdmVyIC50ZXh0e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjF9LmNvbHVtbmUjY2FwdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0uY29sdW1uZSNjYXB0aW9uIC50ZXh0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6MTA7b3BhY2l0eTowO3RyYW5zaXRpb246LjhzfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgaW1ney13ZWJraXQtZmlsdGVyOmJsdXIoNHB4KTtmaWx0ZXI6Ymx1cig0cHgpfUBtZWRpYSAobWF4LXdpZHRoOjYyOXB4KXsuZmlsZS11cGxvYWQtaW5wdXR7ZGlzcGxheTpub25lIWltcG9ydGFudH19YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIm1lc3NhZ2VcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXt7bWVzc2FnZVR5cGV9fSBhbGVydC1kaXNtaXNzaWJsZVwiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+PHNwYW5cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPiB7e21lc3NhZ2V9fVxyXG4gIDwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiYmFja0J1dHRvblwiPlxyXG4gIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIiA+XHJcbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2lyY2xlLWFycm93LWxlZnRcIj48L3NwYW4+IEJhY2tcclxuPC9idXR0b24+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwic2VsZWN0RmlsZVR5cGVcIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICB7e3ZhbHVlfX0gXHJcbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJ2YWx1ZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xlYXIoKVwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+VVBMT0FEIEZJTEUgVFlQRTwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiaW1hZ2VcIiBpZD1cImltYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnaW1hZ2UnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gICAgICA8bGFiZWwgZm9yPVwiaW1hXCI+SW1hZ2U8L2xhYmVsPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwicGRmXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdwZGYnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCBmb3I9XCJwZGZcIj5QREY8L2xhYmVsPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImJvdGhcIiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gIDxzcGFuPjxpbnB1dCBuYW1lPVwib3B0aW9uXCIgaWQ9XCJib3RoXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdib3RoJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICA8bGFiZWwgIGZvcj1cImJvdGhcIj5JbWFnZSAmIFBERjwvbGFiZWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgPHNwYW4+PGlucHV0IG5hbWU9XCJjYW1lcmFcIiBpZD1cImNhbWVyYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnbGl2ZUNhbWVyYScpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XHJcbiAgPGxhYmVsIGZvcj1cImNhbWVyYVwiID5MaXZlIENhbWVyYTwvbGFiZWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBbaGlkZGVuXT1cIiF1cmxzWzBdXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcbiAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5TRUxFQ1RFRCBGSUxFUzwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgKm5nRm9yPVwibGV0IHVybCBvZiB1cmxzO2xldCBpPWluZGV4XCI+XHJcbiAgICAgICAgICA8YSBjbGFzcyA9IFwiY29sdW1uZVwiIGlkID0gXCJjYXB0aW9uXCI+XHJcbiAgICAgICAgICAgPGltZyBzdHlsZT1cIiBib3JkZXI6IDFweCBzb2xpZCByZ2IoOTcsIDk3LCA5Nyk7IG1hcmdpbjogMnB4OyBib3JkZXItcmFkaXVzOiA0cHg7cGFkZGluZzogNXB4O1wiIGlkPVwiaW1ne3tpfX1cIiBbc3JjXT1cInVybC5kYXRhIHx8IHVybC5pbWFnZUFzRGF0YVVybFwiIFxyXG4gICAgICAgICAgIG9uRXJyb3I9XCJ0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz0naHR0cHM6Ly9zdG9yZS1pbWFnZXMucy1taWNyb3NvZnQuY29tL2ltYWdlL2FwcHMuMzQ5NjEuMTM1MTA3OTg4ODc2MjE5NjIuNDdiNjJjNGMtYTBjNi00ZTNjLTg3YmItNTA5MzE3ZDljMzY0LmE2MzU0YjQ4LWM2OGEtNDdmYS1iNjllLTRjYjU5MmQ0MmZmYz9tb2RlPXNjYWxlJnE9OTAmaD0zMDAmdz0zMDAnIDtcIiBjbGFzcz1cInJvdW5kZWQgbWItM1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMjAwXCI+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj48aDIgdGl0bGU9XCJDbGljayB0byBEZWxldGUgRmlsZSB7e3VybC5uYW1lfX1cIiAoY2xpY2spPVwiZGVsZXRlKHVybClcIiAgc3R5bGU9XCJjb2xvcjogcmVkOyBmb250LWZhbWlseTogZmFudGFzeTtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIj48L3NwYW4+UkVNT1ZFPC9oMj48L2Rpdj5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiVXBsb2FkQ2FwdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b24gcHVsbC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWQgRmlsZXNcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXBkZkF2YWlsYWJsZSAmJiBmaWxlVXBsb2FkIHx8IGxpdmVDYW1lcmEgfHwgbWVyZ2VcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiF1cmxzWzFdXCIgKGNsaWNrKT1cIk1lcmdlSW1hZ2VzKClcIiAgdGl0bGU9XCJtZXJnZSB0aGUgaW1hZ2VzIGFzIHBhZ2VzIGluIG9uZSBwZGYgZG9jdW1lbnRcIiAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gTWVyZ2UgRmlsZXNcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImZpbGVVcGxvYWRcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlYWRvbmx5IFsobmdNb2RlbCldPVwidmFsdWVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1pbnB1dFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1mb2xkZXItb3BlblwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImltYWdlLXByZXZpZXctaW5wdXQtdGl0bGVcIj5TRUxFQ1QgRklMRTwvc3Bhbj5cclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAvPiBcclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgLz4gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyXHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZFxyXG48L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCIhbW9iaWxlXCIgY2xhc3M9XCJpbWFnZS11cGxvYWQtd3JhcFwiPlxyXG4gICAgPGlucHV0ICpuZ0lmPVwibXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cclxuICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cImRyYWctdGV4dFwiPlxyXG4gICAgICA8aDM+RHJhZyBhbmQgRHJvcCBmaWxlKHMpPC9oMz5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImxpdmVDYW1lcmFcIj5cclxuICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDx3ZWJjYW0gW2hlaWdodF09XCI3MDBcIiBbd2lkdGhdPVwiNjAwXCIgW3RyaWdnZXJdPVwidHJpZ2dlck9ic2VydmFibGVcIiAoaW1hZ2VDYXB0dXJlKT1cImhhbmRsZUltYWdlKCRldmVudClcIiAqbmdJZj1cInNob3dXZWJjYW1cIlxyXG4gICAgICAgICAgICAgIFthbGxvd0NhbWVyYVN3aXRjaF09XCJhbGxvd0NhbWVyYVN3aXRjaFwiIFtzd2l0Y2hDYW1lcmFdPVwibmV4dFdlYmNhbU9ic2VydmFibGVcIlxyXG4gICAgICAgICAgICAgIFt2aWRlb09wdGlvbnNdPVwidmlkZW9PcHRpb25zXCJcclxuICAgICAgICAgICAgICBbaW1hZ2VRdWFsaXR5XT1cIjFcIlxyXG4gICAgICAgICAgICAgIChjYW1lcmFTd2l0Y2hlZCk9XCJjYW1lcmFXYXNTd2l0Y2hlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAoaW5pdEVycm9yKT1cImhhbmRsZUluaXRFcnJvcigkZXZlbnQpXCJcclxuICAgICAgPjwvd2ViY2FtPlxyXG4gICAgICA8YnIvPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiAoY2xpY2spPVwidHJpZ2dlclNuYXBzaG90KCk7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNhbWVyYVwiPjwvc3Bhbj5UYWtlIEEgU25hcHNob3Q8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uQnRuXCIgKGNsaWNrKT1cInRvZ2dsZVdlYmNhbSgpO1wiPlRvZ2dsZSBXZWJjYW08L2J1dHRvbj4gLS0+XHJcbiAgICAgIDwhLS0gPGJyLz4gLS0+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiIChjbGljayk9XCJzaG93TmV4dFdlYmNhbSh0cnVlKTtcIiBbZGlzYWJsZWRdPVwiIW11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZVwiPkNoYW5nZSBDYW1lcmE8L2J1dHRvbj5cclxuICAgICAgPCEtLSA8aW5wdXQgaWQ9XCJjYW1lcmFTd2l0Y2hDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIj48bGFiZWwgZm9yPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIj5BbGxvdyBDYW1lcmEgU3dpdGNoPC9sYWJlbD5cclxuICAgICAgPGJyLz4gLS0+XHJcbiAgICAgIDwhLS0gRGV2aWNlSWQ6IDxpbnB1dCBpZD1cImRldmljZUlkXCIgdHlwZT1cInRleHRcIiBbKG5nTW9kZWwpXT1cImRldmljZUlkXCIgc3R5bGU9XCJ3aWR0aDogNTAwcHhcIj5cclxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0oZGV2aWNlSWQpO1wiPkFjdGl2YXRlPC9idXR0b24+IC0tPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGg0ICpuZ0lmPVwiZXJyb3JzLmxlbmd0aCA+IDBcIj5NZXNzYWdlczo8L2g0PlxyXG4gIDx1bCAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzXCI+XHJcbiAgICA8bGk+e3tlcnJvciB8IGpzb259fTwvbGk+XHJcbiAgPC91bD5cclxuPC9kaXY+XHJcblxyXG5cclxuYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCksIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBwdWJsaWMgdXJscyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBzZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlTGlzdCA9IG5ldyBBcnJheTxhbnk+KCk7XG4gIHB1YmxpYyBmaWxlVHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbWVzc2FnZSA9ICcnO1xuICBwdWJsaWMgbWVzc2FnZVR5cGUgPSAnJztcbiAgcHVibGljIGxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgcHVibGljIHBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgbW9iaWxlID0gZmFsc2U7XG4gIHB1YmxpYyBVcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2luZ2xlRmlsZTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZm9ybUVudHJ5OiBhbnk7XG4gIHB1YmxpYyBtdWx0aXBsZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlVXBsb2FkID0gZmFsc2U7XG4gIHB1YmxpYyBib3RoID0gdHJ1ZTtcbiAgcHVibGljIG1lcmdlID0gZmFsc2U7XG4gIHB1YmxpYyBiYWNrQnV0dG9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IGFueTtcbiAgQE91dHB1dCgpIHB1YmxpYyBmaWxlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkRGF0YTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgX29uQ2xlYXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgX2ltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd1dlYmNhbSA9IHRydWU7XG4gIHB1YmxpYyBhbGxvd0NhbWVyYVN3aXRjaCA9IHRydWU7XG4gIHB1YmxpYyBtdWx0aXBsZVdlYmNhbXNBdmFpbGFibGUgPSBmYWxzZTtcbiAgcHVibGljIGRldmljZUlkOiBzdHJpbmc7XG4gIHB1YmxpYyB2aWRlb09wdGlvbnM6IE1lZGlhVHJhY2tDb25zdHJhaW50cyA9IHtcbiAgICAvLyB3aWR0aDoge2lkZWFsOiAxMDI0fSxcbiAgICAvLyBoZWlnaHQ6IHtpZGVhbDogNTc2fVxuICB9O1xuICBwdWJsaWMgZXJyb3JzOiBXZWJjYW1Jbml0RXJyb3JbXSA9IFtdO1xuXG4gIC8vIGxhdGVzdCBzbmFwc2hvdFxuICBwdWJsaWMgd2ViY2FtSW1hZ2U6IFdlYmNhbUltYWdlID0gbnVsbDtcblxuICAvLyB3ZWJjYW0gc25hcHNob3QgdHJpZ2dlclxuICBwcml2YXRlIHRyaWdnZXI6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAvLyBzd2l0Y2ggdG8gbmV4dCAvIHByZXZpb3VzIC8gc3BlY2lmaWMgd2ViY2FtOyB0cnVlL2ZhbHNlOiBmb3J3YXJkL2JhY2t3YXJkcywgc3RyaW5nOiBkZXZpY2VJZFxuICBwcml2YXRlIG5leHRXZWJjYW06IFN1YmplY3Q8Ym9vbGVhbiB8IHN0cmluZz4gPSBuZXcgU3ViamVjdDxib29sZWFuIHwgc3RyaW5nPigpO1xuICBwdWJsaWMgdXBsb2FkaW5nID0gZmFsc2U7XG4gIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5ib3RoID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm1FbnRyeSkge1xuICAgICAgdGhpcy5ib3RoID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDY5MikgeyAvLyA3NjhweCBwb3J0cmFpdFxuICAgICAgdGhpcy5tb2JpbGUgPSB0cnVlO1xuICAgIH1cbiAgICBXZWJjYW1VdGlsLmdldEF2YWlsYWJsZVZpZGVvSW5wdXRzKClcbiAgICAgIC50aGVuKChtZWRpYURldmljZXM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gbWVkaWFEZXZpY2VzICYmIG1lZGlhRGV2aWNlcy5sZW5ndGggPiAxO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlcztcblxuICAgIGlmIChmaWxlcykge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpO1xuICAgICAgICAgIGlmIChmaWxlU2l6ZSA+PSAzMDAwKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnRmlsZSBUb28gbGFyZ2UnO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVHlwZSA9ICdkYW5nZXInO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMudXJscy5sZW5ndGggKyAxLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBzaXplOiBmaWxlU2l6ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICAgICAgICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmZpbGVDaGFuZ2VkLmVtaXQocGF5bG9hZCk7XG4gICAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrKCk7XG4gICAgdGhpcy5fb25DbGVhci5lbWl0KCk7XG4gIH1cbiAgcHVibGljIGJhY2soKSB7XG4gICAgdGhpcy5zZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLnNpbmdsZUZpbGUgPSBmYWxzZTtcbiAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMubWVyZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVVcGxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgfVxuICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eShmaWxldHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKGZpbGV0eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmJztcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAncGRmJykge1xuICAgICAgaWYgKHRoaXMuZm9ybUVudHJ5KSB7XG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYgLCBhcHBsaWNhdGlvbi9wZGYnO1xuICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGZpbGV0eXBlID09PSAnbGl2ZUNhbWVyYScpIHtcbiAgICAgIHRoaXMubGl2ZUNhbWVyYSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0RmlsZVR5cGUgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSB0cnVlO1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoKSB7XG4gICAgdGhpcy51cGxvYWREYXRhLmVtaXQodGhpcy5maWxlTGlzdCk7XG4gICAgdGhpcy5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgTWVyZ2VJbWFnZXMoKSB7XG4gICAgY29uc3QgZG9jID0gbmV3IGpzUERGKHsgY29tcHJlc3M6IHRydWUgfSk7XG4gICAgZG9jLnBhZ2UgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW1hZ2VEYXRhID0gdGhpcy5maWxlTGlzdFtpXS5kYXRhIHx8IHRoaXMuZmlsZUxpc3RbaV0uaW1hZ2VBc0RhdGFVcmw7XG4gICAgICBkb2MuYWRkSW1hZ2UoaW1hZ2VEYXRhLCAnSlBHJywgMTAsIDEwLCAxOTAsIDI3MCwgdW5kZWZpbmVkLCAnRkFTVCcpO1xuICAgICAgZG9jLnNldEZvbnQoJ2NvdXJpZXInKTtcbiAgICAgIGRvYy5zZXRGb250VHlwZSgnbm9ybWFsJyk7XG4gICAgICBkb2MudGV4dCgxODAsIDI5MCwgJ3BhZ2UgJyArIGRvYy5wYWdlKTtcbiAgICAgIGRvYy5wYWdlKys7XG4gICAgICBpZiAoaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRvYy5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgIHRpdGxlOiAnQW1wYXRoIE1lZGljYWwgRGF0YScsXG4gICAgICBhdXRob3I6ICdQT0MnLFxuICAgICAgY3JlYXRvcjogJ0FNUEFUSCdcbiAgICB9KTtcbiAgICBkb2MuZGVsZXRlUGFnZSh0aGlzLmZpbGVMaXN0Lmxlbmd0aCArIDEpO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXQgPSBkb2Mub3V0cHV0KCdkYXRhdXJpc3RyaW5nJyk7XG4gICAgY29uc3QgcmUgPSAvZmlsZW5hbWU9Z2VuZXJhdGVkLnBkZjsvZ2k7XG4gICAgY29uc3QgZGF0YSA9IG91dHB1dC5yZXBsYWNlKHJlLCAnJyk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGRhdGEsXG4gICAgfTtcbiAgICBpZiAodGhpcy5mb3JtRW50cnkpIHtcbiAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgIHRoaXMudXJscyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2UgPSAnVGhlIGltYWdlcyBoYXZlIGJlZW4gbWVyZ2VkIGludG8gb25lIHBkZiwgWW91IGNhbiBub3cgdXBsb2FkJztcbiAgICB0aGlzLm1lc3NhZ2VUeXBlID0gJ3N1Y2Nlc3MnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgfSwgMzAwMCk7XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMuc2luZ2xlRmlsZSA9IGZhbHNlO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSB0cnVlO1xuXG4gIH1cbiAgcHVibGljIGRlbGV0ZSh1cmxzOiBhbnkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh1cmxzLmRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5kYXRhID09PSB1cmxzLmRhdGEpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsc1tpXS5pbWFnZUFzRGF0YVVybCA9PT0gdXJscy5pbWFnZUFzRGF0YVVybCkge1xuICAgICAgICAgIHRoaXMudXJscy5zcGxpY2UoaSk7XG4gICAgICAgICAgdGhpcy5maWxlTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZW5hYmxpbmcgbWVyZ2UgYnV0dG9uIGlmIHJlbWFpbmluZyBvbiB1cmxzIGlzIGltYWdlc1xuICAgIGNvbnN0IHJlID0gL3BkZi9naTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy51cmxzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKHRoaXMudXJsc1tpbmRleF0uZGF0YS5zZWFyY2gocmUpID09PSAtMSkge1xuICAgICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZXJnZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0cmlnZ2VyU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVXZWJjYW0oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93V2ViY2FtID0gIXRoaXMuc2hvd1dlYmNhbTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbml0RXJyb3IoZXJyb3I6IFdlYmNhbUluaXRFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIHNob3dOZXh0V2ViY2FtKGRpcmVjdGlvbk9yRGV2aWNlSWQ6IGJvb2xlYW4gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyB0cnVlID0+IG1vdmUgZm9yd2FyZCB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBmYWxzZSA9PiBtb3ZlIGJhY2t3YXJkcyB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBzdHJpbmcgPT4gbW92ZSB0byBkZXZpY2Ugd2l0aCBnaXZlbiBkZXZpY2VJZFxuICAgIHRoaXMubmV4dFdlYmNhbS5uZXh0KGRpcmVjdGlvbk9yRGV2aWNlSWQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUltYWdlKHdlYmNhbUltYWdlOiBXZWJjYW1JbWFnZSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmVjZWl2ZWQgd2ViY2FtIGltYWdlJywgd2ViY2FtSW1hZ2UpO1xuICAgIGlmICh0aGlzLnNpbmdsZUZpbGUpIHtcbiAgICAgIHRoaXMudXJscyA9IFtdO1xuICAgICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgICAgdGhpcy5wdXNoRGF0YSh3ZWJjYW1JbWFnZSk7XG5cbiAgICB9XG4gICAgdGhpcy5wdXNoRGF0YSh3ZWJjYW1JbWFnZSk7XG4gIH1cbiAgcHVibGljIHB1c2hEYXRhKHdlYmNhbUltYWdlKSB7XG4gICAgdGhpcy51cmxzLnB1c2god2ViY2FtSW1hZ2UpO1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaCh3ZWJjYW1JbWFnZSk7XG4gIH1cblxuICBwdWJsaWMgY2FtZXJhV2FzU3dpdGNoZWQoZGV2aWNlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUubG9nKCdhY3RpdmUgZGV2aWNlOiAnICsgZGV2aWNlSWQpO1xuICAgIHRoaXMuZGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJpZ2dlck9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmV4dFdlYmNhbU9ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMubmV4dFdlYmNhbS5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuIl19