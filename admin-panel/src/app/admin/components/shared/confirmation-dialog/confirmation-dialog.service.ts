import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  public modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService
  ) { }

  public confirm(
    title: string = "Confirm",
    message: string = "This action cannot be undo.",
    btnOkText: string = 'Delete',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm'
  ) {
    this.modalRef = this.modalService.show(ConfirmationDialogComponent,{class: 'modal-md',backdrop : 'static',keyboard : false});
    this.modalRef.content.title = title;
    this.modalRef.content.message = message;
    this.modalRef.content.btnOkText = btnOkText;
    this.modalRef.content.btnCancelText = btnCancelText;
    return this.modalRef.content.onClose;

  }

}
