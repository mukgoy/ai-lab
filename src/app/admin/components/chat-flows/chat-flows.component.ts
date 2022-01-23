import { Component, OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-chat-flows',
  templateUrl: './chat-flows.component.html'
})
export class ChatFlowsComponent implements OnInit {

  mybots: any[] = [];
  constructor(
    private botService: BotService
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

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

}
