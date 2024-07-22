import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'type-text';
  textInput: string = '';
  messageCurrentValue: string = "";
  messageCurrentIndex: number = -1;
  message: string = "";
  inputArray: string[];
  wpm: number;
  misTypedWord: number = 0;
  correctTypeWord: number = 0;
  timerId: any;
  timeLeft: number = 60;
  correctColor: string = '#4ad836';
  incorrectColor: string = '#e12e2e';
  markerColor: string = '#b792ea';
  toStartTimer: boolean = true;

  constructor(private appService: AppService) { }
  ngOnInit() {
    // this.appService.getQuotes().subscribe((response: any) => {
    //   this.message = response[this.getRandomNumber()];
    //   this.message = this.message.replace(/\. +/g, ". ");
    //   this.inputArray = this.message.split("");
    //   this.getSpanElement();
    // });
    this.message = "Shubham Ashish is here"
    this.inputArray = this.message.split("");
    this.getSpanElement();
  }
  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
  getSpanElement() {
    setTimeout(() => {
      document.getElementById('charspan0').style.backgroundColor = "#ffffff2f";
    }, 1000)
  }

  startTimer(seconds: number) {
    this.timeLeft = seconds;
    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        clearInterval(this.timerId);
        this.reloadPage();
      }
    }, 1000)
  }
  reloadPage() {
    // window.location.reload();
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 5);
  }
  splitText() {
    const Length = this.textInput.length;
    const charSpan: HTMLSpanElement = document.getElementById(`charspan${this.messageCurrentIndex}`) as HTMLSpanElement;
    let afterCharSpan: HTMLSpanElement = document.getElementById(`charspan${this.messageCurrentIndex + 1}`) as HTMLSpanElement;
    if (this.messageCurrentIndex == this.message.length - 1) {
      afterCharSpan = document.getElementById(`charspan${this.messageCurrentIndex}`) as HTMLSpanElement;
    }
    if (Length == 0) {
      this.resetCharSpan();
    }
    if (Length >= 1) {
      charSpan.style.fontWeight = 'bolder';
      afterCharSpan.style.backgroundColor = '#ffffff2f';
      charSpan.style.backgroundColor = 'transparent';
      const inputcurrentChar = this.textInput[Length - 1];
      const messagecurrentChar = this.message[Length - 1];
      if (inputcurrentChar === messagecurrentChar) {
        charSpan.style.color = this.correctColor;
        this.calculateWPM(this.messageCurrentValue);
        this.correctTypeWord += 1;
      }
      else {
        charSpan.style.color = this.incorrectColor;
        this.calculateWPM(this.messageCurrentValue);
        this.misTypedWord += 1;
      }
    }
  }
  calculateWPM(charachterType: string) {
    const characterLength = charachterType.length;
    this.wpm = characterLength / 5;
  }
  resetCharSpan() {
    const charSpans = document.querySelectorAll(`[id^='charspan']`);
    charSpans.forEach(span => {
      (span as HTMLSpanElement).style.color = 'white';
      (span as HTMLSpanElement).style.fontWeight = 'normal';
    });
    this.messageCurrentIndex = -1;
    this.wpm = 0;
    this.correctTypeWord = 0;
    this.misTypedWord = 0;

    document.getElementById(`charspan${this.messageCurrentIndex + 1}`).style.backgroundColor = "transparent";
    document.getElementById('charspan0').style.backgroundColor = "#ffffff2f";
  }
  onKeyDown(event: KeyboardEvent) {
    if(this.toStartTimer){
      this.startTimer(this.timeLeft);
    }
    this.toStartTimer = false;
    const Length = this.textInput.length;
    if (event.key === 'Backspace' && this.messageCurrentIndex >= 0) {
      const charSpan = document.getElementById(`charspan${this.messageCurrentIndex}`);
      let afterCharSpan = document.getElementById(`charspan${this.messageCurrentIndex + 1}`);
      if (this.messageCurrentIndex == this.message.length - 1) {
        afterCharSpan = document.getElementById(`charspan${this.messageCurrentIndex}`) as HTMLSpanElement;
      }
      if (Length >= 0 && this.misTypedWord >= 0) {
        if (this.misTypedWord > 0) {
          this.misTypedWord -= 1;
        }
        if (Length == 0) {
          this.resetCharSpan();
        }
        charSpan.style.color = 'white';
        afterCharSpan.style.backgroundColor = "transparent";
        charSpan.style.fontWeight = 'normal';
        this.messageCurrentIndex -= 1;
        this.removeLastCharacter();
      }
    }
    else if (event.key.length === 1) {
      this.messageCurrentIndex += 1;
      this.messageCurrentValue += this.message.charAt(this.messageCurrentIndex);
    }
  }
  removeLastCharacter() {
    this.messageCurrentValue = this.messageCurrentValue.slice(0, -1);
  }
}
