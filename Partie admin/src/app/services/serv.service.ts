import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Service} from '../models/service.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http: HttpClient) {}

  private service: Service[] = [
    
  ];
  public stuff$ = new Subject<Service[]>();

 
  
  getServices():Observable<Service[]>{
    return this.http.get<Service[]>('http://localhost:3000/api/service');
    
  }

  emitStuff() {
    this.stuff$.next(this.service);
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

  

  createNewThingWithFile(service: Service, image: File) {
    return new Promise((resolve, reject) => {
        
      const thingData = new FormData();
      thingData.append('service', JSON.stringify(service));
      console.log(thingData)
      thingData.append('image', image, service.name);
      console.log(thingData.get('image'))

      this.http.post('http://localhost:3000/api/service', thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  deleteService(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/service/' + id).subscribe(
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