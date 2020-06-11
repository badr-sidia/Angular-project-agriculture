import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Buys } from 'src/app/models/Buys.model';
import { BuysService } from 'src/app/services/buys.service';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'type', 'adresse','total','id_user','detail'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
   ELEMENT_DATA: Buys[]
   buys$:Observable<Buys[]>
   
dataSource
  constructor(private dashboardService: DashboardService,
    private buysService:BuysService,
    private thingService:StuffService) {
      this.buys$=this.buysService.getBuys();
    this.buys$
    .subscribe(services => {
        this.ELEMENT_DATA= services
        this.dataSource = new MatTableDataSource<Buys>(services);
        this.dataSource.paginator = this.paginator;
    })
   
      
     }

  ngOnInit() {
  }

}
