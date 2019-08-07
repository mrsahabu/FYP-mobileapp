import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormPage } from '../pages/form/form';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, Flags } from '@ionic-native/file';
import { Platform } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { Crop } from '@ionic-native/crop';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NativeAudio } from '@ionic-native/native-audio';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration/ngx';

// import { Croppr} from '../../node_modules/croppr/dist/croppr';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularCropperjsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Base64ToGallery,
    FileTransfer,
    File,
    Geolocation,
    Crop,
    QRScanner,
    Vibration,

    NativeAudio,
    // Croppr,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
