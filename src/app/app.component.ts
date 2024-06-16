import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'type-text';
  textInput: string = "";
  textInputArray: string[] = this.textInput.split("");
  messageCurrentValue: string = "";
  messageCurrentIndex: number = -1;
  message: string = "";
  inputArray: string[];
  wpm: number;
  misTypedWord: number = 0;
  correctTypeWord: number = 0;
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.appService.getQuotes().subscribe((response: any) => {
      this.message = response[this.getRandomNumber()];
      this.message = this.message.replace(/\. +/g, ". ");
      this.inputArray = this.message.split("");
    });
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 5);
  }
  splitText() {
    const Length = this.textInput.length;
    const charSpan: HTMLSpanElement = document.getElementById(`charspan${this.messageCurrentIndex}`) as HTMLSpanElement;
    if (Length >= 0) {
      charSpan.style.fontWeight = 'bolder';
      const inputcurrentChar = this.textInput[Length - 1];
      const messagecurrentChar = this.messageCurrentValue[Length - 1];
      if (inputcurrentChar === messagecurrentChar) {
        charSpan.style.color = 'green';
        this.calculateWPM(this.messageCurrentValue);
        this.correctTypeWord += 1
      }
      else {
        charSpan.style.color = 'red';
        this.calculateWPM(this.messageCurrentValue);
        this.misTypedWord += 1
      }
    }
  }
  calculateWPM(charachterType: string) {
    const characterLength = charachterType.length;
    this.wpm = characterLength / 5;
  }
  onKeyDown(event: KeyboardEvent) {
    const Length = this.textInput.length;
    if (event.key === 'Backspace') {
      if (Length >= 0 && this.misTypedWord > 0) {
        document.getElementById(`charspan${this.messageCurrentIndex}`).style.color = 'white';
        document.getElementById(`charspan${this.messageCurrentIndex}`).style.fontWeight = 'normal';
        this.messageCurrentIndex -= 1;
        this.removeLastCharacter();
        this.misTypedWord -= 1
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