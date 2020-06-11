import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Service } from '../../models/service.model';
import { mimeType } from '../mime-type.validator';
import { ServService } from 'src/app/services/serv.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Option } from 'src/app/models/Option.model';
import { OptionService } from 'src/app/services/option.service';
import { Employee } from 'src/app/models/employee.model';
/*export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  image: string;
}*/



@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class FormServiceComponent implements OnInit {
 // dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'type', 'image'];
  
  expandedElement: PeriodicElement | null;

  //displayedColumns: string[] = ['position', 'name', 'type', 'image'];
 dataSource: Service[] ;
 dataEmp:Employee[];
 //expandedElement: PeriodicElement | null;
  statusSelect="New"
  nrSelect = "Vegetable"
  public thingForm: FormGroup;
  public loading = false;
  options$:Observable<Option[]>
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;
  services$:Observable<Service[]>
  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private servService: ServService,
              private router: Router,
              private auth: AuthService,
              private optionService:OptionService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.thingForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [0, Validators.required],
      userId: [0],
      type: [null, Validators.required],
      status: [null, Validators.required],
      stock: [null, Validators.required],
      qualite: [0, Validators.required],
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
    this.services$=this.servService.getServices();
    
    this.servService.getServices()
    .subscribe(services => {
        this.dataSource = services 
    })
   
  }
onExpand(id:number){
  if(typeof(id)=="number"){
    this.options$=this.optionService.getServices(id);
    //this.expandedElement=this.options$
  }
}
  onSubmit() {
    this.loading = true;
    const thing = new Service();
    thing.name = this.thingForm.get('title').value;
    
    thing.type=this.thingForm.get('type').value;
    
    thing.image = '';
    
    
   this.servService.createNewThingWithFile(thing, this.thingForm.get('image').value).then(
      () => {
        this.thingForm.reset();
        this.loading = false;
        
        //this.router.navigate(['/part-four/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.thingForm.get('image').patchValue(file);
    this.thingForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.thingForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  onDelete(id){
    this.servService.deleteService(id);
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

