import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss']
})
export class LeaderComponent implements OnInit {
id
prev:string
next:string
employee:Employee
employeesId:string[]
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
    private empService:EmployeeService,
    private feedbackservice:FeedbackService,
    private fb:FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
    
    this.route.params.pipe(switchMap((params: Params) => {return this.empService.getEmployeeById(params['id'])}))
        .subscribe((employee)=> { this.employee = employee;console.log(this.employee); this.setPrevNext(employee.id,employee.id_service);console.log(employee.id);console.log(employee.id_service)
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
    this.feedback.emailLeader=this.employee.email
    this.feedback.mdpLeader=this.employee.mdp;
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
  setPrevNext(employeeId: string,id:string) {
    this.empService.getEmployeeIds(id).subscribe(
      employees=>{
        this.employeesId=employees
        console.log(this.employeesId)
        const index = this.employeesId.indexOf(employeeId);
        console.log(index)
    this.prev = this.employeesId[(this.employeesId.length + index - 1) % this.employeesId.length];
    this.next = this.employeesId[(this.employeesId.length + index + 1) % this.employeesId.length];
      })
      
    
    console.log(this.next)
      }
    
}
