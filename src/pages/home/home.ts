import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, Flags } from '@ionic-native/file';
import { Platform } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { Crop } from '@ionic-native/crop';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import {FormPage} from '../../pages/form/form';
// import { Croppr} from '../../../node_modules/croppr/dist/croppr';
import { AlertController, LoadingController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
	captured_image: any;
	options: CameraOptions;
	fileTransfer: FileTransferObject;
	cropperOptions: any;
  	croppedImage = null;
  	scaleValX = 1;
  	scaleValY = 1;
  	public image
  	public response;
  	public qr;
  	public manual = false;
	constructor(public navCtrl: NavController,
		private base64ToGallery: Base64ToGallery,
		private camera: Camera,
		private transfer: FileTransfer,
		private file: File,
		private geolocation: Geolocation,
		public navParams: NavParams,
		private crop: Crop,
		public loadingCtrl: LoadingController,
		public alertCtrl:AlertController,
		private nativeAudio: NativeAudio,
		private qrScanner: QRScanner,
		private vibration: Vibration
		// public croppr:Croppr
		) {


		 this.cropperOptions = {
		      dragMode: 'move',
		      aspectRatio: 14/5,
		      autoCrop: true,
		      movable: true,
		      zoomable: true,
		      scalable: true,
		      autoCropArea: 0.8,
		      // cropBoxResizable: true,
		      // minContainerWidth:140,
		      // minContainerHeight:50,
		      // minCropBoxWidth:20,
		      cropBoxMovable: false,
				cropBoxResizable: false,
		      maxCropBoxHeight:500,
		      minCropBoxHeight:500,
		      // minCanvasWidth:500,
		      // minCanvasHeight:5,

		    };
	this.options = {
			quality: 100,
			targetHeight: 500,
			targetWidth: 500,
			destinationType: this.camera.DestinationType.FILE_URI,
			correctOrientation: true,
		}

    // this.angularCropper.cropper.scaleX(-20);
    // this.angularCropper.cropper.scaleY(-20);

	}

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

  scanQR(){
  	this.manual = true;
  	this.qrScanner.prepare().then((status: QRScannerStatus) => {
     
     if (status.authorized) {
      
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        if(text){
        	this.showAlert('QR Scanned ',text);
        	this.qr = text;
        }else{
        	this.showAlert('QR Rrror ','Enter Manual');

        }
         console.log('Scanned something', text);
         scanSub.unsubscribe(); // stop scanning
         this.qrScanner.hide(); // hide camera preview
		 this.uploadImage(	this.image);
      }
       );
		this.qrScanner.show();
		this.captured_image = false;

     } else if (status.denied) {
    
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  },error=>{
  	console.log(JSON.stringify(error))
  })
  .catch((e: any) => console.log('Error is', e));

  }
 
  save() {

    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
    debugger
    // this.uploadImage(this.croppedImage);
    this.uploadImage(this.image);
    // this.captured_image = null;
    // this.croppedImage = null;
  }
	scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  	}
 
  	scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }


	ionViewDidLoad() {

	}
	openCamera() {
		this.options.sourceType = this.camera.PictureSourceType.CAMERA;
		this.camera.getPicture(this.options).then(imageData => {
			this.image = imageData;
			this.captured_image = imageData;		
			// this.crop.crop(imageData, {quality: 75})
			// .then((newImage)=>{
			// 	 this.captured_image= newImage;

			// }, (error) =>{

			// 	 console.error('Error cropping image', error);
			// });
				
				
		}, error => {

		});
	}

	nextPage(){
    this.uploadImage(this.image);

	}
	proceed() {

			this.scanQR();
		
	}

	uploadImage(imageData) {
		this.fileTransfer = this.transfer.create();
	let fileOptions: FileUploadOptions = {
			fileKey: 'image',
			fileName: 'image',
			chunkedMode: false,
			mimeType: 'multipart/form-data',
			headers: {Connection: 'close'}

		}
		debugger
	    let locOptions = {
			maximumAge: 30000,
			timeout: 30000,
			enableHighAccuracy: true
		};
		let param:any={};
		 let loading = this.showLoading();
			let flag = true;
			let url = "https://31dccba3.ngrok.io/"
			this.fileTransfer.upload(imageData,url, fileOptions)
			.then((data) => {
			console.log('Digits Response ' + JSON.stringify(data))
			if(JSON.parse(data.response).detec){
				flag=false;
			}
			this.response = data;
			this.response.customerId = this.qr;
			console.log(flag);
			this.isDetected(flag);
			loading.dismiss();
			}, (err) => {
			this.showAlert('Error','File upload error');
				console.log(err);
			loading.dismiss();

			});
		

		// this.geolocation.getCurrentPosition(locOptions).then( (resp)=>{
		// 	param.latitude = resp.coords.latitude;
		// 	param.longitude = resp.coords.longitude;
		// 	param.punch_time = new Date();
		// 	debugger
		// // loading.dismiss();

		// },(error)=>{
		// loading.dismiss();
		// 	this.showAlert('Error','Server error');
		// 	console.log(error);
		// });

		
	}

	isDetected(detectFlag){
		if(!detectFlag){
			this.showAlert('Error','Cannot find the LCD');
			return;
		}

		this.showAlert('LCD Found','Meter image is good');
		this.navParams.data = this.croppedImage
		this.navCtrl.push(FormPage,{'response':this.response});


	}

		showLoading(content?) {
		let loading;
		if (content) {
			// code...
			loading = this.loadingCtrl.create({
				enableBackdropDismiss: false,
				content: content
			});
		} else {
			loading = this.loadingCtrl.create({
				enableBackdropDismiss: false,
				content: 'Please wait...'
			});
		}
		loading.present();
		return loading;
	}

		showAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			enableBackdropDismiss: false,
			subTitle: message,
			buttons: ['Ok']
		});
		alert.present();
	}

}
