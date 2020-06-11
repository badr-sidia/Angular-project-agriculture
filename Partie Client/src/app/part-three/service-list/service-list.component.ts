import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Service} from '../../models/service.model';
import { ServService } from 'src/app/services/serv.service';
import { Router ,ActivatedRoute} from '@angular/router';
import {  flyInOut,expand } from '../../animations/app.animation';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ServiceListComponent implements OnInit {
   services=[
     {
       name:'plant guards',
       type:'daily',
       image:'assets/images/7.jpg'
     },
     {
      name:'Landscape',
      type:'weekly',
      image:'assets/images/8.jpg'
    },
    {
      name:'Extra services',
      type:'monthly',
      image:'assets/images/9.jpg'
    }
   ]
   services$:Observable<Service[]>
  constructor(private servService:ServService ,private router: Router,private actvroute:ActivatedRoute) { }

  ngOnInit() {
    this.services$=this.servService.getServices();
  }
  
  

}
