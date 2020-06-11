import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { NewThingWithUploadComponent } from './modules/new-thing-with-upload/new-thing-with-upload.component';
import { LoginComponent } from './modules/login/login.component';
import { FormServiceComponent } from './modules/form-service/form-service.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ServformComponent } from './modules/servform/servform.component';
import {MatIconModule} from '@angular/material/icon'
import { ChartsModule } from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
import 'hammerjs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar'; 

import { DetailServiceComponent } from './modules/detail-service/detail-service.component';
import { OptionFormComponent } from './modules/option-form/option-form.component';
import { NewEmployeeComponent } from './modules/new-employee/new-employee.component';
import { ProduitsComponent } from './modules/produits/produits.component';
import { StarRatingModule } from 'angular-star-rating';
import { BuysComponent } from './modules/buys/buys.component';
import { FeedbackComponent } from './modules/feedback/feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    NewThingWithUploadComponent,
    LoginComponent,
    FormServiceComponent,
    ServformComponent,
    DetailServiceComponent,
    OptionFormComponent,
    NewEmployeeComponent,
    ProduitsComponent,
    BuysComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ChartsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    StarRatingModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
