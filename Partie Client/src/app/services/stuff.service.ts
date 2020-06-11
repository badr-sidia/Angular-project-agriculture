import { Injectable } from '@angular/core';
import { Subject ,Observable} from 'rxjs';
import { Thing } from '../models/Thing.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StuffService {
things:Thing[]=[]
  constructor(private http: HttpClient) {}

  private stuff: Thing[] = [
    {
      id: '324sdfmoih3',
      title: 'Mon objet',
      description: 'A propos de mon objet',
      imageUrl: 'https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d',
      price: 4900,
      type: 'Mon objet',
      status: 'Mon objet',
      stock: 'Mon objet',
      qualite: 0,
      userId: 'will'
    },
    {
      id: '324sdfmoih4',
      title: 'Un autre objet',
      description: 'A propos de mon autre objet',
      imageUrl: 'https://www.publicdomainpictures.net/pictures/10000/velka/1536-1249273362hbHb.jpg',
      price: 2600,
      type: 'Mon objet',
      status: 'Mon objet',
      stock: 'Mon objet',
      qualite: 0,
      userId: 'will'
    },
  ];
  public stuff$ = new Subject<Thing[]>();
  private stuffQualite: Thing[] = []
  public stuffQualite$ = new Subject<Thing[]>();
  getStuff() {
    this.http.get('http://localhost:3000/api/stuff').subscribe(
      (stuff: Thing[]) => {
        if (stuff) {
          this.stuff = stuff;
          this.emitStuff();
          console.log(stuff)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getStuffByType(type:string):Observable<Thing[]>{
    return this.http.get<Thing[]>('http://localhost:3000/api/stuff/type/' + type)
      
  }

  getStuffByQualite(qualite:number){
    this.http.get('http://localhost:3000/api/stuff/qualite/' + qualite).subscribe(
      (stuff: Thing[]) => {
        if (stuff) {
          this.stuffQualite = stuff;
          this.emitStuff();
         
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  emitStuff() {
    this.stuff$.next(this.stuff);
  }
  getStuffByqualite(qualite:number,type:string):Observable<Thing[]>{
    return this.http.get<Thing[]>('http://localhost:3000/api/stuff/qualite/'+qualite+'/'+type);
    
  }
  getStuffByHprice(price:number):Observable<Thing[]>{
    return this.http.get<Thing[]>('http://localhost:3000/api/stuff/price/'+price);
    
  }
  getStuffByLprice(price:number):Observable<Thing[]>{
    return this.http.get<Thing[]>('http://localhost:3000/api/stuff/priceL/'+price);
    
  }
  getAllStuff():Observable<Thing[]>{
   
      return this.http.get<Thing[]>('http://localhost:3000/api/stuff') 
  }

  getThingById(id: string):Observable<Thing>{
    return this.http.get<Thing>('http://localhost:3000/api/stuff/' + id)
        
  }
  
 
  getDishIds(): Observable<string[] | any> {
    return this.getAllStuff().pipe(map(things=>things.map(thing=>thing.id)));
  }

  createNewThing(thing: Thing) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/stuff', thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewThingWithFile(thing: Thing, image: File) {
    return new Promise((resolve, reject) => {
      const thingData = new FormData();
      thingData.append('thing', JSON.stringify(thing));
      thingData.append('image', image, thing.title);
      console.log(thingData.get('image'))
      this.http.post('http://localhost:3000/api/stuff', thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
      });
  }

  modifyThing(id: string, thing: Thing) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/stuff/' + id, thing).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThingWithFile(id: string, thing: Thing, image: File | string) {
    return new Promise((resolve, reject) => {
      let thingData: Thing | FormData;
      if (typeof image === 'string') {
        thing.imageUrl = image;
        thingData = thing;
      } else {
        thingData = new FormData();
        thingData.append('thing', JSON.stringify(thing));
        thingData.append('image', image, thing.title);
      }
      this.http.put('http://localhost:3000/api/stuff/' + id, thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteThing(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/stuff/' + id).subscribe(
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
