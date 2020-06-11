import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Option} from '../models/Option.model';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  private employee:Employee[] = [
    
  ];
  public stuff$ = new Subject<Employee[]>();

  getStuff() {
    this.http.get('http://localhost:3000/api/employee').subscribe(
      (stuff: Employee[]) => {
        if (stuff) {
          this.employee = stuff;
          this.emitStuff();
          console.log(stuff)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getEmployees(id:string):Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:3000/api/employee/'+id);
    
  }
  getFeaturedEmployees():Observable<Employee>{
    return this.http.get<Employee>('http://localhost:3000/api/employee');
    
  }
  emitStuff() {
    this.stuff$.next(this.employee);
  }

  getEmployeeById(id: string):Observable<Employee>{
    return this.http.get<Employee>('http://localhost:3000/api/employee/single/' + id)
        
  }
  getEmployeeIds(id:string): Observable<string[] | any> {
    return this.getEmployees(id).pipe(map(employees=>employees.map(employee=>employee.id)));
  }

  createNewThingWithFile(option: Employee, image: File) {
    return new Promise((resolve, reject) => {
        
      const thingData = new FormData();
      thingData.append('employee', JSON.stringify(option));
      console.log(thingData)
      thingData.append('image', image, option.name);
      console.log(thingData.get('image'))

      this.http.post('http://localhost:3000/api/employee', thingData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  deleteEmployee(id: string) {
    
    return this.http.delete('http://localhost:3000/api/employee/' + id);
  }
  
}