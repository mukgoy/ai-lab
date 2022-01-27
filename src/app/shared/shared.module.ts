import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import guards from './guards';
import interceptors from './interceptors';
import pipes, { ErrortostringPipe } from './pipes';
import services, { ScriptService } from './services';


@NgModule({
  declarations: [
    ErrortostringPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ...services
  ],
  exports: [
    ErrortostringPipe
  ]
})
export class SharedModule { }
