import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Option } from '../../models/Option.model';
import { mimeType } from '../mime-type.validator';
import { ServService } from 'src/app/services/serv.service';
import { OptionService } from 'src/app/services/option.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  statusSelect="New"
  nrSelect = "Vegetable"
  public thingForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;
   id
  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router,private actvroute:ActivatedRoute,
              private auth: AuthService) {
                this.id=this.actvroute.params['value']['id']
               }

  ngOnInit() {
    this.state.mode$.next('form');
    this.thingForm = this.formBuilder.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      id_service: [null],
      designation:[null, Validators.required],
      abbr:[null, Validators.required],
      featured:false,
      description:[null, Validators.required],
      email:[null, Validators.required,Validators.email],
      mdp:[null, Validators.required],
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const employee = new Employee();
    employee.name = this.thingForm.get('name').value;
    employee.id_service = this.thingForm.get('id_service').value;
    employee.designation=this.thingForm.get('designation').value;
    employee.abbr=this.thingForm.get('abbr').value;
    employee.featured=this.thingForm.get('featured').value;
    employee.description=this.thingForm.get('description').value;
    employee.email=this.thingForm.get('email').value;
    employee.mdp=this.thingForm.get('mdp').value;
    //employee.id_service=this.id;
    
    employee.image = '';
    
    console.log(employee)
  this.employeeService.createNewThingWithFile(employee, this.thingForm.get('image').value).then(
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
}