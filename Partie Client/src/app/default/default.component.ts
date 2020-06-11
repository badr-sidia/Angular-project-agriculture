import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { Thing } from '../models/Thing.model';
import { StuffService } from '../services/stuff.service';
import { Service } from '../models/service.model';
import { ServService } from '../services/serv.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
employee:Employee
thing:Thing
service:Service
  constructor(private router: Router,
    private emplservice:EmployeeService,
    private thingservice:StuffService,
    private servService:ServService) { }

  ngOnInit() {
    this.emplservice.getFeaturedEmployees().subscribe(
      employee=>{
           this.employee=employee;
           console.log(this.employee)
      }
    )
    this.thingservice.getThingById('11').subscribe(
      thing=>{
        this.thing=thing;
      }
    )
    this.servService.getServiceById('6').subscribe(
      service=>{
        this.service=service
      }
    )
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
