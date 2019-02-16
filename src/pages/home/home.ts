import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Button, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Button) buttonEl: ElementRef;


  picture;
  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, private plt: Platform, private sc: ScreenOrientation) {

  }
  ionViewDidLoad(){
  this.lockScreenOrientation();
  this.takePic();
  }
  async lockScreenOrientation(){
    try {
      this.sc.lock(this.sc.ORIENTATIONS.LANDSCAPE_PRIMARY);
    } catch (error) {
     console.error(error); 
    }
   }

  takePic() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.height,
      height: window.screen.width,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    }

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });




    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

  }

  

}
