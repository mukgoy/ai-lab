import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { lalabotUrl } from 'src/app/shared/configs';
import { ScriptService } from 'src/app/shared/services';
declare var lalabot: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  constructor(public script: ScriptService) {
    this.script.load([lalabotUrl]).then(data => {
        console.log('script loaded ', data);
        lalabot.init(1);
    }).catch(error => console.log(error));
  }

  ngOnInit(): void {
  }

}
