import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-install-guide-model',
  templateUrl: './install-guide-model.component.html'
})
export class InstallGuideModelComponent implements OnInit {


    @Input() botId: any;

    copyText(){
      let val = `<script src="http://localhost:8080/bundle.js"></script>
      <script>lalabot.init(${this.botId})</script>`
      let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
      }
  


  constructor() { }

  ngOnInit(): void {
  }

}
