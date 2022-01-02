import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html'
})
export class FaqsComponent implements OnInit {

  editingFaq = null;
  modalRef?: BsModalRef;
  @ViewChild('faqModel') faqModel?: TemplateRef<any>;
  
  faqs: any[] = [];
  constructor(
    private faqService: FaqService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(){
    this.faqService.getFaqs()
    .subscribe((res:any)=>{
      console.log(res);
      this.faqs = res
    },(error:any)=>{
        // this.helperService.notify('error', error);
    });
  }

  openModal(editingFaq=null) {
    if(this.faqModel){
      this.editingFaq = editingFaq;
      this.modalRef = this.modalService.show(this.faqModel, {class: 'modal-xl bg-transparent',backdrop : 'static',keyboard : false});
    }
  }

  onSuccess(event : Event){
    
  }
}
