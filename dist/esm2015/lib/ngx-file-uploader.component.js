/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import * as pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { WebcamUtil } from 'ngx-webcam';
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => {
    // placeholder call backs
});
const ɵ0 = noop;
export class NgxFileUploaderComponent {
    constructor() {
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
    ngOnInit() {
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
        (mediaDevices) => {
            this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        }));
    }
    // get accessor
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    // Current time string.
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        /** @type {?} */
        const files = event.srcElement.files;
        this.uploading = true;
        // const fileToLoad = files;
        if (files) {
            for (const file of files) {
                /** @type {?} */
                const fileReader = new FileReader();
                fileReader.onload = (/**
                 * @param {?} fileLoadedEvent
                 * @return {?}
                 */
                (fileLoadedEvent) => {
                    /** @type {?} */
                    const data = fileReader.result;
                    /** @type {?} */
                    const name = file.name;
                    /** @type {?} */
                    const fileSize = Math.round(file.size / 1024);
                    /** @type {?} */
                    const payload = {
                        data,
                        id: this.urls.length + 1,
                        name: name,
                        size: fileSize
                    };
                    if (!this.singleFile) {
                        this.urls.push(payload);
                        this.fileList.push(payload);
                    }
                    else {
                        this.fileChanged.emit(payload);
                        this.back();
                    }
                });
                fileReader.readAsDataURL(file);
            }
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this.value = '';
        this.onChangeCallback(this.value);
        this.urls = [];
        this.back();
        this._onClear.emit();
    }
    /**
     * @return {?}
     */
    back() {
        this.selectFileType = true;
        this.urls = [];
        this.backButton = false;
        this.fileList = [];
        this.UploadCaptions = false;
        this.pdfAvailable = false;
        this.fileUpload = false;
        this.liveCamera = false;
    }
    /**
     * @param {?} filetype
     * @return {?}
     */
    toggleVisibility(filetype) {
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
    }
    /**
     * @return {?}
     */
    upload() {
        if (this.formEntry && !this.pdfAvailable) {
            this.MergeImages();
        }
        this.uploadData.emit(this.fileList);
        this.back();
    }
    /**
     * @return {?}
     */
    MergeImages() {
        /** @type {?} */
        const doc = new jsPDF({ compress: true });
        doc.page = 1;
        for (let i = 0; i < this.fileList.length; i++) {
            /** @type {?} */
            const imageData = this.fileList[i].data || this.fileList[i].imageAsDataUrl;
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
        const output = doc.output('datauristring');
        /** @type {?} */
        const re = /filename=generated.pdf;/gi;
        /** @type {?} */
        const data = output.replace(re, '');
        /** @type {?} */
        const payload = {
            data,
        };
        if (this.formEntry) {
            this.fileList = [];
            this.urls = [];
        }
        this.message = 'The images have been merged into one pdf';
        this.fileList.push(payload);
        this.urls.push(payload);
        this.singleFile = 'true';
    }
    /**
     * @param {?} urls
     * @return {?}
     */
    delete(urls) {
        for (let i = 0; i <= this.urls.length; i++) {
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
        const re = /pdf/gi;
        for (let index = 0; index < this.urls.length; index++) {
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
    }
    /**
     * @return {?}
     */
    triggerSnapshot() {
        this.trigger.next();
    }
    /**
     * @return {?}
     */
    toggleWebcam() {
        this.showWebcam = !this.showWebcam;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleInitError(error) {
        this.errors.push(error);
    }
    /**
     * @param {?} directionOrDeviceId
     * @return {?}
     */
    showNextWebcam(directionOrDeviceId) {
        // true => move forward through devices
        // false => move backwards through devices
        // string => move to device with given deviceId
        this.nextWebcam.next(directionOrDeviceId);
    }
    /**
     * @param {?} webcamImage
     * @return {?}
     */
    handleImage(webcamImage) {
        // console.info('received webcam image', webcamImage);
        if (this.singleFile) {
            this.urls = [];
            this.fileList = [];
            this.pushData(webcamImage);
        }
        this.pushData(webcamImage);
    }
    /**
     * @param {?} webcamImage
     * @return {?}
     */
    pushData(webcamImage) {
        this.urls.push(webcamImage);
        this.fileList.push(webcamImage);
    }
    /**
     * @param {?} deviceId
     * @return {?}
     */
    cameraWasSwitched(deviceId) {
        // console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    }
    /**
     * @return {?}
     */
    get triggerObservable() {
        return this.trigger.asObservable();
    }
    /**
     * @return {?}
     */
    get nextWebcamObservable() {
        return this.nextWebcam.asObservable();
    }
}
NgxFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-file-uploader',
                template: `<div *ngIf="message" class="alert alert-success alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
        aria-hidden="true">&times;</span></button> {{message}}
  </div>
<div *ngIf="backButton">
  <button class="btn btn-default image-preview-primary" type="button" (click)="back()" >
    <span class="glyphicon glyphicon-circle-arrow-left"></span> Back
</button>
</div>
<div *ngIf="selectFileType" class="panel panel-primary">
    <input type="text" class="form-control" readonly [(ngModel)]="value">
  <div class="panel-heading">UPLOAD FILE TYPE</div>
  <div class="panel-body">
    <div class="row-cb">
      <span><input name="image" id="ima" (change)="toggleVisibility('image')" type="checkbox" /></span>
      <label for="ima">Image</label>

      <div class="clear-both"></div>
</div>
<div class="row-cb">
  <span><input name="option" id="pdf" (change)="toggleVisibility('pdf')" type="checkbox" /></span>
  <label for="pdf">PDF</label>

  <div class="clear-both"></div>
</div>
<div *ngIf="!singleFile" class="row-cb">
  <span><input name="option" id="both" (change)="toggleVisibility('both')" type="checkbox" /></span>
  <label  for="both">Image & PDF</label>

  <div class="clear-both"></div>
</div>
<div class="row-cb">
  <span><input name="camera" id="camera" (change)="toggleVisibility('liveCamera')" type="checkbox" /></span>
  <label for="camera" >Live Camera</label>

  <div class="clear-both"></div>
</div>
  </div>
</div>
<div [hidden]="!urls[0]" class="panel panel-primary">
  <div class="panel-heading">SELECTED FILES</div>
  <div class="panel-body">
      <div style="display: inline-block;" *ngFor="let url of urls;let i=index">
          <a class = "columne" id = "caption">
           <img style=" border: 1px solid rgb(97, 97, 97); margin: 2px; border-radius: 4px;padding: 5px;" id="img{{i}}" [src]="url.data || url.imageAsDataUrl" 
           onError="this.onerror=null;this.src='https://store-images.s-microsoft.com/image/apps.34961.13510798887621962.47b62c4c-a0c6-4e3c-87bb-509317d9c364.a6354b48-c68a-47fa-b69e-4cb592d42ffc?mode=scale&q=90&h=300&w=300' ;" class="rounded mb-3" width="100" height="200">
           <div class="text"><h2 title="Click to Delete File {{url.name}}" (click)="delete(url)"  style="color: red; font-family: fantasy;"><span class="glyphicon glyphicon-trash"></span>REMOVE</h2></div>
          </a>
         </div>
    </div>
    <div class="panel-footer">
        <!-- <button *ngIf="UploadCaptions" type="button" (click)="upload()" class="button">
            <span class="glyphicon glyphicon-upload"></span> Upload Files
        </button> -->
        <button *ngIf="!pdfAvailable && fileUpload || liveCamera || merge" type="button" [disabled]="!urls[1]" (click)="MergeImages()"  title="merge the images as pages in one pdf document"  class="btn btn-default image-preview-clear">
          <span class="glyphicon glyphicon-upload"></span> Merge
        </button>
    </div>
</div>
<div *ngIf="fileUpload">

  <div class="input-group">
    <input type="text" class="form-control" readonly [(ngModel)]="value">
    <div class="input-group-btn">

      <div class="btn btn-default image-preview-input">
        <span class="glyphicon glyphicon-folder-open"></span>
        <span class="image-preview-input-title">SELECT FILE</span>
        <input *ngIf="multiple" type="file" multiple accept="{{fileType}}" (blur)="onBlur()" name="input-file-preview" (change)="onChange($event)"
        /> 
        <input *ngIf="!multiple" type="file" accept="{{fileType}}" (blur)="onBlur()" name="input-file-preview" (change)="onChange($event)"
        /> 
      </div>
      <button *ngIf="value" type="button" (click)="clear()" class="btn btn-default image-preview-clear">
                        <span class="glyphicon glyphicon-remove"></span> Clear
    </button>
    <button *ngIf="multiple" type="button" (click)="upload()" class="button">
      <span class="glyphicon glyphicon-upload"></span> Upload
</button>
    </div>
  </div>
  <div *ngIf="!mobile" class="image-upload-wrap">
    <input *ngIf="multiple" class="file-upload-input" type='file' (change)="onChange($event)" multiple accept="{{fileType}}" />
    <input *ngIf="!multiple" class="file-upload-input" type='file' (change)="onChange($event)" accept="{{fileType}}" />
    <div class="drag-text">
      <h3>Drag and Drop file(s)</h3>
    </div>
  </div>
</div>
<div *ngIf="liveCamera">
  <div style="text-align:center">
    <div>
      <webcam [height]="700" [width]="600" [trigger]="triggerObservable" (imageCapture)="handleImage($event)" *ngIf="showWebcam"
              [allowCameraSwitch]="allowCameraSwitch" [switchCamera]="nextWebcamObservable"
              [videoOptions]="videoOptions"
              [imageQuality]="1"
              (cameraSwitched)="cameraWasSwitched($event)"
              (initError)="handleInitError($event)"
      ></webcam>
      <br/>
      <button class="btn btn-default image-preview-clear" (click)="triggerSnapshot();"><span class="glyphicon glyphicon-camera"></span>Take A Snapshot</button>
      <!-- <button class="actionBtn" (click)="toggleWebcam();">Toggle Webcam</button> -->
      <!-- <br/> -->
      <button class="btn btn-default image-preview-clear" (click)="showNextWebcam(true);" [disabled]="!multipleWebcamsAvailable">Change Camera</button>
      <!-- <input id="cameraSwitchCheckbox" type="checkbox" [(ngModel)]="allowCameraSwitch"><label for="cameraSwitchCheckbox">Allow Camera Switch</label>
      <br/> -->
      <!-- DeviceId: <input id="deviceId" type="text" [(ngModel)]="deviceId" style="width: 500px">
      <button (click)="showNextWebcam(deviceId);">Activate</button> -->
    </div>
  </div>
  <h4 *ngIf="errors.length > 0">Messages:</h4>
  <ul *ngFor="let error of errors">
    <li>{{error | json}}</li>
  </ul>
</div>


`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgxFileUploaderComponent)), multi: true
                    }
                ],
                styles: [`.btn-file{position:relative;overflow:hidden}.btn-file input[type=file]{position:absolute;top:0;right:0;min-width:100%;min-height:100%;font-size:100px;text-align:right;opacity:0;outline:0;background:#fff;cursor:inherit;display:block}#img-upload{width:100%}.image-preview-input input[type=file]{position:absolute;top:0;right:0;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0}.file-upload{background-color:#fff;width:600px;margin:0 auto;padding:20px}.file-upload-btn{width:100%;margin:0;color:#fff;background:#1fb264;border:none;padding:10px;border-radius:4px;border-bottom:4px solid #15824b;transition:.2s;outline:0;text-transform:uppercase;font-weight:700}ul{list-style-type:none;margin:0;padding:0}.file-upload-btn:hover{background:#1aa059;color:#fff;transition:.2s;cursor:pointer}.file-upload-btn:active{border:0;transition:.2s}.file-upload-content{display:none;text-align:center}.file-upload-input{position:absolute;margin:0;padding:0;width:100%;height:100%;outline:0;opacity:0;cursor:pointer}.image-upload-wrap{margin-top:20px;border:4px dashed #3683c7;position:relative}.image-dropping,.image-upload-wrap:hover{background-color:#337ab7;border:4px dashed #fff}.image-title-wrap{padding:0 15px 15px;color:#222}.drag-text{text-align:center}.drag-text h3{font-weight:100;text-transform:uppercase;color:#155a82;padding:60px 0}.file-upload-image{max-height:200px;max-width:200px;margin:auto;padding:20px}.button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-color:#004a7f;border:none;color:#fff;text-decoration:none;-webkit-animation:1.5s infinite glowing;animation:1.5s infinite glowing}@-webkit-keyframes glowing{0%{background-color:#002fb2;-webkit-box-shadow:0 0 3px #005cb2}50%{background-color:#203864;-webkit-box-shadow:0 0 40px #203864}100%{background-color:#005cb2;-webkit-box-shadow:0 0 3px #005cb2}}@keyframes glowing{0%,100%{background-color:#005cb2;box-shadow:0 0 3px #005cb2}50%{background-color:#203864;box-shadow:0 0 40px #203864}}.actionBtn{margin-top:5px;margin-bottom:2px;font-size:1.2em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700;margin-right:10px}.row-cb{margin:auto;font-size:15px}.row-cb label{float:left}.row-cb span{float:left;text-align:left}.snapshot{text-align:center}.snapshot img{max-width:800px;max-height:800px}.columne#caption .text h1{margin:0;color:#fff}.columne#caption:hover .text{opacity:1;cursor:pointer;opacity:1}.columne#caption{position:relative}.columne#caption .text{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:10;opacity:0;transition:.8s}.columne#caption:hover img{-webkit-filter:blur(4px);filter:blur(4px)}@media (max-width:629px){.file-upload-input{display:none!important}}`]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZpbGUtdXBsb2FkZXItYW1wYXRoMi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFDekIsTUFBTSxFQUFFLFlBQVksRUFDaEMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6RSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQzs7TUFFaEUsSUFBSTs7O0FBQUcsR0FBRyxFQUFFO0lBQ2hCLHlCQUF5QjtBQUMzQixDQUFDLENBQUE7O0FBbUlELE1BQU07SUFqSU47UUFrSVMsU0FBSSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsYUFBUSxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7UUFFNUIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBR3ZCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVULGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFD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OztJQUM1QiwwQ0FBc0I7O0lBQ3RCLGtEQUE4Qjs7SUFDOUIsOENBQWdDOztJQUNoQyw2Q0FBK0I7O0lBQy9CLDRDQUF1Qjs7SUFDdkIsOENBQTBCOztJQUMxQix5Q0FBb0I7O0lBQ3BCLDhDQUEwQjs7SUFDMUIsMENBQTRCOztJQUM1QiwrQ0FBcUU7O0lBQ3JFLDhDQUFvRTs7SUFDcEUsNENBQWtFOztJQUNsRSw4Q0FBMEI7O0lBQzFCLDhDQUF5Qjs7SUFDekIscURBQWdDOztJQUNoQyw0REFBd0M7O0lBQ3hDLDRDQUF3Qjs7SUFDeEIsZ0RBR0U7O0lBQ0YsMENBQXNDOztJQUd0QywrQ0FBdUM7Ozs7O0lBR3ZDLDJDQUFxRDs7Ozs7SUFFckQsOENBQWdGOztJQUNoRiw2Q0FBeUI7Ozs7O0lBRXpCLDhDQUE2Qjs7Ozs7SUFJN0IscURBQTZDOzs7OztJQUM3QyxvREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIGZvcndhcmRSZWYsXG4gIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIMm1Q29uc29sZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbi8vIGltcG9ydCAqIGFzIHBkZk1ha2UgZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlJztcbmltcG9ydCBqc1BERiBmcm9tICdqc3BkZic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBXZWJjYW1JbWFnZSwgV2ViY2FtSW5pdEVycm9yLCBXZWJjYW1VdGlsIH0gZnJvbSAnbmd4LXdlYmNhbSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG4gIC8vIHBsYWNlaG9sZGVyIGNhbGwgYmFja3Ncbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1maWxlLXVwbG9hZGVyJyxcbiAgc3R5bGVzOiBbYC5idG4tZmlsZXtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmJ0bi1maWxlIGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttaW4td2lkdGg6MTAwJTttaW4taGVpZ2h0OjEwMCU7Zm9udC1zaXplOjEwMHB4O3RleHQtYWxpZ246cmlnaHQ7b3BhY2l0eTowO291dGxpbmU6MDtiYWNrZ3JvdW5kOiNmZmY7Y3Vyc29yOmluaGVyaXQ7ZGlzcGxheTpibG9ja30jaW1nLXVwbG9hZHt3aWR0aDoxMDAlfS5pbWFnZS1wcmV2aWV3LWlucHV0IGlucHV0W3R5cGU9ZmlsZV17cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7cmlnaHQ6MDttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowfS5maWxlLXVwbG9hZHtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7d2lkdGg6NjAwcHg7bWFyZ2luOjAgYXV0bztwYWRkaW5nOjIwcHh9LmZpbGUtdXBsb2FkLWJ0bnt3aWR0aDoxMDAlO21hcmdpbjowO2NvbG9yOiNmZmY7YmFja2dyb3VuZDojMWZiMjY0O2JvcmRlcjpub25lO3BhZGRpbmc6MTBweDtib3JkZXItcmFkaXVzOjRweDtib3JkZXItYm90dG9tOjRweCBzb2xpZCAjMTU4MjRiO3RyYW5zaXRpb246LjJzO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NzAwfXVse2xpc3Qtc3R5bGUtdHlwZTpub25lO21hcmdpbjowO3BhZGRpbmc6MH0uZmlsZS11cGxvYWQtYnRuOmhvdmVye2JhY2tncm91bmQ6IzFhYTA1OTtjb2xvcjojZmZmO3RyYW5zaXRpb246LjJzO2N1cnNvcjpwb2ludGVyfS5maWxlLXVwbG9hZC1idG46YWN0aXZle2JvcmRlcjowO3RyYW5zaXRpb246LjJzfS5maWxlLXVwbG9hZC1jb250ZW50e2Rpc3BsYXk6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uZmlsZS11cGxvYWQtaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3V0bGluZTowO29wYWNpdHk6MDtjdXJzb3I6cG9pbnRlcn0uaW1hZ2UtdXBsb2FkLXdyYXB7bWFyZ2luLXRvcDoyMHB4O2JvcmRlcjo0cHggZGFzaGVkICMzNjgzYzc7cG9zaXRpb246cmVsYXRpdmV9LmltYWdlLWRyb3BwaW5nLC5pbWFnZS11cGxvYWQtd3JhcDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMzdhYjc7Ym9yZGVyOjRweCBkYXNoZWQgI2ZmZn0uaW1hZ2UtdGl0bGUtd3JhcHtwYWRkaW5nOjAgMTVweCAxNXB4O2NvbG9yOiMyMjJ9LmRyYWctdGV4dHt0ZXh0LWFsaWduOmNlbnRlcn0uZHJhZy10ZXh0IGgze2ZvbnQtd2VpZ2h0OjEwMDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Y29sb3I6IzE1NWE4MjtwYWRkaW5nOjYwcHggMH0uZmlsZS11cGxvYWQtaW1hZ2V7bWF4LWhlaWdodDoyMDBweDttYXgtd2lkdGg6MjAwcHg7bWFyZ2luOmF1dG87cGFkZGluZzoyMHB4fS5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtY29sb3I6IzAwNGE3Zjtib3JkZXI6bm9uZTtjb2xvcjojZmZmO3RleHQtZGVjb3JhdGlvbjpub25lOy13ZWJraXQtYW5pbWF0aW9uOjEuNXMgaW5maW5pdGUgZ2xvd2luZzthbmltYXRpb246MS41cyBpbmZpbml0ZSBnbG93aW5nfUAtd2Via2l0LWtleWZyYW1lcyBnbG93aW5nezAle2JhY2tncm91bmQtY29sb3I6IzAwMmZiMjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCA0MHB4ICMyMDM4NjR9MTAwJXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDVjYjI7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAzcHggIzAwNWNiMn19QGtleWZyYW1lcyBnbG93aW5nezAlLDEwMCV7YmFja2dyb3VuZC1jb2xvcjojMDA1Y2IyO2JveC1zaGFkb3c6MCAwIDNweCAjMDA1Y2IyfTUwJXtiYWNrZ3JvdW5kLWNvbG9yOiMyMDM4NjQ7Ym94LXNoYWRvdzowIDAgNDBweCAjMjAzODY0fX0uYWN0aW9uQnRue21hcmdpbi10b3A6NXB4O21hcmdpbi1ib3R0b206MnB4O2ZvbnQtc2l6ZToxLjJlbX1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLXJpZ2h0OjEwcHh9LnJvdy1jYnttYXJnaW46YXV0bztmb250LXNpemU6MTVweH0ucm93LWNiIGxhYmVse2Zsb2F0OmxlZnR9LnJvdy1jYiBzcGFue2Zsb2F0OmxlZnQ7dGV4dC1hbGlnbjpsZWZ0fS5zbmFwc2hvdHt0ZXh0LWFsaWduOmNlbnRlcn0uc25hcHNob3QgaW1ne21heC13aWR0aDo4MDBweDttYXgtaGVpZ2h0OjgwMHB4fS5jb2x1bW5lI2NhcHRpb24gLnRleHQgaDF7bWFyZ2luOjA7Y29sb3I6I2ZmZn0uY29sdW1uZSNjYXB0aW9uOmhvdmVyIC50ZXh0e29wYWNpdHk6MTtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjF9LmNvbHVtbmUjY2FwdGlvbntwb3NpdGlvbjpyZWxhdGl2ZX0uY29sdW1uZSNjYXB0aW9uIC50ZXh0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO3otaW5kZXg6MTA7b3BhY2l0eTowO3RyYW5zaXRpb246LjhzfS5jb2x1bW5lI2NhcHRpb246aG92ZXIgaW1ney13ZWJraXQtZmlsdGVyOmJsdXIoNHB4KTtmaWx0ZXI6Ymx1cig0cHgpfUBtZWRpYSAobWF4LXdpZHRoOjYyOXB4KXsuZmlsZS11cGxvYWQtaW5wdXR7ZGlzcGxheTpub25lIWltcG9ydGFudH19YF0sXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIm1lc3NhZ2VcIiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGVcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPjxzcGFuXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj4ge3ttZXNzYWdlfX1cclxuICA8L2Rpdj5cclxuPGRpdiAqbmdJZj1cImJhY2tCdXR0b25cIj5cclxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiYmFjaygpXCIgPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1sZWZ0XCI+PC9zcGFuPiBCYWNrXHJcbjwvYnV0dG9uPlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cInNlbGVjdEZpbGVUeXBlXCIgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlYWRvbmx5IFsobmdNb2RlbCldPVwidmFsdWVcIj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlVQTE9BRCBGSUxFIFRZUEU8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdy1jYlwiPlxyXG4gICAgICA8c3Bhbj48aW5wdXQgbmFtZT1cImltYWdlXCIgaWQ9XCJpbWFcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2ltYWdlJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICAgICAgPGxhYmVsIGZvcj1cImltYVwiPkltYWdlPC9sYWJlbD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjbGVhci1ib3RoXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwicm93LWNiXCI+XHJcbiAgPHNwYW4+PGlucHV0IG5hbWU9XCJvcHRpb25cIiBpZD1cInBkZlwiIChjaGFuZ2UpPVwidG9nZ2xlVmlzaWJpbGl0eSgncGRmJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICA8bGFiZWwgZm9yPVwicGRmXCI+UERGPC9sYWJlbD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgKm5nSWY9XCIhc2luZ2xlRmlsZVwiIGNsYXNzPVwicm93LWNiXCI+XHJcbiAgPHNwYW4+PGlucHV0IG5hbWU9XCJvcHRpb25cIiBpZD1cImJvdGhcIiAoY2hhbmdlKT1cInRvZ2dsZVZpc2liaWxpdHkoJ2JvdGgnKVwiIHR5cGU9XCJjaGVja2JveFwiIC8+PC9zcGFuPlxyXG4gIDxsYWJlbCAgZm9yPVwiYm90aFwiPkltYWdlICYgUERGPC9sYWJlbD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJyb3ctY2JcIj5cclxuICA8c3Bhbj48aW5wdXQgbmFtZT1cImNhbWVyYVwiIGlkPVwiY2FtZXJhXCIgKGNoYW5nZSk9XCJ0b2dnbGVWaXNpYmlsaXR5KCdsaXZlQ2FtZXJhJylcIiB0eXBlPVwiY2hlY2tib3hcIiAvPjwvc3Bhbj5cclxuICA8bGFiZWwgZm9yPVwiY2FtZXJhXCIgPkxpdmUgQ2FtZXJhPC9sYWJlbD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImNsZWFyLWJvdGhcIj48L2Rpdj5cclxuPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IFtoaWRkZW5dPVwiIXVybHNbMF1cIiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPlNFTEVDVEVEIEZJTEVTPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiAqbmdGb3I9XCJsZXQgdXJsIG9mIHVybHM7bGV0IGk9aW5kZXhcIj5cclxuICAgICAgICAgIDxhIGNsYXNzID0gXCJjb2x1bW5lXCIgaWQgPSBcImNhcHRpb25cIj5cclxuICAgICAgICAgICA8aW1nIHN0eWxlPVwiIGJvcmRlcjogMXB4IHNvbGlkIHJnYig5NywgOTcsIDk3KTsgbWFyZ2luOiAycHg7IGJvcmRlci1yYWRpdXM6IDRweDtwYWRkaW5nOiA1cHg7XCIgaWQ9XCJpbWd7e2l9fVwiIFtzcmNdPVwidXJsLmRhdGEgfHwgdXJsLmltYWdlQXNEYXRhVXJsXCIgXHJcbiAgICAgICAgICAgb25FcnJvcj1cInRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPSdodHRwczovL3N0b3JlLWltYWdlcy5zLW1pY3Jvc29mdC5jb20vaW1hZ2UvYXBwcy4zNDk2MS4xMzUxMDc5ODg4NzYyMTk2Mi40N2I2MmM0Yy1hMGM2LTRlM2MtODdiYi01MDkzMTdkOWMzNjQuYTYzNTRiNDgtYzY4YS00N2ZhLWI2OWUtNGNiNTkyZDQyZmZjP21vZGU9c2NhbGUmcT05MCZoPTMwMCZ3PTMwMCcgO1wiIGNsYXNzPVwicm91bmRlZCBtYi0zXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIyMDBcIj5cclxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPjxoMiB0aXRsZT1cIkNsaWNrIHRvIERlbGV0ZSBGaWxlIHt7dXJsLm5hbWV9fVwiIChjbGljayk9XCJkZWxldGUodXJsKVwiICBzdHlsZT1cImNvbG9yOiByZWQ7IGZvbnQtZmFtaWx5OiBmYW50YXN5O1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvc3Bhbj5SRU1PVkU8L2gyPjwvZGl2PlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWZvb3RlclwiPlxyXG4gICAgICAgIDwhLS0gPGJ1dHRvbiAqbmdJZj1cIlVwbG9hZENhcHRpb25zXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWQoKVwiIGNsYXNzPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi11cGxvYWRcIj48L3NwYW4+IFVwbG9hZCBGaWxlc1xyXG4gICAgICAgIDwvYnV0dG9uPiAtLT5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXBkZkF2YWlsYWJsZSAmJiBmaWxlVXBsb2FkIHx8IGxpdmVDYW1lcmEgfHwgbWVyZ2VcIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiF1cmxzWzFdXCIgKGNsaWNrKT1cIk1lcmdlSW1hZ2VzKClcIiAgdGl0bGU9XCJtZXJnZSB0aGUgaW1hZ2VzIGFzIHBhZ2VzIGluIG9uZSBwZGYgZG9jdW1lbnRcIiAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1jbGVhclwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVwbG9hZFwiPjwvc3Bhbj4gTWVyZ2VcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiAqbmdJZj1cImZpbGVVcGxvYWRcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHJlYWRvbmx5IFsobmdNb2RlbCldPVwidmFsdWVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgaW1hZ2UtcHJldmlldy1pbnB1dFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1mb2xkZXItb3BlblwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImltYWdlLXByZXZpZXctaW5wdXQtdGl0bGVcIj5TRUxFQ1QgRklMRTwvc3Bhbj5cclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJmaWxlXCIgbXVsdGlwbGUgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgKGJsdXIpPVwib25CbHVyKClcIiBuYW1lPVwiaW5wdXQtZmlsZS1wcmV2aWV3XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAvPiBcclxuICAgICAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIChibHVyKT1cIm9uQmx1cigpXCIgbmFtZT1cImlucHV0LWZpbGUtcHJldmlld1wiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgLz4gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uICpuZ0lmPVwidmFsdWVcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIj48L3NwYW4+IENsZWFyXHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b24gKm5nSWY9XCJtdWx0aXBsZVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkKClcIiBjbGFzcz1cImJ1dHRvblwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXBsb2FkXCI+PC9zcGFuPiBVcGxvYWRcclxuPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwiIW1vYmlsZVwiIGNsYXNzPVwiaW1hZ2UtdXBsb2FkLXdyYXBcIj5cclxuICAgIDxpbnB1dCAqbmdJZj1cIm11bHRpcGxlXCIgY2xhc3M9XCJmaWxlLXVwbG9hZC1pbnB1dFwiIHR5cGU9J2ZpbGUnIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIG11bHRpcGxlIGFjY2VwdD1cInt7ZmlsZVR5cGV9fVwiIC8+XHJcbiAgICA8aW5wdXQgKm5nSWY9XCIhbXVsdGlwbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkLWlucHV0XCIgdHlwZT0nZmlsZScgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgYWNjZXB0PVwie3tmaWxlVHlwZX19XCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJkcmFnLXRleHRcIj5cclxuICAgICAgPGgzPkRyYWcgYW5kIERyb3AgZmlsZShzKTwvaDM+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgKm5nSWY9XCJsaXZlQ2FtZXJhXCI+XHJcbiAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+XHJcbiAgICA8ZGl2PlxyXG4gICAgICA8d2ViY2FtIFtoZWlnaHRdPVwiNzAwXCIgW3dpZHRoXT1cIjYwMFwiIFt0cmlnZ2VyXT1cInRyaWdnZXJPYnNlcnZhYmxlXCIgKGltYWdlQ2FwdHVyZSk9XCJoYW5kbGVJbWFnZSgkZXZlbnQpXCIgKm5nSWY9XCJzaG93V2ViY2FtXCJcclxuICAgICAgICAgICAgICBbYWxsb3dDYW1lcmFTd2l0Y2hdPVwiYWxsb3dDYW1lcmFTd2l0Y2hcIiBbc3dpdGNoQ2FtZXJhXT1cIm5leHRXZWJjYW1PYnNlcnZhYmxlXCJcclxuICAgICAgICAgICAgICBbdmlkZW9PcHRpb25zXT1cInZpZGVvT3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgW2ltYWdlUXVhbGl0eV09XCIxXCJcclxuICAgICAgICAgICAgICAoY2FtZXJhU3dpdGNoZWQpPVwiY2FtZXJhV2FzU3dpdGNoZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgKGluaXRFcnJvcik9XCJoYW5kbGVJbml0RXJyb3IoJGV2ZW50KVwiXHJcbiAgICAgID48L3dlYmNhbT5cclxuICAgICAgPGJyLz5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBpbWFnZS1wcmV2aWV3LWNsZWFyXCIgKGNsaWNrKT1cInRyaWdnZXJTbmFwc2hvdCgpO1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jYW1lcmFcIj48L3NwYW4+VGFrZSBBIFNuYXBzaG90PC9idXR0b24+XHJcbiAgICAgIDwhLS0gPGJ1dHRvbiBjbGFzcz1cImFjdGlvbkJ0blwiIChjbGljayk9XCJ0b2dnbGVXZWJjYW0oKTtcIj5Ub2dnbGUgV2ViY2FtPC9idXR0b24+IC0tPlxyXG4gICAgICA8IS0tIDxici8+IC0tPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGltYWdlLXByZXZpZXctY2xlYXJcIiAoY2xpY2spPVwic2hvd05leHRXZWJjYW0odHJ1ZSk7XCIgW2Rpc2FibGVkXT1cIiFtdWx0aXBsZVdlYmNhbXNBdmFpbGFibGVcIj5DaGFuZ2UgQ2FtZXJhPC9idXR0b24+XHJcbiAgICAgIDwhLS0gPGlucHV0IGlkPVwiY2FtZXJhU3dpdGNoQ2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cImFsbG93Q2FtZXJhU3dpdGNoXCI+PGxhYmVsIGZvcj1cImNhbWVyYVN3aXRjaENoZWNrYm94XCI+QWxsb3cgQ2FtZXJhIFN3aXRjaDwvbGFiZWw+XHJcbiAgICAgIDxici8+IC0tPlxyXG4gICAgICA8IS0tIERldmljZUlkOiA8aW5wdXQgaWQ9XCJkZXZpY2VJZFwiIHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJkZXZpY2VJZFwiIHN0eWxlPVwid2lkdGg6IDUwMHB4XCI+XHJcbiAgICAgIDxidXR0b24gKGNsaWNrKT1cInNob3dOZXh0V2ViY2FtKGRldmljZUlkKTtcIj5BY3RpdmF0ZTwvYnV0dG9uPiAtLT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxoNCAqbmdJZj1cImVycm9ycy5sZW5ndGggPiAwXCI+TWVzc2FnZXM6PC9oND5cclxuICA8dWwgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiPlxyXG4gICAgPGxpPnt7ZXJyb3IgfCBqc29ufX08L2xpPlxyXG4gIDwvdWw+XHJcbjwvZGl2PlxyXG5cclxuXHJcbmAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgcHVibGljIHVybHMgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgc2VsZWN0RmlsZVR5cGUgPSB0cnVlO1xuICBwdWJsaWMgZmlsZUxpc3QgPSBuZXcgQXJyYXk8YW55PigpO1xuICBwdWJsaWMgZmlsZVR5cGU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2UgPSAnJztcbiAgcHVibGljIGxpdmVDYW1lcmEgPSBmYWxzZTtcbiAgcHVibGljIHBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgbW9iaWxlID0gZmFsc2U7XG4gIHB1YmxpYyBVcGxvYWRDYXB0aW9ucyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2luZ2xlRmlsZTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZm9ybUVudHJ5OiBhbnk7XG4gIHB1YmxpYyBtdWx0aXBsZSA9IHRydWU7XG4gIHB1YmxpYyBmaWxlVXBsb2FkID0gZmFsc2U7XG4gIHB1YmxpYyBtZXJnZSA9IHRydWU7XG4gIHB1YmxpYyBiYWNrQnV0dG9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzb3VyY2U6IGFueTtcbiAgQE91dHB1dCgpIHB1YmxpYyBmaWxlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBsb2FkRGF0YTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgX29uQ2xlYXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgX2ltYWdlUGF0aDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd1dlYmNhbSA9IHRydWU7XG4gIHB1YmxpYyBhbGxvd0NhbWVyYVN3aXRjaCA9IHRydWU7XG4gIHB1YmxpYyBtdWx0aXBsZVdlYmNhbXNBdmFpbGFibGUgPSBmYWxzZTtcbiAgcHVibGljIGRldmljZUlkOiBzdHJpbmc7XG4gIHB1YmxpYyB2aWRlb09wdGlvbnM6IE1lZGlhVHJhY2tDb25zdHJhaW50cyA9IHtcbiAgICAvLyB3aWR0aDoge2lkZWFsOiAxMDI0fSxcbiAgICAvLyBoZWlnaHQ6IHtpZGVhbDogNTc2fVxuICB9O1xuICBwdWJsaWMgZXJyb3JzOiBXZWJjYW1Jbml0RXJyb3JbXSA9IFtdO1xuXG4gIC8vIGxhdGVzdCBzbmFwc2hvdFxuICBwdWJsaWMgd2ViY2FtSW1hZ2U6IFdlYmNhbUltYWdlID0gbnVsbDtcblxuICAvLyB3ZWJjYW0gc25hcHNob3QgdHJpZ2dlclxuICBwcml2YXRlIHRyaWdnZXI6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAvLyBzd2l0Y2ggdG8gbmV4dCAvIHByZXZpb3VzIC8gc3BlY2lmaWMgd2ViY2FtOyB0cnVlL2ZhbHNlOiBmb3J3YXJkL2JhY2t3YXJkcywgc3RyaW5nOiBkZXZpY2VJZFxuICBwcml2YXRlIG5leHRXZWJjYW06IFN1YmplY3Q8Ym9vbGVhbiB8IHN0cmluZz4gPSBuZXcgU3ViamVjdDxib29sZWFuIHwgc3RyaW5nPigpO1xuICBwdWJsaWMgdXBsb2FkaW5nID0gZmFsc2U7XG4gIC8vIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XG5cbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlc2RcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy5tdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA2OTIpIHsgLy8gNzY4cHggcG9ydHJhaXRcbiAgICAgIHRoaXMubW9iaWxlID0gdHJ1ZTtcbiAgICB9XG4gICAgV2ViY2FtVXRpbC5nZXRBdmFpbGFibGVWaWRlb0lucHV0cygpXG4gICAgICAudGhlbigobWVkaWFEZXZpY2VzOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpcGxlV2ViY2Ftc0F2YWlsYWJsZSA9IG1lZGlhRGV2aWNlcyAmJiBtZWRpYURldmljZXMubGVuZ3RoID4gMTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuICAvLyBDdXJyZW50IHRpbWUgc3RyaW5nLlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc3QgZmlsZXMgPSBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xuICAgIHRoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAvLyBjb25zdCBmaWxlVG9Mb2FkID0gZmlsZXM7XG5cbiAgICBpZiAoZmlsZXMpIHtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChmaWxlTG9hZGVkRXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBmaWxlUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICBjb25zdCBuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgIGNvbnN0IGZpbGVTaXplID0gTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0KTtcblxuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaWQ6IHRoaXMudXJscy5sZW5ndGggKyAxLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHNpemU6IGZpbGVTaXplXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoIXRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgICAgICAgdGhpcy51cmxzLnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2gocGF5bG9hZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUNoYW5nZWQuZW1pdChwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrKCk7XG4gICAgdGhpcy5fb25DbGVhci5lbWl0KCk7XG4gIH1cbiAgcHVibGljIGJhY2soKSB7XG4gICAgdGhpcy5zZWxlY3RGaWxlVHlwZSA9IHRydWU7XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xuICAgIHRoaXMuVXBsb2FkQ2FwdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuZmlsZVVwbG9hZCA9IGZhbHNlO1xuICAgIHRoaXMubGl2ZUNhbWVyYSA9IGZhbHNlO1xuICB9XG4gIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGZpbGV0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAoZmlsZXR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIHRoaXMuZmlsZVR5cGUgPSAnaW1hZ2UvcG5nLCBpbWFnZS9qcGVnLCBpbWFnZS9naWYnO1xuICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoZmlsZXR5cGUgPT09ICdwZGYnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICB0aGlzLnBkZkF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmZpbGVVcGxvYWQgPSB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmZpbGVUeXBlID0gJ2ltYWdlL3BuZywgaW1hZ2UvanBlZywgaW1hZ2UvZ2lmICwgYXBwbGljYXRpb24vcGRmJztcbiAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlsZVVwbG9hZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChmaWxldHlwZSA9PT0gJ2xpdmVDYW1lcmEnKSB7XG4gICAgICB0aGlzLmxpdmVDYW1lcmEgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdEZpbGVUeXBlID0gZmFsc2U7XG4gICAgdGhpcy5iYWNrQnV0dG9uID0gdHJ1ZTtcblxuICB9XG5cbiAgcHVibGljIHVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5mb3JtRW50cnkgJiYgIXRoaXMucGRmQXZhaWxhYmxlKSB7XG4gICAgICB0aGlzLk1lcmdlSW1hZ2VzKCk7XG4gICAgfVxuICAgIHRoaXMudXBsb2FkRGF0YS5lbWl0KHRoaXMuZmlsZUxpc3QpO1xuICAgIHRoaXMuYmFjaygpO1xuICB9XG5cbiAgcHVibGljIE1lcmdlSW1hZ2VzKCkge1xuICAgIGNvbnN0IGRvYyA9IG5ldyBqc1BERih7IGNvbXByZXNzOiB0cnVlIH0pO1xuICAgIGRvYy5wYWdlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuZmlsZUxpc3RbaV0uZGF0YSB8fCB0aGlzLmZpbGVMaXN0W2ldLmltYWdlQXNEYXRhVXJsO1xuICAgICAgZG9jLmFkZEltYWdlKGltYWdlRGF0YSwgJ0pQRycsIDEwLCAxMCwgMTkwLCAyNzAsIHVuZGVmaW5lZCwgJ0ZBU1QnKTtcbiAgICAgIGRvYy5zZXRGb250KCdjb3VyaWVyJyk7XG4gICAgICBkb2Muc2V0Rm9udFR5cGUoJ25vcm1hbCcpO1xuICAgICAgZG9jLnRleHQoMTgwLCAyOTAsICdwYWdlICcgKyBkb2MucGFnZSk7XG4gICAgICBkb2MucGFnZSsrO1xuICAgICAgaWYgKGkgPCB0aGlzLmZpbGVMaXN0Lmxlbmd0aCkge1xuICAgICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBkb2Muc2V0UHJvcGVydGllcyh7XG4gICAgICB0aXRsZTogJ0FtcGF0aCBNZWRpY2FsIERhdGEnLFxuICAgICAgYXV0aG9yOiAnUE9DJyxcbiAgICAgIGNyZWF0b3I6ICdBTVBBVEgnXG4gICAgfSk7XG4gICAgZG9jLmRlbGV0ZVBhZ2UodGhpcy5maWxlTGlzdC5sZW5ndGggKyAxKTtcbiAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgdGhpcy51cmxzID0gW107XG4gICAgY29uc3Qgb3V0cHV0ID0gZG9jLm91dHB1dCgnZGF0YXVyaXN0cmluZycpO1xuICAgIGNvbnN0IHJlID0gL2ZpbGVuYW1lPWdlbmVyYXRlZC5wZGY7L2dpO1xuICAgIGNvbnN0IGRhdGEgPSBvdXRwdXQucmVwbGFjZShyZSwgJycpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBkYXRhLFxuICAgIH07XG4gICAgaWYgKHRoaXMuZm9ybUVudHJ5KSB7XG4gICAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgICB0aGlzLnVybHMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlID0gJ1RoZSBpbWFnZXMgaGF2ZSBiZWVuIG1lcmdlZCBpbnRvIG9uZSBwZGYnO1xuICAgIHRoaXMuZmlsZUxpc3QucHVzaChwYXlsb2FkKTtcbiAgICB0aGlzLnVybHMucHVzaChwYXlsb2FkKTtcbiAgICB0aGlzLnNpbmdsZUZpbGUgPSAndHJ1ZSc7XG5cbiAgfVxuICBwdWJsaWMgZGVsZXRlKHVybHM6IGFueSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMudXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHVybHMuZGF0YSkge1xuICAgICAgICBpZiAodGhpcy51cmxzW2ldLmRhdGEgPT09IHVybHMuZGF0YSkge1xuICAgICAgICAgIHRoaXMudXJscy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgdGhpcy5maWxlTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodXJscy5pbWFnZUFzRGF0YVVybCkge1xuICAgICAgICBpZiAodGhpcy51cmxzW2ldLmltYWdlQXNEYXRhVXJsID09PSB1cmxzLmltYWdlQXNEYXRhVXJsKSB7XG4gICAgICAgICAgdGhpcy51cmxzLnNwbGljZShpKTtcbiAgICAgICAgICB0aGlzLmZpbGVMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBlbmFibGluZyBtZXJnZSBidXR0b24gaWYgcmVtYWluaW5nIG9uIHVybHMgaXMgaW1hZ2VzXG4gICAgY29uc3QgcmUgPSAvcGRmL2dpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnVybHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAodGhpcy51cmxzW2luZGV4XS5kYXRhLnNlYXJjaChyZSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucGRmQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lcmdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wZGZBdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5maWxlVXBsb2FkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHVibGljIHRyaWdnZXJTbmFwc2hvdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRyaWdnZXIubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVdlYmNhbSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dXZWJjYW0gPSAhdGhpcy5zaG93V2ViY2FtO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUluaXRFcnJvcihlcnJvcjogV2ViY2FtSW5pdEVycm9yKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgc2hvd05leHRXZWJjYW0oZGlyZWN0aW9uT3JEZXZpY2VJZDogYm9vbGVhbiB8IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIHRydWUgPT4gbW92ZSBmb3J3YXJkIHRocm91Z2ggZGV2aWNlc1xuICAgIC8vIGZhbHNlID0+IG1vdmUgYmFja3dhcmRzIHRocm91Z2ggZGV2aWNlc1xuICAgIC8vIHN0cmluZyA9PiBtb3ZlIHRvIGRldmljZSB3aXRoIGdpdmVuIGRldmljZUlkXG4gICAgdGhpcy5uZXh0V2ViY2FtLm5leHQoZGlyZWN0aW9uT3JEZXZpY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlSW1hZ2Uod2ViY2FtSW1hZ2U6IFdlYmNhbUltYWdlKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5pbmZvKCdyZWNlaXZlZCB3ZWJjYW0gaW1hZ2UnLCB3ZWJjYW1JbWFnZSk7XG4gICAgaWYgKHRoaXMuc2luZ2xlRmlsZSkge1xuICAgICAgdGhpcy51cmxzID0gW107XG4gICAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgICB0aGlzLnB1c2hEYXRhKHdlYmNhbUltYWdlKTtcblxuICAgIH1cbiAgICB0aGlzLnB1c2hEYXRhKHdlYmNhbUltYWdlKTtcbiAgfVxuICBwdWJsaWMgcHVzaERhdGEod2ViY2FtSW1hZ2UpIHtcbiAgICB0aGlzLnVybHMucHVzaCh3ZWJjYW1JbWFnZSk7XG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHdlYmNhbUltYWdlKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW1lcmFXYXNTd2l0Y2hlZChkZXZpY2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gY29uc29sZS5sb2coJ2FjdGl2ZSBkZXZpY2U6ICcgKyBkZXZpY2VJZCk7XG4gICAgdGhpcy5kZXZpY2VJZCA9IGRldmljZUlkO1xuICB9XG5cbiAgcHVibGljIGdldCB0cmlnZ2VyT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGdldCBuZXh0V2ViY2FtT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5uZXh0V2ViY2FtLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=