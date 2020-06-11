import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { Cart } from '../models/Cart.model';
import { HttpClient } from '@angular/common/http';
import { StuffService } from './stuff.service';
@Injectable({
    providedIn: 'root'
  })
export class CartService {
  private stuff: Thing[] = []
  private thing1 :Thing
  private carts: Cart[] 
  public stuff$ = new Subject<Thing[]>();
  public carts$ = new Subject<Cart[]>();
    constructor(private http: HttpClient,private stuffService:StuffService) {}
    getCarts() {
      this.http.get('http://localhost:3000/api/cart').subscribe(
        (carts: Cart[]) => {
          if (carts) {
            this.carts = carts;
            for (let cart of this.carts) {
              this.stuffService.getThingById(cart.idThing).subscribe(
                (thing: Thing) => {
                  
                  this.thing1 = thing;
                  
                  this.stuff.push(this.thing1);
                });
            }
            this.stuffService.emitStuff();
            
            console.log(this.stuff)
            this.emitCarts();
            console.log(this.carts)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    emitCarts() {
      this.carts$.next(this.carts);
    }
    emitStuff() {
      this.stuff$.next(this.stuff);
    }
    createNewCart(cart: Cart) {
      return new Promise((resolve, reject) => {
        
        /*const thingData = JSON.stringify(cart);
        console.log(thingData)*/
        const thingData = new FormData();
      thingData.append('cart', JSON.stringify(cart));
        this.http.post('http://localhost:3000/api/cart', thingData).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
         });
    }
    modifyCart(id: string, cart: Cart) {
      return new Promise((resolve, reject) => {
        let thingData: Thing | FormData;
          thingData = new FormData();
          thingData.append('cart', JSON.stringify(cart));
         this.http.put('http://localhost:3000/api/cart/' + id, thingData).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
 
}