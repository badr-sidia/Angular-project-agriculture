import { Component, OnDestroy, OnInit ,ViewChild} from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Thing } from '../../models/Thing.model';
import { Review } from '../../models/Review.model';
import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { visibility } from '../../animations/app.animation';
import { flyInOut ,expand } from '../../animations/app.animation';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-single-thing',
  templateUrl: './single-thing.component.html',
  styleUrls: ['./single-thing.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:  [visibility(),
    flyInOut(),expand()]
})
export class SingleThingComponent implements OnInit, OnDestroy {
  visibility = 'shown';
  formErrors = {
    'author': '',
    'review': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      
    },
    'review': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.'
    
    }
  };
  load:Boolean;
  feedbackServer:Review
  display:Boolean
  showElement:Boolean;
  public stuff: Thing[] = [];
  private stuffSub: Subscription;
  public revu: Review[] ;
  public thing1: Thing;
  public loading: boolean;
  public userId: string;
  public part: number;
  thingIds: string[];
  prev: string;
  next: string;
thing:Thing
feedbackForm: FormGroup;
  com: Review;
  comments:Review;
  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private stuffService: StuffService,
              private auth: AuthService,
              private reviewService:ReviewService,
              private fb:FormBuilder,
              private location: Location) { 
                this.createForm();
                
              }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-thing');
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.reviewService.getReviewById(params.id).then(
          (reviews: Review[]) => {
            this.loading = false;
            this.revu = reviews;
            //console.log(this.revu)
            this.loading = true;
          }
        );
        this.stuffService.getThingById(params.id).subscribe(
          (thing: Thing) => {
            this.loading = false;
            //this.thing1 = thing;
            this.loading = true;
          }
        );
        this.stuffSub = this.stuffService.stuff$.subscribe(
          (stuff) => {
            this.stuff = stuff;
            
            this.loading = false;
          } 
        );
        
        this.stuffService.getStuff();
        this.stuffService.getDishIds().subscribe(thingIds => this.thingIds = thingIds);
        this.route.params.pipe(switchMap((params: Params) => {this.visibility='hidden';return this.stuffService.getThingById(params['id'])}))
        .subscribe((thing)=> { this.thing1 = thing;console.log(this.thing1); this.setPrevNext(thing.id);  this.visibility = 'shown';
        });
        

      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        if (part >= 3) {
          this.userId = this.auth.userId;
        }
      }
    );
    
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: [''],
      date:[''],
      idThing:[''],
      review: ['',[Validators.required,Validators.minLength(2)]]
      
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

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
    this.comments=form.value;
  }
  onSubmit() {
    this.display=true
    this.load=true
    this.feedbackForm.value.date=new Date().toDateString();
    this.feedbackForm.value.idThing=this.thing1.id
    this.com=this.feedbackForm.value
  
    console.log(this.com);
    this.reviewService.createNewReview(this.com).subscribe(
      comment=>{
        this.load=false;
            console.log(comment);
            this.feedbackServer=comment;
            //this.showElement = true; 
            //setTimeout(function(){this.load = true;}, 5000);
            setTimeout(() => {
              
                  //this.showElement=false
                  this.display = false
                
              ;
          }, 50);
          this.route.params.subscribe(
            (params: Params) => {
              this.reviewService.getReviewById(params.id).then(
                (reviews: Review[]) => {
                  this.loading = false;
                  this.revu = reviews;
                  //console.log(this.revu)
                  this.loading = true;
                }
              );
            })
          
      }
    )
       /* this.dish.comments.push(this.com)*/
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      
    });
    
  }
  setPrevNext(thingId: string) {
  this.stuffService.getDishIds().subscribe(
    things=>{
      this.thingIds=things
      console.log(this.thingIds)
    
      const index = this.thingIds.indexOf(thingId);
      console.log(index)
  this.prev = this.thingIds[(this.thingIds.length + index - 1) % this.thingIds.length];
  this.next = this.thingIds[(this.thingIds.length + index + 1) % this.thingIds.length];
  
  console.log(this.next)
    }
  )
  
  
  }
  goBack(): void {
    this.location.back();
  }
  onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/all-stuff']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/all-stuff']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/all-stuff']);
    }
  }

  onModify() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-thing/' + this.thing1.id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-thing/' + this.thing1.id]);
        break;
      case 4:
        this.router.navigate(['/part-four/modify-thing/' + this.thing1.id]);
        break;
    }
  }

  onDelete() {
    this.loading = true;
    this.stuffService.deleteThing(this.thing1.id).then(
      () => {
        this.loading = false;
        switch (this.part) {
          case 1:
          case 2:
            this.router.navigate(['/part-one/all-stuff']);
            break;
          case 3:
            this.router.navigate(['/part-three/all-stuff']);
            break;
          case 4:
            this.router.navigate(['/part-four/all-stuff']);
            break;
        }
      }
    );
  }
  onProductClicked(id: string) {
    if (this.part === 1) {
      this.router.navigate(['/part-one/thing/' + id]);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/thing/' + id]);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/thing/' + id]);
    }
  }
  
  onReview(rev:string,idThing:number) {
    this.loading = true;
    const review = new Review();
    review.review = rev;
    review.idThing=idThing;
    
    this.reviewService.createNewReview(review).subscribe(
      () => {
        
        this.loading = false;
        
      }
    )
  }
  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
  //[disabled]="part >= 3 && userId !== thing?.userId"
  //[disabled]="part >= 3 && userId !== thing?.userId"
}
