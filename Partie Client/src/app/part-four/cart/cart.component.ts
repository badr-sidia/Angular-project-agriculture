import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { Thing } from '../../models/Thing.model';
import { Router ,ActivatedRoute} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../models/Cart.model';;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public thing1: Thing;
  public stuff: Thing[] = [];
  public cart:Cart;
  public carts: Cart[] = [];
  public part: number;
  public loading: boolean;
  private stuffSub: Subscription;
  private cartsSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
   private cartService:CartService,private stuffService:StuffService,
    private router: Router,private actvroute:ActivatedRoute) {
      
     }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');

    this.state.mode$.next('single-thing');
    this.stuffSub = this.stuffService.stuff$.subscribe(
      (stuff) => {
        this.stuff = stuff;
        this.loading = false;
      }
    );
    this.loading = true;
    this.cartsSub = this.cartService.carts$.subscribe(
      (carts) => {
        this.carts = carts;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.cartService.getCarts();
    console.log(this.carts)
  }
  onSubmit(cart:Cart) {
    this.loading = true;
   cart.total="45"
    this.cartService.modifyCart(cart.id, cart).then(
      () => {
        
        this.loading = false;
        
      },
      (error) => {
        this.loading = false;
       
      }
    );
  }


}
