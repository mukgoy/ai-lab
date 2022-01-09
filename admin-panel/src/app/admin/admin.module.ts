import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatFlowsComponent } from './components/chat-flows/chat-flows.component';
import { DetailsComponent } from './components/chat-flows/details/details.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { CrmComponent } from './components/crm/crm.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from './components/shared/utils/color-picker/color-picker.component';
import { ImagePickerComponent } from './components/shared/utils/image-picker/image-picker.component';
import { AddEditFaqModelComponent } from './components/faqs/models/add-edit-faq-model/add-edit-faq-model.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { NgPipesModule } from 'ngx-pipes';
import { NgxColorsModule } from 'ngx-colors';
import { ErrortostringPipe } from './pipes/errortostring.pipe';
import { InstallGuideModelComponent } from './components/chat-flows/models/install-guide-model/install-guide-model.component';
import { BotuiScrollDirective } from './directives/botui-scroll.directive';
import { BotuiFocusDirective } from './directives/botui-focus.directive';
import { ManageWelcomeComponent } from './components/chat-flows/manage-welcome/manage-welcome.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ChatFlowsComponent,
    DetailsComponent,
    FaqsComponent,
    ConversationsComponent,
    CrmComponent,
    MyprofileComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ColorPickerComponent,
    ImagePickerComponent,
    AddEditFaqModelComponent,
    ErrortostringPipe,
    InstallGuideModelComponent,
    BotuiScrollDirective,
    BotuiFocusDirective,
    ManageWelcomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CKEditorModule,
    AccordionModule.forRoot(),
    NgPipesModule,
    NgxColorsModule
  ],
  providers: [BsModalService],
})
export class AdminModule { }
