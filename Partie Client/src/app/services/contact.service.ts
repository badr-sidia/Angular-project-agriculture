import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Thing } from '../models/Thing.model';
import { Contact } from '../models/Contact.model';
import { HttpClient } from '@angular/common/http';
import { StuffService } from './stuff.service';
@Injectable({
    providedIn: 'root'
  })
export class ContactService {
  private stuff: Thing[] = []
  private thing1 :Thing
  //private carts: Cart[] 
  public stuff$ = new Subject<Thing[]>();
  //public carts$ = new Subject<Cart[]>();
    constructor(private http: HttpClient,private stuffService:StuffService) {}
    
    
    createNewContact(contact: Contact) {
      return new Promise((resolve, reject) => {
        
        /*const thingData = JSON.stringify(cart);
        console.log(thingData)*/
        const thingData = new FormData();
      thingData.append('contact', JSON.stringify(contact));
        this.http.post('http://localhost:3000/api/contact', thingData).subscribe(
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