
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import{ CameraPreview } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';

import { EditPageModule } from '../pages/edit/edit.module';

import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EditPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraPreview,ScreenOrientation, Camera,Base64
  ]
})
export class AppModule {}
