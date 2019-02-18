import { EditPage } from './../edit/edit';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage, Button, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Base64 } from '@ionic-native/base64';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Button) buttonEl: ElementRef;

  win:any = window;
  picture;
  constructor(public navCtrl: NavController, private cameraPreview: CameraPreview, private plt: Platform, private sc: ScreenOrientation, private camera: Camera,
    private base64: Base64) {

  }
  ionViewDidLoad(){
  this.lockScreenOrientation();
  this.previewPic();
  }
  async lockScreenOrientation(){
    try {
      this.sc.lock(this.sc.ORIENTATIONS.LANDSCAPE_PRIMARY);
    } catch (error) {
     console.error(error); 
    }
   }

  previewPic() {
    const cameraPreviewOpts = {
      x: 0,
      y: 0,
      width: window.screen.height,
      height: window.screen.width,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
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




   

  }

  openGal(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:false,
      saveToPhotoAlbum: false
    }

    this.getImgFromGal(options).then(myData =>{
      if(myData){
        this.launchEditPage(myData);
      }
      
    });
    
  }

  launchEditPage(myData){
    

    this.navCtrl.push(EditPage,myData);
  }

  async getImgFromGal(options: CameraOptions){
    try{
      let image:string;
      let shouldSave:boolean;
      const result = await this.camera.getPicture(options);
      image = "data:image/jpeg;base64,"+ result;
     // image = this.win.Ionic.WebView.convertFileSrc(image);
      console.log(image);
      if(options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY ||options.sourceType === this.camera.PictureSourceType.SAVEDPHOTOALBUM ){
        shouldSave = false;
      }else{
        shouldSave = true;
      }
     
      const myData = {
        img:image,
        sSave:shouldSave
      }
      return myData;
    
    }
    catch(e){
      console.log(e);
    }
  }

  takePic(){
     // picture options
     const pictureOpts = {
      width: window.screen.height,
      height: window.screen.width,
      quality: 100
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = "data:image/jpeg;base64,"+ imageData;
      const myData = {
        img:this.picture,
        sSave:true
      }
      this.launchEditPage(myData);
    }, (err) => {
      console.log(err);
    });
  }

  
  

}
