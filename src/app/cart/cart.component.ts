import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastMessageService } from '../toast-message/toast-message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  @Input() cartData: any;
  @Output() closeDialogue = new EventEmitter();

  display: boolean;
  cols: any;
  products: any;
  tableData: any;

  constructor(private toastMessageService: ToastMessageService, private router: Router) { }

  ngOnInit(): void {
    this.display = true;
    console.log(this.cartData)
    this.cols = [
      { field: 'NAME', header: 'Food Name' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'PRICE', header: 'Price' },
      { field: '', header: '' },
    ];
  }

  ngOnDestroy() {
    this.display = false;
  }

  get totalPrice(): number {
    let totalAmount = 0;
    this.cartData.map((data: any) => {
      totalAmount += +data.quantity*data.PRICE
    })
    return totalAmount;
  }

  onRowEditInit(data) {
    console.log(this)
  }

  onCloseDialogue() {
    this.closeDialogue.emit();
  }

  onClickPlaceOrder() {
    this.toastMessageService.addToast({
      severity:'success', summary:'Order Placed', detail:'Your order Placed Successfully and delivered to you soon'
    })
    this.router.navigateByUrl('/order-details');
  }
}
