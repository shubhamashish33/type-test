import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient: HttpClient) { }

  getQuotes() {
    const apiurl = "https://baconipsum.com/api/?type=meat-and-filler";
    return this.httpclient.get(apiurl);
  }
}
