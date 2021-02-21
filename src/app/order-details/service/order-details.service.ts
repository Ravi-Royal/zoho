import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor( private http: HttpClient) { }

  getOrderdata() {
    return this.http.get('/assets/mock/orderDetails.json');
  }

}
