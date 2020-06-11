import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { NewThingWithUploadComponent } from './modules/new-thing-with-upload/new-thing-with-upload.component';
import { LoginComponent } from './modules/login/login.component';
import { FormServiceComponent } from './modules/form-service/form-service.component';
import { ServformComponent } from './modules/servform/servform.component';
import { DetailServiceComponent } from './modules/detail-service/detail-service.component';
import { OptionFormComponent } from './modules/option-form/option-form.component';
import { NewEmployeeComponent } from './modules/new-employee/new-employee.component';
import { ProduitsComponent } from './modules/produits/produits.component';
import { BuysComponent } from './modules/buys/buys.component';
import { FeedbackComponent } from './modules/feedback/feedback.component';

const routes: Routes = [
  {path: '',
component: LoginComponent},
{
  path: 'home',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'buys',
    component: BuysComponent,

  },
  {
    path: 'produits',
    component: ProduitsComponent
  },
  {
    path: 'ventes',
    component: NewThingWithUploadComponent
  },
  {
    path: 'services',
    component: FormServiceComponent
  },
  {
    path: 'new service',
    component: ServformComponent
  },
  {
    path:'detailService/:id',
    component:DetailServiceComponent
  },
  {
    path:'optionService/:id',
    component:OptionFormComponent
  },
  {
    path:'new employee/:id',
    component:NewEmployeeComponent
  },
  {
    path:'feedback/:id',
    component:FeedbackComponent
  }
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
