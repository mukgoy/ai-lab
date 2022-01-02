import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeWindowComponent } from './components/iframe-window/iframe-window.component';
import { WidgetWrapperComponent } from './components/widget-wrapper/widget-wrapper.component';
import { HeaderComponent } from './components/widget-wrapper/header/header.component';
import { BodyComponent } from './components/widget-wrapper/body/body.component';
import { FooterComponent } from './components/widget-wrapper/footer/footer.component';
import { MybotRoutingModule } from './mybot-routing.module';



@NgModule({
  declarations: [
    IframeWindowComponent,
    WidgetWrapperComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MybotRoutingModule
  ]
})
export class MybotModule { }
