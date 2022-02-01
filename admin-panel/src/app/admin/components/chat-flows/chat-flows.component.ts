import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-chat-flows',
  templateUrl: './chat-flows.component.html'
})
export class ChatFlowsComponent implements OnInit {

  mybots: any[] = [];
  selectedBot:any
  modalRef: BsModalRef = new BsModalRef();
  @ViewChild('installGuideModel') installGuideModel?: TemplateRef<any>;
  constructor(
    private botService: BotService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  getBots(){
    this.botService.getBots()
    .subscribe((res:any)=>{
      console.log(res);
      this.mybots = res
    },(error:any)=>{
        // this.helperService.notify('error', error);
    });
  }

  openModal(bot:any) {
    this.selectedBot = bot
    if(this.installGuideModel){
      this.modalRef  = this.modalService.show(this.installGuideModel, {class: 'modal-xl bg-transparent',backdrop : 'static',keyboard : false});
    }
  }
}
