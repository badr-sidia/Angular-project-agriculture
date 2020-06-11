import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { Thing } from '../../models/Thing.model';
import { Router ,ActivatedRoute} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from '../../models/Cart.model';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public cart:Cart;
  public type:string;
  public stuff: Thing[] = [];
  public part: number;
  public loading: boolean;

  private stuffSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
    private stuffService: StuffService,private cartService:CartService,
    private router: Router,private actvroute:ActivatedRoute) { }

  ngOnInit() {
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
  }
  getType(type: string) {
    

    this.type=type;
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
this.stuffService.getStuffByType(type);
  }

}
