import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuPageService {

    constructor( private http: HttpClient) { }

    getmenudata(): any {
      return this.http.get('/assets/mock/menuData.json');
    }
}
