import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Buys } from '../models/Buys.model';
import { HttpClient } from '@angular/common/http';
import { StuffService } from './stuff.service';
@Injectable({
    providedIn: 'root'
  })
export class BuysService {
 
  
  private buys:Buys[] = [
    
  ];
  public buys$ = new Subject<Buys[]>();
    constructor(private http: HttpClient,private stuffService:StuffService) {}
   
    
    createNewCart(buys: Buys) {
      return new Promise((resolve, reject) => {
        
        /*const thingData = JSON.stringify(cart);
        console.log(thingData)*/
        const thingData = new FormData();
      thingData.append('buys', JSON.stringify(buys));
        this.http.post('http://localhost:3000/api/buys', thingData).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
         });
    }
    getBuys():Observable<Buys[]>{
        return this.http.get<Buys[]>('http://localhost:3000/api/buys');
        
      }
      getBuyById(id: string):Observable<Buys>{
        return this.http.get<Buys>('http://localhost:3000/api/buys/' + id);
            
      }
      getBuysIds(): Observable<string[] | any> {
        return this.getBuys().pipe(map(buys=>buys.map(buys=>buys.id)));
      }
}