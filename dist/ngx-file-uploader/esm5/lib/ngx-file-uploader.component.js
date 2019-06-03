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
        this.liveCamera = false;
        this.pdfAvailable = false;
        this.mobile = false;
        this.UploadCaptions = false;
        this.multiple = true;
        this.fileUpload = false;
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
        var doc = new jsPDF();
        doc.page = 1;
        for (var i = 0; i < this.fileList.length; i++) {
            /** @type {?} */
            var imageData = this.fileList[i].data || this.fileList[i].imageAsDataUrl;
            doc.addImage(imageData, 'JPG', 10, 10, 190, 270);
            doc.setFont('courier');
            doc.setFontType('normal');
            doc.text(180, 290, 'page ' + doc.page);
            doc.page++;
            if (i < this.fileList.length) {
                doc.addPage();
            }
        }
        doc.deletePage(this.fileList.length + 1);
        this.fileList = [];
        this.urls = [];
        /** @type {?} */
        var data = doc.output('datauristring');
        /** @type {?} */
        var payload = {
            data: data,
        };
        this.fileList.push(payload);
        this.urls.push(payload);
        doc.output('dataurlnewwindow');
        // doc.save('Test.pdf');
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
        this.urls.push(webcamImage);
        this.fileList.push(webcamImage);
        this.UploadCaptions = true;
        this.webcamImage = webcamImage;
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
                    template: "<div *ngIf=\"backButton\">\n  <button class=\"btn btn-default image-preview-clear\" type=\"button\" (click)=\"back()\" >\n    <span class=\"glyphicon glyphicon-circle-arrow-left\"></span> Back\n</button>\n</div>\n<div *ngIf=\"selectFileType\" class=\"panel panel-primary\">\n  <div class=\"panel-heading\">UPLOAD FILE TYPE</div>\n  <div class=\"panel-body\">\n    <div class=\"row-cb\">\n      <span><input name=\"image\" id=\"ima\" (change)=\"toggleVisibility('image')\" type=\"checkbox\" /></span>\n      <label for=\"ima\">Image</label>\n\n      <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"option\" id=\"pdf\" (change)=\"toggleVisibility('pdf')\" type=\"checkbox\" /></span>\n  <label for=\"pdf\">PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div *ngIf=\"!singleFile\" class=\"row-cb\">\n  <span><input name=\"option\" id=\"both\" (change)=\"toggleVisibility('both')\" type=\"checkbox\" /></span>\n  <label  for=\"both\">Image & PDF</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n<div class=\"row-cb\">\n  <span><input name=\"camera\" id=\"camera\" (change)=\"toggleVisibility('liveCamera')\" type=\"checkbox\" /></span>\n  <label for=\"camera\" >Live Camera</label>\n\n  <div class=\"clear-both\"></div>\n</div>\n  </div>\n</div>\n<div style=\"display: block;\">\n  <div style=\"display: inline-block;\" *ngFor=\"let url of urls;let i=index\">\n   <a class = \"columne\" id = \"caption\">\n    <img style=\" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;\" id=\"img{{i}}\" [src]=\"url.data || url.imageAsDataUrl\" \n    onError=\"this.onerror=null;this.src='59e6d5338faf193392f1bf9f89f4513dc548bd68.png | secure'  || '59e6d5338faf193392f1bf9f89f4513dc548bd68.png | secure:this.dataSource.fetchFile' ;\" class=\"rounded mb-3\" width=\"90\" height=\"200\">\n    <div class=\"text\"><h2 title=\"Click to Delete File {{url.name}}\" (click)=\"delete(url)\"  style=\"color: rgb(255, 255, 255); font-family: fantasy;\"><span class=\"glyphicon glyphicon-trash\"></span>REMOVE</h2></div>\n   </a>\n  </div>\n  <button *ngIf=\"UploadCaptions\" type=\"button\" (click)=\"upload()\" class=\"button\">\n    <span class=\"glyphicon glyphicon-upload\"></span> Upload Files\n</button>\n<button *ngIf=\"!pdfAvailable && fileUpload || liveCamera\" type=\"button\" [disabled]=\"!urls[1]\" (click)=\"MergeImages()\"  title=\"merge the images as pages in one pdf document\"  class=\"btn btn-default image-preview-clear\">\n  <span class=\"glyphicon glyphicon-upload\"></span> Merge\n</button>\n</div>\n<div *ngIf=\"fileUpload\">\n\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control\" readonly [(ngModel)]=\"value\">\n    <div class=\"input-group-btn\">\n\n      <div class=\"btn btn-default image-preview-input\">\n        <span class=\"glyphicon glyphicon-folder-open\"></span>\n        <span class=\"image-preview-input-title\">SELECT FILE</span>\n        <input *ngIf=\"multiple\" type=\"file\" multiple accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n        <input *ngIf=\"!multiple\" type=\"file\" accept=\"{{fileType}}\" (blur)=\"onBlur()\" name=\"input-file-preview\" (change)=\"onChange($event)\"\n        /> \n      </div>\n      <button *ngIf=\"value\" type=\"button\" (click)=\"clear()\" class=\"btn btn-default image-preview-clear\">\n                        <span class=\"glyphicon glyphicon-remove\"></span> Clear\n    </button>\n    <button *ngIf=\"multiple\" type=\"button\" (click)=\"upload()\" class=\"button\">\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload\n</button>\n    </div>\n  </div>\n  <div *ngIf=\"!mobile\" class=\"image-upload-wrap\">\n    <input *ngIf=\"multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" multiple accept=\"{{fileType}}\" />\n    <input *ngIf=\"!multiple\" class=\"file-upload-input\" type='file' (change)=\"onChange($event)\" accept=\"{{fileType}}\" />\n    <div class=\"drag-text\">\n      <h3>Drag and Drop file(s)</h3>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"liveCamera\">\n  <div style=\"text-align:center\">\n    <div>\n      <webcam [height]=\"700\" [width]=\"700\" [trigger]=\"triggerObservable\" (imageCapture)=\"handleImage($event)\" *ngIf=\"showWebcam\"\n              [allowCameraSwitch]=\"allowCameraSwitch\" [switchCamera]=\"nextWebcamObservable\"\n              [videoOptions]=\"videoOptions\"\n              [imageQuality]=\"1\"\n              (cameraSwitched)=\"cameraWasSwitched($event)\"\n              (initError)=\"handleInitError($event)\"\n      ></webcam>\n      <br/>\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"triggerSnapshot();\"><span class=\"glyphicon glyphicon-camera\"></span>Take A Snapshot</button>\n      <!-- <button class=\"actionBtn\" (click)=\"toggleWebcam();\">Toggle Webcam</button> -->\n      <!-- <br/> -->\n      <button class=\"btn btn-default image-preview-clear\" (click)=\"showNextWebcam(true);\" [disabled]=\"!multipleWebcamsAvailable\">Change Camera</button>\n      <!-- <input id=\"cameraSwitchCheckbox\" type=\"checkbox\" [(ngModel)]=\"allowCameraSwitch\"><label for=\"cameraSwitchCheckbox\">Allow Camera Switch</label>\n      <br/> -->\n      <!-- DeviceId: <input id=\"deviceId\" type=\"text\" [(ngModel)]=\"deviceId\" style=\"width: 500px\">\n      <button (click)=\"showNextWebcam(deviceId);\">Activate</button> -->\n    </div>\n  </div>\n  <h4 *ngIf=\"errors.length > 0\">Messages:</h4>\n  <ul *ngFor=\"let error of errors\">\n    <li>{{error | json}}</li>\n  </ul>\n</div>\n\n\n",
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
                    styles: [".btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:sepia(90%)}@media (max-width:629px){.file-upload-input{display:none!important}}"]
                }] }
    ];
    NgxFileUploaderComponent.propDecorators = {
        singleFile: [{ type: Input }],
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
    NgxFileUploaderComponent.prototype.multiple;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.fileUpload;
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
    /** @type {?} */
    NgxFileUploaderComponent.prototype.trigger;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.nextWebcam;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.uploading;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.innerValue;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.onTouchedCallback;
    /** @type {?} */
    NgxFileUploaderComponent.prototype.onChangeCallback;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQ3pCLE1BQU0sRUFBRSxZQUFZLEVBQ2hDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFekUsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBRWhFLElBQUk7OztBQUFHO0lBQ1gseUJBQXlCO0FBQzNCLENBQUMsQ0FBQTs7QUFFRDtJQUFBO1FBd0hTLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBQ3hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxJQUFJLEtBQUssRUFBTyxDQUFDO1FBRTVCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRVQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTNELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFD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QzFCLDBDQUE0Qjs7SUFDNUIsK0NBQXFFOztJQUNyRSw4Q0FBb0U7O0lBQ3BFLDRDQUFrRTs7SUFDbEUsOENBQTBCOztJQUMxQiw4Q0FBeUI7O0lBQ3pCLHFEQUFnQzs7SUFDaEMsNERBQXdDOztJQUN4Qyw0Q0FBd0I7O0lBQ3hCLGdEQUdFOztJQUNGLDBDQUFzQzs7SUFHdEMsK0NBQXVDOztJQUd2QywyQ0FBb0Q7O0lBRXBELDhDQUErRTs7SUFDL0UsNkNBQXlCOztJQUV6Qiw4Q0FBNEI7O0lBSTVCLHFEQUE0Qzs7SUFDNUMsb0RBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLFxuICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCDJtUNvbnNvbGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG4vLyBpbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gJ3BkZm1ha2UvYnVpbGQvcGRmbWFrZSc7XG5pbXBvcnQganNQREYgZnJvbSAnanNwZGYnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgV2ViY2FtSW1hZ2UsIFdlYmNhbUluaXRFcnJvciwgV2ViY2FtVXRpbCB9IGZyb20gJ25neC13ZWJjYW0nO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xuICAvLyBwbGFjZWhvbGRlciBjYWxsIGJhY2tzXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZmlsZS11cGxvYWRlcicsXG4gIHN0eWxlczogW2AuYnRuLWZpbGV7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5idG4tZmlsZSBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7bWluLXdpZHRoOjEwMCU7bWluLWhlaWdodDoxMDAlO2ZvbnQtc2l6ZToxMDBweDt0ZXh0LWFsaWduOnJpZ2h0O29wYWNpdHk6MDtvdXRsaW5lOjA7YmFja2dyb3VuZDojZmZmO2N1cnNvcjppbmhlcml0O2Rpc3BsYXk6YmxvY2t9I2ltZy11cGxvYWR7d2lkdGg6MTAwJX0uaW1hZ2UtcHJldmlldy1pbnB1dCBpbnB1dFt0eXBlPWZpbGVde3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7bWFyZ2luOjA7cGFkZGluZzowO2ZvbnQtc2l6ZToyMHB4O2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MH0uZmlsZS11cGxvYWR7YmFja2dyb3VuZC1jb2xvcjojZmZmO3dpZHRoOjYwMHB4O21hcmdpbjowIGF1dG87cGFkZGluZzoyMHB4fS5maWxlLXVwbG9hZC1idG57d2lkdGg6MTAwJTttYXJnaW46MDtjb2xvcjojZmZmO2JhY2tncm91bmQ6IzFmYjI2NDtib3JkZXI6bm9uZTtwYWRkaW5nOjEwcHg7Ym9yZGVyLXJhZGl1czo0cHg7Ym9yZGVyLWJvdHRvbTo0cHggc29saWQgIzE1ODI0Yjt0cmFuc2l0aW9uOi4ycztvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjcwMH11bHtsaXN0LXN0eWxlLXR5cGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjB9LmZpbGUtdXBsb2FkLWJ0bjpob3ZlcntiYWNrZ3JvdW5kOiMxYWEwNTk7Y29sb3I6I2ZmZjt0cmFuc2l0aW9uOi4ycztjdXJzb3I6cG9pbnRlcn0uZmlsZS11cGxvYWQtYnRuOmFjdGl2ZXtib3JkZXI6MDt0cmFuc2l0aW9uOi4yc30uZmlsZS11cGxvYWQtY29udGVudHtkaXNwbGF5Om5vbmU7dGV4dC1hbGlnbjpjZW50ZXJ9LmZpbGUtdXBsb2FkLWlucHV0e3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjowO3BhZGRpbmc6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO291dGxpbmU6MDtvcGFjaXR5OjA7Y3Vyc29yOnBvaW50ZXJ9LmltYWdlLXVwbG9hZC13cmFwe21hcmdpbi10b3A6MjBweDtib3JkZXI6NHB4IGRhc2hlZCAjMzY4M2M3O3Bvc2l0aW9uOnJlbGF0aXZlfS5pbWFnZS1kcm9wcGluZywuaW1hZ2UtdXBsb2FkLXdyYXA6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzM3YWI3O2JvcmRlcjo0cHggZGFzaGVkICNmZmZ9LmltYWdlLXRpdGxlLXdyYXB7cGFkZGluZzowIDE1cHggMTVweDtjb2xvcjojMjIyfS5kcmFnLXRleHR7dGV4dC1hbGlnbjpjZW50ZXJ9LmRyYWctdGV4dCBoM3tmb250LXdlaWdodDoxMDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOiMxNTVhODI7cGFkZGluZzo2MHB4IDB9LmZpbGUtdXBsb2FkLWltYWdle21heC1oZWlnaHQ6MjAwcHg7bWF4LXdpZHRoOjIwMHB4O21hcmdpbjphdXRvO3BhZGRpbmc6MjBweH0uYnV0dG9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6NnB4IDEycHg7bWFyZ2luLWJvdHRvbTowO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO3RleHQtYWxpZ246Y2VudGVyO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7dG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbjtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDRhN2Y7Ym9yZGVyOm5vbmU7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTstd2Via2l0LWFuaW1hdGlvbjoxLjVzIGluZmluaXRlIGdsb3dpbmc7YW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZ31ALXdlYmtpdC1rZXlmcmFtZXMgZ2xvd2luZ3swJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDJmYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0Oy13ZWJraXQtYm94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fTEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyOy13ZWJraXQtYm94LXNoYWRvdzowIDAgM3B4ICMwMDVjYjJ9fUBrZXlmcmFtZXMgZ2xvd2luZ3swJSwxMDAle2JhY2tncm91bmQtY29sb3I6IzAwNWNiMjtib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn01MCV7YmFja2dyb3VuZC1jb2xvcjojMjAzODY0O2JveC1zaGFkb3c6MCAwIDQwcHggIzIwMzg2NH19LmFjdGlvbkJ0bnttYXJnaW4tdG9wOjVweDttYXJnaW4tYm90dG9tOjJweDtmb250LXNpemU6MS4yZW19bGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTo1cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbi1yaWdodDoxMHB4fS5yb3ctY2J7bWFyZ2luOmF1dG87Zm9udC1zaXplOjE1cHh9LnJvdy1jYiBsYWJlbHtmbG9hdDpsZWZ0fS5yb3ctY2Igc3BhbntmbG9hdDpsZWZ0O3RleHQtYWxpZ246bGVmdH0uc25hcHNob3R7dGV4dC1hbGlnbjpjZW50ZXJ9LnNuYXBzaG90IGltZ3ttYXgtd2lkdGg6ODAwcHg7bWF4LWhlaWdodDo4MDBweH0uY29sdW1uZSNjYXB0aW9uIC50ZXh0IGgxe21hcmdpbjowO2NvbG9yOiNmZmZ9LmNvbHVtbmUjY2FwdGlvbjpob3ZlciAudGV4dHtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eToxfS5jb2x1bW5lI2NhcHRpb257cG9zaXRpb246cmVsYXRpdmV9LmNvbHVtbmUjY2FwdGlvbiAudGV4dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt6LWluZGV4OjEwO29wYWNpdHk6MDt0cmFuc2l0aW9uOi44c30uY29sdW1uZSNjYXB0aW9uOmhvdmVyIGltZ3std2Via2l0LWZpbHRlcjpzZXBpYSg5MCUpfUBtZWRpYSAobWF4LXdpZHRoOjYyOXB4KXsuZmlsZS11cGxvYWQtaW5wdXR7ZGlzcGxheTpub25lIWltcG9ydGFudH19YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImJhY2tCdXR0b25cIj5cbiAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJiYWNrKClcIiA+XG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1sZWZ0XCI+PC9zcGFuPiBCYWNrXG48L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cInNlbGVjdEZpbGVUeXBlXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+VVBMT0FEIEZJTEUgVFlQRTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cbiAgICAgIDxzcGFuPjxpbnB1dCBuYW1lPVwiaW1hZ2VcIiBpZD1cImltYVwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnaW1hZ2UnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICAgICAgPGxhYmVsIGZvcj1cImltYVwiPkltYWdlPC9sYWJlbD5cblxuICAgICAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwicGRmXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdwZGYnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICA8bGFiZWwgZm9yPVwicGRmXCI+UERGPC9sYWJlbD5cblxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiIXNpbmdsZUZpbGVcIiBjbGFzcz1cInJvdy1jYlwiPlxuICA8c3Bhbj48aW5wdXQgbmFtZT1cIm9wdGlvblwiIGlkPVwiYm90aFwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgnYm90aCcpXCIgdHlwZT1cImNoZWNrYm94XCIgLz48L3NwYW4+XG4gIDxsYWJlbCAgZm9yPVwiYm90aFwiPkltYWdlICYgUERGPC9sYWJlbD5cblxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicm93LWNiXCI+XG4gIDxzcGFuPjxpbnB1dCBuYW1lPVwiY2FtZXJhXCIgaWQ9XCJjYW1lcmFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2xpdmVDYW1lcmEnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxuICA8bGFiZWwgZm9yPVwiY2FtZXJhXCIgPkxpdmUgQ2FtZXJhPC9sYWJlbD5cblxuICA8ZGl2IGNsYXNzPVwiY2xlYXItYm90aFwiPjwvZGl2PlxuPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+XG4gIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgKm5nRm9yPVwibGV0IHVybCBvZiB1cmxzO2xldCBpPWluZGV4XCI+XG4gICA8YSBjbGFzcyA9IFwiY29sdW1uZVwiIGlkID0gXCJjYXB0aW9uXCI+XG4gICAgPGltZyBzdHlsZT1cIiBib3JkZXI6IDFweCBzb2xpZCByZ2IoOTcsIDk3LCA5Nyk7IG1hcmdpbjogMnB4OyBib3JkZXItcmFkaXVzOiA0cHg7cGFkZGluZzogNXB4O1wiIGlkPVwiaW1ne3tpfX1cIiBbc3JjXT1cInVybC5kYXRhIHx8IHVybC5pbWFnZUFzRGF0YVVybFwiIFxuICAgIG9uRXJyb3I9XCJ0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz0nNTllNmQ1MzM4ZmFmMTkzMzkyZjFiZjlmODlmNDUxM2RjNTQ4YmQ2OC5wbmcgfCBzZWN1cmUnICB8fCAnNTllNmQ1MzM4ZmFmMTkzMzkyZjFiZjlmODlmNDUxM2RjNTQ4YmQ2OC5wbmcgfCBzZWN1cmU6dGhpcy5kYXRhU291cmNlLmZldGNoRmlsZScgO1wiIGNsYXNzPVwicm91bmRlZCBtYi0zXCIgd2lkdGg9XCI5MFwiIGhlaWdodD1cIjIwMFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+PGgyIHRpdGxlPVwiQ2xpY2sgdG8gRGVsZXRlIEZpbGUge3t1cmwubmFtZX19XCIgKGNsaWNrKT1cImRlbGV0ZSh1cmwpXCIgIHN0eWxlPVwiY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsgZm9udC1mYW1pbHk6IGZhbnRhc3k7XCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyYXNoXCI+PC9zcGFuPlJFTU9WRTwvaDI+PC9kaXY+XG4gICA8L2E+XG4gIDwvZGl2PlxuICA8YnV0dG9uICpuZ0lmPVwiVXBsb2FkQ2FwdGlvbnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWQgRmlsZXNcbjwvYnV0dG9uPlxuPGJ1dHRvbiAqbmdJZj1cIiFwZGZBdmFpbGFibGUgJiYgZmlsZVVwbG9hZCB8fCBsaXZlQ2FtZXJhXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhdXJsc1sxXVwiIChjbGljayk9XCJNZXJnZUltYWdlcygpXCIgIHRpdGxlPVwibWVyZ2UgdGhlIGltYWdlcyBhcyBwYWdlcyBpbiBvbmUgcGRmIGRvY3VtZW50XCIgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIj5cbiAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gTWVyZ2VcbjwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiZmlsZVVwbG9hZFwiPlxuXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcmVhZG9ubHkgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cblxuICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWlucHV0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1mb2xkZXItb3BlblwiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpbWFnZS1wcmV2aWV3LWlucHV0LXRpdGxlXCI+U0VMRUNUIEZJTEU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBtdWx0aXBsZSBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAvPiBcbiAgICAgICAgPGlucHV0ICpuZ0lmPVwiIW11bHRpcGxlXCIgdHlwZT1cImZpbGVcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAoYmx1cik9XCJvbkJsdXIoKVwiIG5hbWU9XCJpbnB1dC1maWxlLXByZXZpZXdcIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAvPiBcbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInZhbHVlXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbGVhcigpXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiPjwvc3Bhbj4gQ2xlYXJcbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uICpuZ0lmPVwibXVsdGlwbGVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZCgpXCIgY2xhc3M9XCJidXR0b25cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZFxuPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwiIW1vYmlsZVwiIGNsYXNzPVwiaW1hZ2UtdXBsb2FkLXdyYXBcIj5cbiAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBtdWx0aXBsZSBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxuICAgIDxpbnB1dCAqbmdJZj1cIiFtdWx0aXBsZVwiIGNsYXNzPVwiZmlsZS11cGxvYWQtaW5wdXRcIiB0eXBlPSdmaWxlJyAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBhY2NlcHQ9XCJ7e2ZpbGVUeXBlfX1cIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJkcmFnLXRleHRcIj5cbiAgICAgIDxoMz5EcmFnIGFuZCBEcm9wIGZpbGUocyk8L2gzPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cImxpdmVDYW1lcmFcIj5cbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+XG4gICAgPGRpdj5cbiAgICAgIDx3ZWJjYW0gW2hlaWdodF09XCI3MDBcIiBbd2lkdGhdPVwiNzAwXCIgW3RyaWdnZXJdPVwidHJpZ2dlck9ic2VydmFibGVcIiAoaW1hZ2VDYXB0dXJlKT1cImhhbmRsZUltYWdlKCRldmVudClcIiAqbmdJZj1cInNob3dXZWJjYW1cIlxuICAgICAgICAgICAgICBbYWxsb3dDYW1lcmFTd2l0Y2hdPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIiBbc3dpdGNoQ2FtZXJhXT1cIm5leHRXZWJjYW1PYnNlcnZhYmxlXCJcbiAgICAgICAgICAgICAgW3ZpZGVvT3B0aW9uc109XCJ2aWRlb09wdGlvbnNcIlxuICAgICAgICAgICAgICBbaW1hZ2VRdWFsaXR5XT1cIjFcIlxuICAgICAgICAgICAgICAoY2FtZXJhU3dpdGNoZWQpPVwiY2FtZXJhV2FzU3dpdGNoZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChpbml0RXJyb3IpPVwiaGFuZGxlSW5pdEVycm9yKCRldmVudClcIlxuICAgICAgPjwvd2ViY2FtPlxuICAgICAgPGJyLz5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiIChjbGljayk9XCJ0cmlnZ2VyU25hcHNob3QoKTtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tY2FtZXJhXCI+PC9zcGFuPlRha2UgQSBTbmFwc2hvdDwvYnV0dG9uPlxuICAgICAgPCEtLSA8YnV0dG9uIGNsYXNzPVwiYWN0aW9uQnRuXCIgKGNsaWNrKT1cInRvZ2dsZVdlYmNhbSgpO1wiPlRvZ2dsZSBXZWJjYW08L2J1dHRvbj4gLS0+XG4gICAgICA8IS0tIDxici8+IC0tPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCIgKGNsaWNrKT1cInNob3dOZXh0V2ViY2FtKHRydWUpO1wiIFtkaXNhYmxlZF09XCIhbXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlXCI+Q2hhbmdlIENhbWVyYTwvYnV0dG9uPlxuICAgICAgPCEtLSA8aW5wdXQgaWQ9XCJjYW1lcmFTd2l0Y2hDaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIj48bGFiZWwgZm9yPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIj5BbGxvdyBDYW1lcmEgU3dpdGNoPC9sYWJlbD5cbiAgICAgIDxici8+IC0tPlxuICAgICAgPCEtLSBEZXZpY2VJZDogPGlucHV0IGlkPVwiZGV2aWNlSWRcIiB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwiZGV2aWNlSWRcIiBzdHlsZT1cIndpZHRoOiA1MDBweFwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0oZGV2aWNlSWQpO1wiPkFjdGl2YXRlPC9idXR0b24+IC0tPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGg0ICpuZ0lmPVwiZXJyb3JzLmxlbmd0aCA+IDBcIj5NZXNzYWdlczo8L2g0PlxuICA8dWwgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiPlxuICAgIDxsaT57e2Vycm9yIHwganNvbn19PC9saT5cbiAgPC91bD5cbjwvZGl2PlxuXG5cbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHVibGljIHVybHMgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgZmlsZVR5cGU6IHN0cmluZztcbiAgcHVibGljIGxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgcHVibGljIHBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgbW9iaWxlID0gZmFsc2U7XG4gIHB1YmxpYyBVcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2luZ2xlRmlsZTogYW55O1xuICBwdWJsaWMgbXVsdGlwbGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZVVwbG9hZCA9IGZhbHNlO1xuICBwdWJsaWMgYmFja0J1dHRvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc291cmNlOiBhbnk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZmlsZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIHVwbG9hZERhdGE6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIF9vbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIF9pbWFnZVBhdGg6IHN0cmluZztcbiAgcHVibGljIHNob3dXZWJjYW0gPSB0cnVlO1xuICBwdWJsaWMgYWxsb3dDYW1lcmFTd2l0Y2ggPSB0cnVlO1xuICBwdWJsaWMgbXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gZmFsc2U7XG4gIHB1YmxpYyBkZXZpY2VJZDogc3RyaW5nO1xuICBwdWJsaWMgdmlkZW9PcHRpb25zOiBNZWRpYVRyYWNrQ29uc3RyYWludHMgPSB7XG4gICAgLy8gd2lkdGg6IHtpZGVhbDogMTAyNH0sXG4gICAgLy8gaGVpZ2h0OiB7aWRlYWw6IDU3Nn1cbiAgfTtcbiAgcHVibGljIGVycm9yczogV2ViY2FtSW5pdEVycm9yW10gPSBbXTtcblxuICAvLyBsYXRlc3Qgc25hcHNob3RcbiAgcHVibGljIHdlYmNhbUltYWdlOiBXZWJjYW1JbWFnZSA9IG51bGw7XG5cbiAgLy8gd2ViY2FtIHNuYXBzaG90IHRyaWdnZXJcbiAgcHVibGljIHRyaWdnZXI6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAvLyBzd2l0Y2ggdG8gbmV4dCAvIHByZXZpb3VzIC8gc3BlY2lmaWMgd2ViY2FtOyB0cnVlL2ZhbHNlOiBmb3J3YXJkL2JhY2t3YXJkcywgc3RyaW5nOiBkZXZpY2VJZFxuICBwdWJsaWMgbmV4dFdlYmNhbTogU3ViamVjdDxib29sZWFuIHwgc3RyaW5nPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4gfCBzdHJpbmc+KCk7XG4gIHB1YmxpYyB1cGxvYWRpbmcgPSBmYWxzZTtcbiAgLy8gVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHVibGljIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZXNkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHB1YmxpYyBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHB1YmxpYyBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICB0aGlzLm11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDY5MikgeyAvLyA3NjhweCBwb3J0cmFpdFxuICAgICAgdGhpcy5tb2JpbGUgPSB0cnVlO1xuICAgIH1cbiAgICBXZWJjYW1VdGlsLmdldEF2YWlsYWJsZVZpZGVvSW5wdXRzKClcbiAgICAgIC50aGVuKChtZWRpYURldmljZXM6IE1lZGlhRGV2aWNlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlwbGVXZWJjYW1zQXZhaWxhYmxlID0gbWVkaWFEZXZpY2VzICYmIG1lZGlhRGV2aWNlcy5sZW5ndGggPiAxO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBnZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIHNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG4gIC8vIEN1cnJlbnQgdGltZSBzdHJpbmcuXG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBvbkJsdXIoKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBmaWxlcyA9IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XG4gICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgIC8vIGNvbnN0IGZpbGVUb0xvYWQgPSBmaWxlcztcblxuICAgIGlmIChmaWxlcykge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGZpbGVMb2FkZWRFdmVudDogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGZpbGVSZWFkZXIucmVzdWx0O1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgY29uc3QgZmlsZVNpemUgPSBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpO1xuXG4gICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBpZDogdGhpcy51cmxzLmxlbmd0aCArIDEsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgc2l6ZTogZmlsZVNpemVcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICghdGhpcy5zaW5nbGVGaWxlKSB7XG4gICAgICAgICAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWxlQ2hhbmdlZC5lbWl0KHBheWxvYWQpO1xuICAgICAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2soKTtcbiAgICB0aGlzLl9vbkNsZWFyLmVtaXQoKTtcbiAgfVxuICBwdWJsaWMgYmFjaygpIHtcbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gdHJ1ZTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB0aGlzLmJhY2tCdXR0b24gPSBmYWxzZTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy5VcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZVVwbG9hZCA9IGZhbHNlO1xuICAgIHRoaXMubGl2ZUNhbWVyYSA9IGZhbHNlO1xuICB9XG4gIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGZpbGV0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYnO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoZmlsZXR5cGUgPT09ICdwZGYnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmICwgYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2xpdmVDYW1lcmEnKSB7XG4gICAgICB0aGlzLmxpdmVDYW1lcmEgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gZmFsc2U7XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gdHJ1ZTtcblxuICB9XG5cbiAgcHVibGljIHVwbG9hZCgpIHtcbiAgICB0aGlzLnVwbG9hZERhdGEuZW1pdCh0aGlzLmZpbGVMaXN0KTtcbiAgICB0aGlzLmJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBNZXJnZUltYWdlcygpIHtcbiAgICBjb25zdCBkb2MgPSBuZXcganNQREYoKTtcbiAgICBkb2MucGFnZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpbWFnZURhdGEgPSB0aGlzLmZpbGVMaXN0W2ldLmRhdGEgfHwgdGhpcy5maWxlTGlzdFtpXS5pbWFnZUFzRGF0YVVybDtcbiAgICAgIGRvYy5hZGRJbWFnZShpbWFnZURhdGEsICdKUEcnLCAxMCwgMTAsIDE5MCwgMjcwKTtcbiAgICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XG4gICAgICBkb2Muc2V0Rm9udFR5cGUoJ25vcm1hbCcpO1xuICAgICAgZG9jLnRleHQoMTgwLCAyOTAsICdwYWdlICcgKyBkb2MucGFnZSk7XG4gICAgICBkb2MucGFnZSsrO1xuICAgICAgaWYgKGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aCkge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBkb2MuZGVsZXRlUGFnZSh0aGlzLmZpbGVMaXN0Lmxlbmd0aCArIDEpO1xuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICB0aGlzLnVybHMgPSBbXTtcbiAgICBjb25zdCBkYXRhID0gZG9jLm91dHB1dCgnZGF0YXVyaXN0cmluZycpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBkYXRhLFxuICAgIH07XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHBheWxvYWQpO1xuICAgIHRoaXMudXJscy5wdXNoKHBheWxvYWQpO1xuICAgIGRvYy5vdXRwdXQoJ2RhdGF1cmxuZXd3aW5kb3cnKTtcbiAgICAvLyBkb2Muc2F2ZSgnVGVzdC5wZGYnKTtcblxuICB9XG4gIHB1YmxpYyBkZWxldGUodXJsczogYW55KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy51cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodXJscy5kYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uZGF0YSA9PT0gdXJscy5kYXRhKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnVybHNbaV0uaW1hZ2VBc0RhdGFVcmwgPT09IHVybHMuaW1hZ2VBc0RhdGFVcmwpIHtcbiAgICAgICAgICB0aGlzLnVybHMuc3BsaWNlKGkpO1xuICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHB1YmxpYyB0cmlnZ2VyU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVXZWJjYW0oKTogdm9pZCB7XG4gICAgdGhpcy5zaG93V2ViY2FtID0gIXRoaXMuc2hvd1dlYmNhbTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVJbml0RXJyb3IoZXJyb3I6IFdlYmNhbUluaXRFcnJvcik6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIHNob3dOZXh0V2ViY2FtKGRpcmVjdGlvbk9yRGV2aWNlSWQ6IGJvb2xlYW4gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyB0cnVlID0+IG1vdmUgZm9yd2FyZCB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBmYWxzZSA9PiBtb3ZlIGJhY2t3YXJkcyB0aHJvdWdoIGRldmljZXNcbiAgICAvLyBzdHJpbmcgPT4gbW92ZSB0byBkZXZpY2Ugd2l0aCBnaXZlbiBkZXZpY2VJZFxuICAgIHRoaXMubmV4dFdlYmNhbS5uZXh0KGRpcmVjdGlvbk9yRGV2aWNlSWQpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUltYWdlKHdlYmNhbUltYWdlOiBXZWJjYW1JbWFnZSk6IHZvaWQge1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmVjZWl2ZWQgd2ViY2FtIGltYWdlJywgd2ViY2FtSW1hZ2UpO1xuICAgIHRoaXMudXJscy5wdXNoKHdlYmNhbUltYWdlKTtcbiAgICB0aGlzLmZpbGVMaXN0LnB1c2god2ViY2FtSW1hZ2UpO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSB0cnVlO1xuICAgIHRoaXMud2ViY2FtSW1hZ2UgPSB3ZWJjYW1JbWFnZTtcbiAgfVxuXG4gIHB1YmxpYyBjYW1lcmFXYXNTd2l0Y2hlZChkZXZpY2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ2FjdGl2ZSBkZXZpY2U6ICcgKyBkZXZpY2VJZCk7XG4gICAgdGhpcy5kZXZpY2VJZCA9IGRldmljZUlkO1xuICB9XG5cbiAgcHVibGljIGdldCB0cmlnZ2VyT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBuZXh0V2ViY2FtT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5uZXh0V2ViY2FtLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=