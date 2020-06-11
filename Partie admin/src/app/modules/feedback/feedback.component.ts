import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { BuysService } from 'src/app/services/buys.service';
import { Buys } from 'src/app/models/Buys.model';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  id
  prev:string
  next:string
  user:User
  buy:Buys
  buysId
  commandId
  feedbackForm:FormGroup
  feedback:Feedback
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private route:ActivatedRoute,
    private userService:UserService,
    private feedbackservice:FeedbackService,
    private buysServices:BuysService,
    private fb:FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
    
    this.route.params.pipe(switchMap((params: Params) => {return this.buysServices.getBuyById(params['id'])}))
        .subscribe((buy)=> { this.buy = buy;this.userService.getUserById(this.buy.id_user).subscribe(
          user=>{
            this.user=user;
            console.log(user);
          }
        );  console.log(this.buy); this.setPrevNext(this.buy.id)
        });
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedback.emailLeader=this.buy.id_user
    
    console.log(this.feedback);
    this.feedbackservice.createNewFeedback(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  setPrevNext(buysId) {
    this.buysServices.getBuysIds().subscribe(
      buys=>{
        this.buysId=buys
        console.log(this.buysId)
        
        const index = this.buysId.indexOf(this.buy.id);
        console.log(index)
    this.prev = this.buysId[(this.buysId.length + index - 1) % this.buysId.length];
    this.next = this.buysId[(this.buysId.length + index + 1) % this.buysId.length];
    
    console.log(this.prev)
      })
    
     }

}
