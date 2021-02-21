import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
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

  constructor(private toastMessageService: ToastMessageService,
              private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.display = true;
    console.log(this.cartData);
    this.cols = [
      { field: 'NAME', header: 'Food Name' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'PRICE', header: 'Price' },
      { field: '', header: '' },
    ];
  }

  ngOnDestroy(): void {
    this.display = false;
  }

  get totalPrice(): number {
    let totalAmount = 0;
    this.cartData.map((data: any) => {
      totalAmount += +data.quantity * data.PRICE;
    });
    return totalAmount;
  }

  onRowEditInit(data): void {
    console.log(this);
  }

  onCloseDialogue(): void {
    this.confirm1();
  }


  onClickPlaceOrder(): void {
    this.toastMessageService.addToast({
      severity: 'success', summary: 'Order Placed', detail: 'Your order Placed Successfully and delivered to you soon'
    });
    this.router.navigateByUrl('/order-details');
  }

  confirm1(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.toastMessageService.addToast({ severity: 'error', summary: 'Order Status', detail: 'You have cancelled the order' });
        this.display = false;
        this.closeDialogue.emit();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.toastMessageService.addToast({ severity: 'info', summary: 'Order Status', detail: 'Continue to place the order' });
            this.display = true;
            break;
          case ConfirmEventType.CANCEL:
            this.toastMessageService.addToast({ severity: 'info', summary: 'Order Status', detail: 'Continue to place order' });
            this.display = true;
            break;
        }
      }
    });
  }
}
