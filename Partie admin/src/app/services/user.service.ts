import { Injectable } from '@angular/core';
import {Observable}from 'rxjs'
import { User } from '../models/User.model';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUserById(id: string):Observable<User>{
    return this.http.get<User>('http://localhost:3000/api/auth/' + id);
        
  }
}
