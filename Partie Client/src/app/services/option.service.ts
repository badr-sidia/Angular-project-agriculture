import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Option} from '../models/Option.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private http: HttpClient) {}

  private option: Option[] = [
    
  ];
  public stuff$ = new Subject<Option[]>();

  getStuff() {
    this.http.get('http://localhost:3000/api/stuff').subscribe(
      (stuff: Option[]) => {
        if (stuff) {
          this.option = stuff;
          this.emitStuff();
          console.log(stuff)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getServices(id:string):Observable<Option[]>{
    return this.http.get<Option[]>('http://localhost:3000/api/option/'+id);
    
  }

  emitStuff() {
    this.stuff$.next(this.option);
  }

  getThingById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/stuff/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

  createNewThingWithFile(option: Option, image: File) {
    return new Promise((resolve, reject) => {
        
      const thingData = new FormData();
      thingData.append('option', JSON.stringify(option));
      console.log(thingData)
      thingData.append('image', image, option.name);
      console.log(thingData.get('image'))

      this.http.post('http://localhost:3000/api/option', thingData).subscribe(
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