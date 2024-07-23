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
  public savedData: any[] = []

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    const savedDataObj: any = this.appService.getDataFromLocal(this.key);
    this.savedData = savedDataObj;
    console.log(savedDataObj);
    this.setData();
  }
  setData(){
    const recentData = this.savedData[this.savedData.length - 1];
    this.wpm = recentData.wpm;
    this.correctTypedWord = recentData.correctTypedWord;
    this.misTypedWord = recentData.misTypedWord
  }
}
