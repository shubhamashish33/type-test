import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'type-text';
  textInput: string = '';
  messageCurrentValue: string = "";
  messageCurrentIndex: number = -1;
  message: string = "";
  inputArray: string[];
  wpm: number = 0;
  misTypedWord: number = 0;
  correctTypedWord: number = 0;
  timerId: any;
  time: number;
  correctColor: string = '#4ad836';
  incorrectColor: string = '#e12e2e';
  markerColor: string = '#b792ea';
  toStartTimer: boolean = true;
  key: string = 'typingStats';
  timeFlag: boolean = false;
  public allowRedirect: boolean;
  words: string[] = [
    'cat', 'dog', 'run', 'eat', 'happy', 'sad', 'house', 'tree', 'car', 'city',
    'jump', 'swim', 'laugh', 'cry', 'book', 'pen', 'school', 'teacher', 'student', 'apple',
    'banana', 'orange', 'grape', 'computer', 'phone', 'music', 'song', 'dance', 'movie', 'actor',
    'actress', 'bird', 'fish', 'water', 'river', 'mountain', 'forest', 'sun', 'moon', 'star',
    'friend', 'family', 'love', 'hate', 'game', 'play', 'watch', 'listen', 'write', 'read',
    'story', 'poem', 'picture', 'photo', 'video', 'camera', 'travel', 'journey', 'vacation', 'holiday',
    'work', 'job', 'office', 'company', 'boss', 'employee', 'meeting', 'talk', 'speak', 'hear',
    'listen', 'feel', 'think', 'imagine', 'create', 'build', 'destroy', 'fix', 'help', 'save',
    'danger', 'safe', 'quiet', 'loud', 'small', 'big', 'tiny', 'huge', 'old', 'new',
    'young', 'age', 'baby', 'child', 'teen', 'adult', 'man', 'woman', 'boy', 'girl',
    'sky', 'cloud', 'rain', 'snow', 'wind', 'storm', 'light', 'dark', 'day', 'night',
    'morning', 'evening', 'summer', 'winter', 'spring', 'autumn', 'season', 'year', 'month', 'week',
    'day', 'hour', 'minute', 'second', 'time', 'clock', 'watch', 'calendar', 'birthday', 'party',
    'celebrate', 'festival', 'holiday', 'gift', 'present', 'surprise', 'cake', 'candle', 'balloon', 'decoration',
    'invitation', 'guest', 'host', 'food', 'drink', 'meal', 'breakfast', 'lunch', 'dinner', 'snack',
    'dessert', 'ice', 'cream', 'chocolate', 'candy', 'cookie', 'pie', 'bread', 'butter', 'cheese',
    'milk', 'coffee', 'tea', 'juice', 'soda', 'water', 'wine', 'beer', 'liquor', 'drink',
    'glass', 'cup', 'bottle', 'plate', 'bowl', 'fork', 'spoon', 'knife', 'napkin', 'table',
    'chair', 'sofa', 'bed', 'pillow', 'blanket', 'sheet', 'curtain', 'lamp', 'light', 'fan',
    'air', 'conditioner', 'heater', 'room', 'kitchen', 'bathroom', 'bedroom', 'living', 'dining', 'hall',
    'house', 'apartment', 'building', 'floor', 'ceiling', 'wall', 'window', 'door', 'roof', 'garden',
    'yard', 'garage', 'driveway', 'street', 'road', 'highway', 'bridge', 'tunnel', 'path', 'sidewalk',
    'crosswalk', 'intersection', 'traffic', 'light', 'sign', 'signal', 'stop', 'go', 'green', 'red',
    'yellow', 'blue', 'black', 'white', 'color', 'paint', 'draw', 'sketch', 'art', 'artist',
    'gallery', 'museum', 'exhibit', 'sculpture', 'statue', 'portrait', 'landscape', 'photograph', 'image', 'picture',
    'camera', 'lens', 'flash', 'memory', 'card', 'film', 'roll', 'digital', 'print', 'copy',
    'document', 'file', 'folder', 'paper', 'notebook', 'journal', 'diary', 'note', 'message', 'letter',
    'envelope', 'stamp', 'post', 'mail', 'email', 'send', 'receive', 'address', 'contact', 'phone',
    'call', 'text', 'chat', 'talk', 'conversation', 'discussion', 'meeting', 'appointment', 'schedule', 'calendar',
    'date', 'time', 'hour', 'minute', 'second', 'moment', 'instance', 'event', 'occasion', 'opportunity',
    'chance', 'possibility', 'probability', 'certainty', 'fact', 'truth', 'belief', 'opinion', 'idea', 'thought',
    'concept', 'notion', 'view', 'perspective', 'vision', 'dream', 'goal', 'aim', 'target', 'plan',
    'strategy', 'tactic', 'method', 'approach', 'system', 'process', 'procedure', 'step', 'action', 'move',
    'decision', 'choice', 'option', 'alternative', 'preference', 'priority', 'importance', 'significance', 'value', 'worth',
    'benefit', 'advantage', 'disadvantage', 'strength', 'weakness', 'opportunity', 'threat', 'risk', 'reward', 'challenge',
    'difficulty', 'problem', 'issue', 'matter', 'question', 'query', 'inquiry', 'investigation', 'research', 'study',
    'experiment', 'test', 'trial', 'analysis', 'evaluation', 'assessment', 'review', 'summary', 'report', 'document',
    'record', 'file', 'data', 'information', 'knowledge', 'wisdom', 'understanding', 'insight', 'awareness', 'consciousness',
    'thought', 'idea', 'concept', 'notion', 'belief', 'opinion', 'view', 'perspective', 'vision', 'dream',
    'goal', 'aim', 'target', 'objective', 'intention', 'purpose', 'plan', 'strategy', 'tactic', 'method',
    'approach', 'system', 'process', 'procedure', 'step', 'action', 'move', 'decision', 'choice', 'option',
    'alternative', 'preference', 'priority', 'importance', 'significance', 'value', 'worth', 'benefit', 'advantage', 'disadvantage',
    'strength', 'weakness', 'opportunity', 'threat', 'risk', 'reward', 'challenge', 'difficulty', 'problem', 'issue',
    'matter', 'question', 'query', 'inquiry', 'investigation', 'research', 'study', 'experiment', 'test', 'trial',
    'analysis', 'evaluation', 'assessment', 'review', 'summary', 'report', 'document', 'record', 'file', 'data',
    'information', 'knowledge', 'wisdom', 'understanding', 'insight', 'awareness', 'consciousness', 'thought', 'idea', 'concept',
    'notion', 'belief', 'opinion', 'view', 'perspective', 'vision', 'dream', 'goal', 'aim', 'target',
    'objective', 'intention', 'purpose', 'plan', 'strategy', 'tactic', 'method', 'approach', 'system', 'process',
    'procedure', 'step', 'action', 'move', 'decision', 'choice', 'option', 'alternative', 'preference', 'priority',
    'importance', 'significance', 'value', 'worth', 'benefit', 'advantage', 'disadvantage', 'strength', 'weakness', 'opportunity',
    'threat', 'risk', 'reward', 'challenge', 'difficulty', 'problem', 'issue', 'matter', 'question', 'query',
    'inquiry', 'investigation', 'research', 'study', 'experiment', 'test', 'trial', 'analysis', 'evaluation', 'assessment',
    'review', 'summary', 'report', 'document', 'record', 'file', 'data', 'information', 'knowledge', 'wisdom',
    'understanding', 'insight', 'awareness', 'consciousness', 'thought', 'idea', 'concept', 'notion', 'belief', 'opinion',
    'view', 'perspective', 'vision', 'dream', 'goal', 'aim', 'target', 'objective', 'intention', 'purpose',
    'plan', 'strategy', 'tactic', 'method', 'approach', 'system', 'process', 'procedure', 'step', 'action',
    'move', 'decision', 'choice', 'option', 'alternative', 'preference', 'priority', 'importance', 'significance', 'value'
  ];
  selectedTime: number;

  constructor(private appService: AppService, private router: Router) { }
  ngOnInit() {
    // this.appService.getQuotes().subscribe((response: any) => {
    //   this.message = response[this.getRandomNumber()];
    //   this.message = this.message.replace(/\. +/g, ". ");
    //   this.inputArray = this.message.split("");
    //   this.getSpanElement();
    // });
    // this.message = "Shubham Ashish is here"
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
  createWord(time: number) {
    if (time == 15) {
      for (let i = 0; i < 20; i++) {
        this.message += this.words[this.getRandomNumber()] + " ";
      }
    }
    else if (time == 30) {
      for (let i = 0; i < 50; i++) {
        this.message += this.words[this.getRandomNumber()] + " ";
      }
    }
    else if (time == 60) {
      for (let i = 0; i < 80; i++) {
        this.message += this.words[this.getRandomNumber()] + " ";
      }
    }
    else {
      for (let i = 0; i < 40; i++) {
        this.message += this.words[this.getRandomNumber()] + " ";
      }
    }
    this.inputArray = this.message.split("");
    this.getSpanElement();
  }
  startTimer(seconds: number) {
    this.time = seconds;
    this.timerId = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      }
      else {
        clearInterval(this.timerId);
        this.redirectPage();
      }
    }, 1000)
  }
  redirectPage() {
    console.log("this.wpm -> ", this.wpm);
    if (this.wpm > 0) {
      this.onSaveData();
      this.allowRedirect = true;
      this.appService.setAllowRedirect(this.allowRedirect);
      this.router.navigate(['dashboard']);
    }
  }
  onSaveData() {
    let savedObj: any = {}
    let previousSavedData: any = this.appService.getDataFromLocal(this.key) ? this.appService.getDataFromLocal(this.key) : [];
    savedObj.misTypedWord = this.misTypedWord;
    savedObj.wpm = (this.wpm * (60 / this.selectedTime));
    savedObj.correctTypedWord = this.correctTypedWord;
    previousSavedData.push(savedObj);
    this.appService.setDataToLocal(previousSavedData, this.key);
    this.appService.setKey(this.key);
  }
  getRandomNumber(): number {
    return Math.floor(Math.random() * 500);
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
        this.correctTypedWord += 1;
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
    this.wpm = (characterLength / 5);
  }
  resetCharSpan() {
    const charSpans = document.querySelectorAll(`[id^='charspan']`);
    charSpans.forEach(span => {
      (span as HTMLSpanElement).style.color = 'white';
      (span as HTMLSpanElement).style.fontWeight = 'normal';
    });
    this.messageCurrentIndex = -1;
    this.wpm = 0;
    this.correctTypedWord = 0;
    this.misTypedWord = 0;
    document.getElementById(`charspan${this.messageCurrentIndex + 1}`).style.backgroundColor = "transparent";
    document.getElementById('charspan0').style.backgroundColor = "#ffffff2f";
  }
  onKeyDown(event: KeyboardEvent) {
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
      if (this.toStartTimer) {
        this.startTimer(this.time);
      }
      this.toStartTimer = false;
      this.messageCurrentIndex += 1;
      this.messageCurrentValue += this.message.charAt(this.messageCurrentIndex);
    }
  }
  removeLastCharacter() {
    this.messageCurrentValue = this.messageCurrentValue.slice(0, -1);
  }
  getTime(buttonNumber: number) {
    this.timeFlag = true;
    this.time = buttonNumber;
    this.selectedTime = buttonNumber;
    this.createWord(buttonNumber);
  }
}
