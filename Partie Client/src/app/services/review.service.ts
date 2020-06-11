import { Injectable } from '@angular/core';
import { Subject ,Observable} from 'rxjs';
import { Thing } from '../models/Thing.model';
import { Review } from '../models/Review.model';
import { HttpClient } from '@angular/common/http';
import { StuffService } from './stuff.service';

@Injectable({
    providedIn: 'root'
  })
export class ReviewService {
  private stuff: Thing[] = []
  private thing1 :Thing
  //private carts: Cart[] 
  public stuff$ = new Subject<Thing[]>();
  //public carts$ = new Subject<Cart[]>();
    constructor(private http: HttpClient,private stuffService:StuffService) {}

    createNewReview(review: Review):Observable<Review>{
        /*const thingData = JSON.stringify(cart);
        console.log(thingData)*/
        const thingData = new FormData();
      thingData.append('review', JSON.stringify(review));
        return this.http.post<Review>('http://localhost:3000/api/review', thingData);
          
    }
    getReviewById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.get('http://localhost:3000/api/review/' + id).subscribe(
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