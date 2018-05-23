import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];


  constructor(
    private loadingCntrl: LoadingController, 
    public navCtrl: NavController,
    private musciProvider: MusicProvider,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
  ) {

  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingCntrl.create({
      content: "Getting Your Music From the Sever",
    });
    allMusicLoadingController.present(); 
    this.musciProvider.getMusics()
      .subscribe((musicList) => {
        allMusicLoadingController.dismiss();
        this.allMusic = musicList;
      });
  }

  addOneSong(refresher){
    console.log(refresher);
    this.musciProvider.getOneSong()
      .subscribe((oneSong) => {
        this.allMusic.unshift(oneSong[0]);
        refresher.complete();
      });
    
  }

  shareSong(music){
    console.log("Share song.....");
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song With Friends",
      buttons: [
        {
          text: "Share on Facebook",
          icon: "logo-facebook",
          handler: ()=>{
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share on Twitter",
          icon: "logo-twitter",
          handler: ()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },{
          text: "Share...",
          icon: "share",
          handler: ()=>{
            this.socialSharing.share(music.name, "", music.image, music.music_url);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    shareSongActionSheet.present();
  }




}
