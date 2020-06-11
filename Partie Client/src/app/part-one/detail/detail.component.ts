
import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Thing } from '../../models/Thing.model';
import { Buys } from '../../models/Buys.model';
import { StuffService } from '../../services/stuff.service';
import { BuysService } from '../../services/buys.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() data: object;
  
  public stuff: Thing[] = [];
  private stuffSub: Subscription;
  public buyForm: FormGroup;
  public thing1: Thing;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private stuffService: StuffService,
              private buysService: BuysService,
              private auth: AuthService,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-thing');

    this.buyForm = this.formBuilder.group({
     quantite: [null, Validators.required],
      userId: [0],
      
    });
    this.userId = this.auth.userId;


    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.stuffService.getThingById(params.id).subscribe(
          (thing: Thing) => {
            this.loading = false;
            this.thing1 = thing;
          }
        );
        this.stuffSub = this.stuffService.stuff$.subscribe(
          (stuff) => {
            this.stuff = stuff;
            this.loading = false;
          }
        );
        this.stuffService.getStuff();

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
  ondate(quantite:number,adresse:string,price:number,title:string,type:string){
  let buys=new Buys ();
  let date=new Date()
  let day=date.getHours().toString();
  buys.name=title;
  buys.type=type;
  buys.total=quantite*price;
  buys.adresse=adresse
  buys.date=day;
  buys.id_user= this.userId;
  console.log(buys)
  this.buysService.createNewCart(buys).then(
    () => {
      this.buyForm.reset();
      this.loading = false;
      this.router.navigate(['/part-four/all-stuff']);
    },
    (error) => {
      this.loading = false;
      
    }
  );
}
  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
  //[disabled]="part >= 3 && userId !== thing?.userId"
  //[disabled]="part >= 3 && userId !== thing?.userId"
}



