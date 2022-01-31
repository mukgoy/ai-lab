import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
declare var lalabot: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  isOpen = true;
  isOpenMobile = false;
  constructor(public script: ScriptService) {
    this.script.load([environment.bundleJs]).then(data => {
        console.log('script loaded ', data);
        lalabot.init("61f65d1feaaeab3104cd9f6d");
    }).catch(error => console.log(error));
  }

  ngOnInit(): void {
  }

}
