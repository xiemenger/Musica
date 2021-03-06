import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "https://orangevalleycaa.org/api/music";
@Injectable()
export class MusicProvider {
  public musics = [];

  constructor(public http: Http) {
    console.log('Hello MusicProvider Provider');
  }

  getMusics(){
    return this.http.get(API)
              .map(response => response.json())
  }

  getOneSong(){
    let oneSongUrl = "https://orangevalleycaa.org/api/music/qty/1";
    return this.http.get(oneSongUrl)
      .map(response => response.json());
  }

}
