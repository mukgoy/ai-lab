import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import { NlpService } from '../../services/nlp.service';

@Component({
  selector: 'app-iframe-window',
  templateUrl: './iframe-window.component.html',
  styleUrls: ['./iframe-window.component.scss']
})
export class IframeWindowComponent implements OnInit {

  botId = 0;
  constructor(
    private route: ActivatedRoute,
    public channelService: ChannelService,
    public nlpService: NlpService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.botId){
        this.botId = +params.botId;
        this.channelService.init();
        this.channelService.getBotConfig();
        this.channelService.initChatBox();
        this.nlpService.init(this.botId);
      }
    });
    
  }

}
