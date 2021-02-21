import { Component, OnInit } from '@angular/core';
import { MenuPageService } from '../menu-page/service/menu-page.service';
import { OrderDetailsService } from './service/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {


  cols: any[];
  orderDetails: any = [];

  constructor(private orderDetailsService: OrderDetailsService, private menuPageService: MenuPageService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'ITEMNAME', header: 'ITEMNAME' },
      { field: 'TYPE', header: 'TYPE' },
      { field: 'CUISINE', header: 'CUISINE' },
      { field: 'PRICE', header: 'PRICE' },
      { field: 'ORDER_DATE', header: 'ORDER_DATE' },
      { field: 'ORDER_TIME', header: 'ORDER_TIME' }
    ];

    this.orderDetails = [];

    this.orderDetailsService.getOrderdata().subscribe((data) => {
      this.menuPageService.getmenudata().subscribe((menuData) => {
        const allData = [];
        for (let i = 0; i < 1000; i++){
          const randomNum = Math.floor(Math.random() * 3);
          allData.push({
              ITEMNAME: menuData[randomNum].NAME,
              TYPE: menuData[randomNum].TYPE,
              CUISINE: menuData[randomNum].CUISINE,
              PRICE: menuData[randomNum].PRICE,
              ORDER_DATE: new Date().setDate(new Date().getDate()),
              ORDER_TIME: new Date(new Date().setMinutes(new Date().getMinutes() - i))
          });
        }
        this.orderDetails = allData;
      });
    });


  }

}
