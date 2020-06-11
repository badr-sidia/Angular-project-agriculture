import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Subscription, Observable } from 'rxjs';
import { Thing } from '../../models/Thing.model';
import { Router ,ActivatedRoute} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../models/Cart.model';
import { flyInOut, expand } from '../../animations/app.animation';
@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class StuffListComponent implements OnInit, OnDestroy {
  public  stuffQualite$:Observable<Thing[]>
  public  stuffPrice$:Observable<Thing[]>
  public cart:Cart;
  public type:string;
  public stuff: Thing[] = [];
  public part: number;
  public loading: boolean;

  private stuffSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private stuffService: StuffService,private cartService:CartService,
              private router: Router,private actvroute:ActivatedRoute) {
                this.type=this.actvroute.params['value']['type'];
                console.log(this.type);
                
               }

  ngOnInit() {
    
    if(!this.type){
    this.loading = true;
    this.state.mode$.next('list');
   
    this.stuffSub = this.stuffService.stuff$.subscribe(
      (stuff) => {
        this.stuff = stuff;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.stuffService.getStuff();
    console.log(this.stuff)
    }
    else{
      this.loading = true;
      this.state.mode$.next('list');
      
      this.stuffSub = this.stuffService.stuff$.subscribe(
        (stuff) => {
          this.stuff = stuff;
          this.loading = false;
        }
      );
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
      this.stuffService.getStuffByType(this.type);
    }
     
  }
  onclickedQualite(qualite:number,type:string){
  this.stuffQualite$=this.stuffService.getStuffByqualite(qualite,type);
  
  this.stuffSub = this.stuffQualite$.subscribe(
    (stuff) => {
      this.stuff = stuff;
      this.loading = false;
    }
  );
  console.log(this.stuffQualite$)
  }
  ontypeClicked(type: string) {
    this.stuffService.getStuffByType(type).subscribe(
      (stuff)=>{
        this.stuff=stuff
        this.loading=false
      }
    )

    this.type=type;
    
    /*if (this.part === 4){
      this.router.navigate(['/part-four/all-stuff/' + type]);
    }*/
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
    onCartClicked() {
     
        this.router.navigate(['/part-four/cart' ]);
     
  }
addCart(thing:Thing){
  const cart = new Cart();
  cart.idThing=thing.id;
  console.log(cart);
  this.cartService.createNewCart(cart);
}
OnPriceHight(price:number){
  this.router.navigate(['/part-four/all-stuff']);
 if(price==4500){
  this.stuffPrice$=this.stuffService.getStuffByHprice(price);
  
  this.stuffSub = this.stuffPrice$.subscribe(
    (stuff) => {
      this.stuff = stuff;
      this.loading = false;
    }
  );
 }
 else if(price==4400)
   
 {
  this.stuffPrice$=this.stuffService.getStuffByLprice(price);
  
  this.stuffSub = this.stuffPrice$.subscribe(
    (stuff) => {
      this.stuff = stuff;
      this.loading = false;
    }
  );
 }
 else{
  this.stuffSub = this.stuffService.stuff$.subscribe(
    (stuff) => {
      this.stuff = stuff;
      this.loading = false;
    }
  );
  this.stuffService.getStuff();
 }
}
  ngOnDestroy() {
    
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }
  

}
