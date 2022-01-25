import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { ChatMessageEntity, ChatUserType } from 'src/app/shared/entities';

@Component({
  selector: 'mybot-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  // botConfig:any = this.store.bot
  constructor(
    public msgService:MsgService,
    public store:StoreService,
    private ref:ChangeDetectorRef
  ){ }

  ngOnInit(): void {
    // this.store.bot?.jsondata.subscribe((botConfig)=>{
    //   this.botConfig = botConfig;
    //   this.ref.detectChanges();
    // })
  }

  get msgs(){
    return this.msgService.msgs;
  }

  ngStyle(msg:ChatMessageEntity){
    if(msg.sender?.type==ChatUserType.USER){
      // let botConfig = this.botConfig;
      let botConfig = this.store.bot;
      let styles:any = {}
      styles["color"] = botConfig?.jsondata.textColor;
      if(botConfig?.jsondata.isGradient){
          styles["background-image"] = `linear-gradient(-225deg, ${botConfig.jsondata.bgColor1} 35%, ${botConfig.jsondata.bgColor2} 100%)`;
      }else{
          styles["background-color"] = `${botConfig?.jsondata.bgColor1}`;
      }
      return styles
    }
    return { }
  }

}
