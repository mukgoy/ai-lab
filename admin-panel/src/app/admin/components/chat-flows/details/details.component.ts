import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BotService } from 'src/app/admin/services/bot.service';
import { UploadService } from 'src/app/admin/services/upload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  iconActive: any = {
    header : "http://localhost:4200/assets/mybot/images/bot-header-1.svg",
    launcher : "http://localhost:4200/assets/mybot/images/launcher-3.svg"
  }
  colorActive: any = {
    bgColor1: "info",
    bgColor2: "info",
    textColor: "info"
  }

  botId: number = 0;
  editingBot: any = {};
  formSubmited = false;
  formGroup = this.fb.group({
    name: ["", [Validators.required]],
    jsondata: this.fb.group({
      isGradient: [true, [Validators.required]],
      bgColor1: [this.colorActive.bgColor1, [Validators.required]],
      bgColor2: [this.colorActive.bgColor2, [Validators.required]],
      textColor: [this.colorActive.textColor, [Validators.required]],
      header: this.fb.group({
        text: ["", [Validators.required]],
        logo: [this.iconActive.header, [Validators.required]]
      }),
      launcher: this.fb.group({
        text: ["", [Validators.required]],
        logo: [this.iconActive.header, [Validators.required]]
      }),
    })
  });

  
  constructor(
    private fb: FormBuilder,
    private upload: UploadService,
    private botService: BotService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.botId){
        this.botId = +params.botId;
        this.getBotById();
      }
    });
    
  }

  onSubmit() {
    this.formSubmited = true;
    if (this.formGroup.status == 'VALID') {
      let httpService;
      if (this.botId) {
        let botId = this.botId;
        httpService = this.botService.updateBotById({ ...this.formGroup.value, botId });
      } else {
        httpService = this.botService.createBot(this.formGroup.value);
      }
      httpService.subscribe((res: any) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      });
    }
  }

  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.upload.post(file).subscribe((res: any) => {
        console.log(res);
      }, (err) => {
        console.log(err.message);
      })
    }
  };

  getBotById() {
    this.botService.getBotById(this.botId)
      .subscribe((res: any) => {
        console.log(res);
        res.jsondata = JSON.parse(res.jsondata)
        this.editingBot = res;
        this.formGroup.patchValue(this.editingBot);

        this.iconActive = {
          header : this.editingBot.jsondata.header.logo,
          launcher : this.editingBot.jsondata.launcher.logo,
        }
        this.colorActive = {
          bgColor1: this.editingBot.jsondata.bgColor1,
          bgColor2: this.editingBot.jsondata.bgColor2,
          textColor: this.editingBot.jsondata.textColor
        }

      }, (error: any) => {
        // this.helperService.notify('error', error);
      });
  }

  onIconSelect(icon:string, iconType:string){
    this.iconActive[iconType] = icon;
    this.formGroup.controls.jsondata.get(iconType)?.patchValue({
      logo : icon
    })
  }
  
  onColorSelect(color:string, colorType:string){
    this.colorActive[colorType] = color;
    let obj:any = {};
    obj[colorType] = color
    this.formGroup.controls.jsondata.patchValue(obj)
  }
}
