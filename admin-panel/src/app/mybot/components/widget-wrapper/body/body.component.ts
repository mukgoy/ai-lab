import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';

@Component({
  selector: 'mybot-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  botConfig:any = {}
  constructor(
    public msgService:MsgService,
    public store:StoreService,
    private ref:ChangeDetectorRef
  ){ }

  ngOnInit(): void {
    this.store.botConfig.subscribe((botConfig)=>{
      this.botConfig = botConfig;
      this.ref.detectChanges();
    })
  }

  get msgs(){
    return this.msgService.msgs;
  }

  ngStyle(msg:any){
    let style = msg.type=='human' ? "8px 0px 8px 8px" : "0px 8px 8px 8px"
    return {
      'color' : this.botConfig.jsondata.textColor,
      "background-color": "#e6e5ec",
      "border-radius": style
    }
  }

}
