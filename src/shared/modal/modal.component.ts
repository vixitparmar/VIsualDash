import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent<T> {
  display = false;
  @Output() closed: EventEmitter<any> = new EventEmitter<any>(); 

  constructor(private modalService: ModalService<T>) { }

  async open(): Promise<void> {
    this.display = true;
  }

  async close(data:any = null): Promise<void> {
    this.display = false;
    this.closed.emit(data);
    setTimeout(async () => {
      await this.modalService.close();
    }, 300);
  }
}
