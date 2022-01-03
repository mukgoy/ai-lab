import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BotService } from '../../services/bot.service';




@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html'
})
export class FaqsComponent implements OnInit {
  botId=""
  editingFaq = null;
  modalRef?: BsModalRef;
  @ViewChild('faqModel') faqModel?: TemplateRef<any>;
  
  faqs: any[] = [];

  constructor(
    private faqService: FaqService,
    private botService: BotService,
    private modalService: BsModalService,
    
  ) { }

  ngOnInit(): void {
    this.getFaqs();
    this.getBots();
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

  mybots: any[] = [];
  getBots(){
    this.botService.getBots()
    .subscribe((res:any)=>{
      console.log(res);
      this.mybots = res.map((o:any)=>{
        o.jsondata = JSON.parse(o.jsondata)
        return o;
      });
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
    this.getFaqs();
  }
 
}
