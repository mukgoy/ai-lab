import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/mybot/services/store.service';

@Component({
  selector: 'mybot-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  botConfig:any = {}
  constructor(public store:StoreService,private ref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.botConfig.subscribe((botConfig)=>{
      this.botConfig = botConfig;
      this.ref.detectChanges();
    })
  }

  ngStyle(){
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

}
