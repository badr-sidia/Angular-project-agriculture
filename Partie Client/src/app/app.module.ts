import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { StuffListComponent } from './part-one/stuff-list/stuff-list.component';
import { NewThingComponent } from './part-one/new-thing/new-thing.component';
import { SingleThingComponent } from './part-one/single-thing/single-thing.component';
import { ModifyThingComponent } from './part-one/modify-thing/modify-thing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import 'hammerjs';
import {MatIconModule} from '@angular/material/icon';
 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { NewThingWithUploadComponent } from './part-four/new-thing-with-upload/new-thing-with-upload.component';
import { ModifyThingWithUploadComponent } from './part-four/modify-thing-with-upload/modify-thing-with-upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { DetailComponent } from './part-one/detail/detail.component';
import { CartComponent } from './part-four/cart/cart.component';
import { GalleryComponent } from './part-four/gallery/gallery.component';
import { MailComponent } from './part-four/mail/mail.component';
import { AboutusComponent } from './part-four/aboutus/aboutus.component';
import { HaderComponent } from './hader/hader.component';
import { ServiceListComponent } from './part-three/service-list/service-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { SingleServiceComponent } from './part-three/single-service/single-service.component';
import {FormServiceComponent} from './part-three/form-service/form-service.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardServiceComponent } from './part-three/card-service/card-service.component';

import { OptionComponent } from './part-three/option/option.component';
import { EmployeeComponent } from './part-three/employee/employee.component';
import { ChatComponent } from './part-three/chat/chat.component';
import { TypeThingComponent } from './part-one/type-thing/type-thing.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatListModule } from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HighlightDirective } from './directives/highlight.directive';
import { FooterComponent } from './footer/footer.component';
import { LeaderComponent } from './part-three/leader/leader.component';
@NgModule({
  declarations: [
    AppComponent,
    PartOneComponent,
    PartThreeComponent,
    PartFourComponent,
    DefaultComponent,
    HeaderComponent,
    StuffListComponent,
    NewThingComponent,
    SingleThingComponent,
    ModifyThingComponent,
    LoginComponent,
    SignupComponent,
    NewThingWithUploadComponent,
    ModifyThingWithUploadComponent,
    DetailComponent,
    CartComponent,
    GalleryComponent,
    MailComponent,
    AboutusComponent,
    HaderComponent,
    ServiceListComponent,
    SingleServiceComponent,
    OptionComponent,
    CardServiceComponent,
    
    FormServiceComponent,
    EmployeeComponent,
    ChatComponent,
    TypeThingComponent,
    HighlightDirective,
    FooterComponent,
    LeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
//comment
//comment2