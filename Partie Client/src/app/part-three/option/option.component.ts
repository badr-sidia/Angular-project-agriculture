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

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
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
              private optionService: OptionService,
              private router: Router,private actvroute:ActivatedRoute,
              private auth: AuthService) {
                this.id=this.actvroute.params['value']['id']
               }

  ngOnInit() {
    this.state.mode$.next('form');
    this.thingForm = this.formBuilder.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      id_service: [0],
      type: [null, Validators.required],
     
      image: [null, Validators.required, mimeType]
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const option = new Option();
    option.name = this.thingForm.get('name').value;
    
    option.id_service=this.id;
    
    option.image = '';
    
    console.log(option)
   this.optionService.createNewThingWithFile(option, this.thingForm.get('image').value).then(
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