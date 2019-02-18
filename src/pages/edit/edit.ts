import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  @ViewChild('img')img : ElementRef;

  imagePath:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sc: ScreenOrientation) {
  }

  ionViewDidLoad() {
    this.lockScreenOrientation();
    this.imagePath = this.navParams.get('img');
    this.img.nativeElement.src = this.imagePath;
  }
  async lockScreenOrientation(){
    try {
      this.sc.lock(this.sc.ORIENTATIONS.LANDSCAPE_PRIMARY);
    } catch (error) {
     console.error(error); 
    }
   }

}
