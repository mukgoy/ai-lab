import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { adminNotify } from 'src/app/admin/enums';
import { HelperService } from 'src/app/shared/services';

@Component({
  selector: 'admin-install-guide-model',
  templateUrl: './install-guide-model.component.html'
})
export class InstallGuideModelComponent implements OnInit {

  @Input() modalRef: BsModalRef = new BsModalRef();
  @Input() botId: any;

  constructor(private help: HelperService,) { }

  ngOnInit(): void {
  }

  copyText() {
    let val = `<script src="http://localhost:8080/bundle.js"></script><script>lalabot.init(${this.botId})</script>`
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

    this.help.notify('success', adminNotify.success.copyContent);
  }
}
