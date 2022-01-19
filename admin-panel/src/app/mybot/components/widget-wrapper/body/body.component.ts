import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SenderType } from 'src/app/mybot/enums';
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
    if(msg.senderType==SenderType.USER){
      let botConfig = this.botConfig;
      let styles:any = {}
      styles["color"] = botConfig.jsondata.textColor;
      if(botConfig.jsondata.isGradient){
          styles["background-image"] = `linear-gradient(-225deg, ${botConfig.jsondata.bgColor1} 35%, ${botConfig.jsondata.bgColor2} 100%)`;
      }else{
          styles["background-color"] = `${botConfig.jsondata.bgColor1}`;
      }
      return styles
    }
    return { }
  }

}
