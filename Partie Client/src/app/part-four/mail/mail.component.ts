import { Component, OnInit ,ViewChild} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Contact } from '../../models/Contact.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  

  feedbackForm: FormGroup;
  
  load:Boolean;
  display:Boolean
  
  showElement:Boolean;
  formErrors = {
    'name': '',
    'last': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'last': {
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
  statusSelect="New"
  nrSelect = "Vegetable"
  public contactForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private contactService: ContactService,
              private router: Router,
              private auth: AuthService) { 
                this.createForm();
              }

  ngOnInit() {
    this.state.mode$.next('form');
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      last: [null, Validators.required],
      email: [null, Validators.required,Validators.email],
      telnum: ['', [Validators.required, Validators.pattern] ],
      agree: false,
      message: ''
      
    });
    this.userId = this.auth.userId;
  }
  onSubmit() {
    this.loading = true;
    const contact = new Contact();
    contact.name = this.contactForm.get('name').value;
    contact.last=this.contactForm.get('last').value;
    contact.email = this.contactForm.get('email').value;
    contact.agree = this.contactForm.get('agree').value;
    contact.tel=this.contactForm.get('telnum').value;
   
    contact.message=this.contactForm.get('message').value;
    console.log(contact);
    this.contactService.createNewContact(contact).then(
      () => {
        
        this.loading = false;
        this.router.navigate(['/part-four/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
    this.contactForm.reset({
      name: '',
      last: '',
      telnum: '',
      email: '',
      agree: false,
      message: ''
    });
    }

    createForm() {
      this.contactForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        telnum: ['', [Validators.required, Validators.pattern] ],
        email: ['', [Validators.required, Validators.email] ],
        agree: false,
        message: ''
      });
      this.contactForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged(); // (re)set validation messages now
  
    }
    onValueChanged(data?: any) {
      if (!this.contactForm) { return; }
      const form = this.contactForm;
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
  
}
