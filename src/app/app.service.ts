import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private wpm: number = 0;
  private misTypedWord: number = 0;
  private correctTypeWord: number = 0;
  private key: string;
  private allowRedirect: boolean;
  constructor(private httpclient: HttpClient) { }

  getQuotes() {
    const apiurl = "https://baconipsum.com/api/?type=meat-and-filler";
    return this.httpclient.get(apiurl);
  }
  getWPM(){
    return this.wpm;
  }
  setWPM(wpm: number){
    this.wpm = wpm;
  }
  getMisTypedWord(){
    return this.misTypedWord;
  }
  setMisTypedWord(misTypedWord: number){
    this.misTypedWord = misTypedWord;
  }
  getCorrectTypeWord(){
    return this.correctTypeWord;
  }
  setCorrectTypedWord(correctTypeWord: number){
    this.correctTypeWord = correctTypeWord;
  }
  getKey(){
    return this.key;
  }
  setKey(key: string){
    this.key = key;
  }
  getDataFromLocal(key?: string){
    const savedData = localStorage.getItem(key ? key: this.key);
    return JSON.parse(savedData);
  }
  setDataToLocal(savedData: any[], key: string){
    localStorage.setItem(key, JSON.stringify(savedData));
  }
  getAllowRedirect(){
    return this.allowRedirect;
  }
  setAllowRedirect(allowRedirect: boolean){
    this.allowRedirect = allowRedirect;
  }
}
