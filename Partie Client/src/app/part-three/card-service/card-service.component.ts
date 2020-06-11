import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {
@Input()
service:Service
  constructor(private router: Router,private actvroute:ActivatedRoute) { }

  ngOnInit() {
  }
  cardClasses(){
    return {'is-even':this.service.name=='plant guards'};
}
onclicked(service:string){
  this.router.navigate(['/part-three/option-service/'+service]);
}
onclickedSingle(service:string){
  this.router.navigate(['/part-three/single-service/'+service]);
}
}
