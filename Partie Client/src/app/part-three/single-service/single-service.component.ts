import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Service} from '../../models/service.model';
import { Option} from '../../models/Option.model';
import { ServService } from 'src/app/services/serv.service';
import { OptionService } from 'src/app/services/option.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.scss']
})
export class SingleServiceComponent implements OnInit {
  services$:Observable<Service[]>
  servc:Service
  options$:Observable<Option[]>
  employees$:Observable<Employee[]>
  id
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(private servService:ServService,
    private optionService:OptionService,
    private actRoute:ActivatedRoute,
    private emplService:EmployeeService) { 
this.id=this.actRoute.params['value']['id']
    }
 
  ngOnInit() {
    this.servService.getServiceById(this.id).subscribe(
      (servc: Service) => {
       
        this.servc = servc;
      }
    );
    
    this.services$=this.servService.getServices();
    this.options$=this.optionService.getServices(this.id);
    this.employees$=this.emplService.getEmployees(this.id)
    console.log(this.services$)
  }

}
