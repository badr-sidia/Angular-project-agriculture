import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { mimeType } from '../mime-type.validator';
import { StateService } from 'src/app/services/state.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {Option} from '../../models/Option.model'
import { OptionService } from 'src/app/services/option.service';
@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent implements OnInit {
  statusSelect="New"
  nrSelect = "Vegetable"
  public optionForm: FormGroup;
  public loading = false;
  public part: number;
  public id
  public imagePreview: string;
  public errorMessage: string;
  constructor( private formBuilder:FormBuilder,
    private state:StateService,
    private route: ActivatedRoute,
    private router:Router,
              private auth: AuthService,
              private optservice:OptionService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.id = +this.route.snapshot.params['id'];
    this.optionForm = this.formBuilder.group({
      name: [null, Validators.required],
      userId: [0],
      image: [null, Validators.required, mimeType]
    });
    
  }
  onSubmit() {
    this.loading = true;
    const option = new Option();
    option.name = this.optionForm.get('name').value;
    option.image = '';
    option.id_service = this.id;
    console.log(option.id_service)
    this.optservice.createNewThingWithFile(option, this.optionForm.get('image').value).then(
      () => {
        this.optionForm.reset();
        this.loading = false;
        this.router.navigate(['/home/detailService/',this.id]);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.optionForm.get('image').patchValue(file);
    this.optionForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.optionForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
