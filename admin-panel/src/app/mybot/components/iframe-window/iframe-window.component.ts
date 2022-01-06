import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { NlpService } from '../../services/nlp.service';

@Component({
  selector: 'app-iframe-window',
  templateUrl: './iframe-window.component.html',
  styleUrls: ['./iframe-window.component.scss']
})
export class IframeWindowComponent implements OnInit {

  constructor(
    public channelService: ChannelService,
    public nlpService: NlpService
  ) { }

  ngOnInit(): void {
    this.channelService.init();
    this.channelService.getBotConfig();
    this.channelService.initChatBox();
    this.nlpService.init(6);
  }

}
