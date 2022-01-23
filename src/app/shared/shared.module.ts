import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import guards from './guards';
import interceptors from './interceptors';
import pipes from './pipes';
import services, { ScriptService } from './services';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ...services
  ],
  exports: [
  ]
})
export class SharedModule { }
