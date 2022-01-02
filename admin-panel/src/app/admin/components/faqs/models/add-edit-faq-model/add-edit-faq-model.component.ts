import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators } from '@angular/forms';
import { BotService } from 'src/app/admin/services/bot.service';

@Component({
  selector: 'admin-add-edit-faq-model',
  templateUrl: './add-edit-faq-model.component.html'
})
export class AddEditFaqModelComponent implements OnInit {

  @Output() onSuccess = new EventEmitter<any>() ;
  @Input() modalRef : BsModalRef = new BsModalRef();
  @Input() editingFaq: any;

  public Editor = ClassicEditor;

  isEditMode = false;
  formSubmited = false;
  formGroup  = this.fb.group({
    botId     : ["",[Validators.required]],
    question  : ["",[Validators.required]],
    answer  : ["",[Validators.required]],
  });

  constructor(
    private fb : FormBuilder,
    private botService: BotService
  ) { }

  ngOnInit(): void {
    this.getBots();
  }

  ngOnChanges(changes: SimpleChanges): void{
    var editingFaq = changes.editingFaq.currentValue;
    if(editingFaq){
      this.isEditMode = true;
    }
  }

  onSubmit(){
    console.log(this.formGroup.value);
    this.formSubmited = true;
    if(this.formGroup.status == 'VALID'){
      // this.helperService.notify('success', messages.success.createGroup);
      this.onSuccess.emit('success');
      this.modalRef.hide();
    }
  }


  mybots: any[] = [];
  getBots(){
    this.botService.getBots()
    .subscribe((res:any)=>{
      console.log(res);
      this.mybots = res;
    },(error:any)=>{
        // this.helperService.notify('error', error);
    });
  }
}
