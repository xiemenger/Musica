import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];


  constructor(
    private loadingCntrl: LoadingController, 
    public navCtrl: NavController,
    private musciProvider: MusicProvider) {

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


}
