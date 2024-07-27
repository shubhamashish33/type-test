import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public wpm: number = 0;
  public misTypedWord: number = 0;
  public correctTypedWord: number = 0;
  public key: string = 'typingStats';
  public savedData: any[] = [];
  public highestWPM: number = 0;
  public rawWpm: number = 0;
  public totalCharacterCount : number = 0;
  public testAccuracy: number = 0;
  public rating: string = "";

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getData();
    this.getAccuracy();
    this.getRawWpm();
    this.getRating();
  }
  getData() {
    const savedDataObj: any = this.appService.getDataFromLocal(this.key);
    this.savedData = savedDataObj;
    this.setData();
  }
  setData() {
    this.savedData = this.savedData.filter(data => data.wpm > 0);
    const recentData = this.savedData[this.savedData.length - 1];
    this.wpm = recentData.wpm;
    this.correctTypedWord = recentData.correctTypedWord;
    this.misTypedWord = recentData.misTypedWord;
    this.totalCharacterCount = recentData.totalCharacter;
    this.getHightestWPM();
  }
  getHightestWPM() {
    let max = 0;
    this.savedData.forEach((data: any) => {
      if (max < data.wpm) {
        max = data.wpm;
      }
    })
    this.highestWPM = max;
  }
  getRawWpm(){
    this.rawWpm = Math.round(this.wpm / (this.correctTypedWord / this.totalCharacterCount ))
  }
  getAccuracy(){
    this.testAccuracy = parseFloat((this.correctTypedWord / this.totalCharacterCount * 100).toFixed(1));
  }
  getRating(){
    if(this.wpm > 60 && this.testAccuracy > 90){
      this.rating = "⭐⭐⭐⭐⭐";
    }
    else if(this.wpm > 50 && this.testAccuracy > 50){
      this.rating = "⭐⭐⭐⭐";
    }
    else if(this.wpm > 30 && this.testAccuracy > 30){
      this.rating = "⭐⭐⭐";
    }
    else if(this.wpm > 20 && this.testAccuracy > 20){
      this.rating = "⭐⭐";
    }
    else{
      this.rating = "⭐";
    }
  }
}
