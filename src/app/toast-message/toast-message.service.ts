import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private messageService: MessageService) {}

  addToast(data): void {
    this.messageService.add({severity: data.severity, summary: data.summary, detail: data.detail});
  }
  clear(): void {
    this.messageService.clear();
  }

}
