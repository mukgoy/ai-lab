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
    styles["color"] = botConfig.ui.textColor;
    if(botConfig.ui.isGradient){
        styles["background-image"] = `linear-gradient(-225deg, ${botConfig.ui.bgColor1} 35%, ${botConfig.ui.bgColor2} 100%)`;
    }else{
        styles["background-color"] = `${botConfig.ui.bgColor1}`;
    }
    return styles
  }

}
