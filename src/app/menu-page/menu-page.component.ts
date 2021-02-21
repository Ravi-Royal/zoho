import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastMessageService } from '../toast-message/toast-message.service';
import { MenuPage } from './model/menu-page.model';
import { MenuPageService } from './service/menu-page.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  menuPage = new MenuPage();

  constructor(private menuPageService: MenuPageService, private toastMessageService: ToastMessageService) { }

  ngOnInit(): void {
    this.menuData();
  }

  menuData() {
    this.menuPageService.getmenudata().subscribe((data: any) => {
      this.menuPage.menuAvailable = data;
      data.map((data) => {
        this.menuPage.cartData.addControl(data.NAME, new FormControl(0));
      });
    });
  }

  clickingGotoCart() {
    this.menuPage.menuAvailable.map((data: any) => {
      data.quantity = this.menuPage.cartData.get(data.NAME).value;
    });
    this.menuPage.selectedItem = this.menuPage.menuAvailable.filter((data: any) => data.quantity != 0);
    console.log(this.menuPage.selectedItem);
    if (this.menuPage.selectedItem.length > 0) {
      this.menuPage.cartDataOpen = true;
    } else {
      this.toastMessageService.addToast({
        severity: 'error', summary: 'No Item Selected', detail: 'Add atleaset one content to the cart'
      });
    }
  }

  closingCartPopUp() {
    this.menuPage.cartDataOpen = false;
    this.menuPage.selectedItem = [];
    this.menuPage.cartData.reset();
    Object.keys(this.menuPage.cartData.controls).forEach(key => {
      this.menuPage.cartData.controls[key].setValue(0);
    });
  }
}
