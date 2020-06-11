import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Buys } from 'src/app/models/Buys.model';
import { BuysService } from 'src/app/services/buys.service';
import { Observable } from 'rxjs';
import { Flux } from 'src/app/models/flux.model';
import { StuffService } from 'src/app/services/stuff.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  flux:Flux[]
   ELEMENT_DATA: Buys[]
   buys$:Observable<Buys[]>
   somme$:Observable<Object[]>
   stars
   rate
  bigChart = [];
  flux1
  cards = [];
  pieChart = [];
dataSource
  displayedColumns: string[] = ['position', 'name', 'type', 'adresse','total','id_user'];
 

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    //this.bigChart = this.dashboardService.bigChart();
    //console.log(this.bigChart)
    var rating=[]
    this.thingService.getThingbystar().subscribe(
      stars=>{
        this.stars=stars;
        
        for(i=0;i<stars.length;i++){
          const data={
            name:'',
            rating:''
          }
          data.rating=stars[i].star;
          console.log(data.rating)
          this.thingService.getThingById(stars[i].idThing).subscribe(
            thing=>{
              data.name=thing.title;
              
              rating.push(data)
            }
          )
        }
        this.rate=rating
        console.log(this.rate);
      }
    )
    var adresstable=[]
    var i
    this.dashboardService.getPriceAdresse().subscribe(
      thing=>{
        this.flux1=thing
        console.log(this.flux1)
        for(i=0;i<this.flux1.length;i++){
              if(adresstable.indexOf(this.flux1[i].adresse)==-1){
                  adresstable.push(this.flux1[i].adresse)
              }
        }
        var j
        i=0
        console.log(adresstable)
        var principale=[]
        for(i=0;i<adresstable.length;i++){
          var price=[]
          for(j=0;j<this.flux1.length;j++){
            if(this.flux1[j].adresse==adresstable[i]){
              //console.log(this.flux1[j])
              price.push(this.flux1[j].y)
            }
          }
          
          const myObj={
            name: adresstable[i],
            data: price
          }
          principale.push(myObj)
        }
        //console.log(principale)
        this.bigChart = principale;
        console.log(this.bigChart)
      }
    )
    /*this.dashboardService.getPriceAdresse().subscribe(
      flux=>{
        this.flux=flux
        var flux1=this.flux.map(flux=>{adresse:flux.adresse})
        console.log(flux1)
      }
    )*/
    this.cards = this.dashboardService.cards();
    
    this.dashboardService.getSomme()
    .subscribe(sommes => {
        this.pieChart= sommes
        console.log(this.pieChart)
    })
    
    function myFunction(value){
      var number=this.flux
      return {adresse:value.adresse,
      y:number.map(myFunction1(value.adresse))}

    }
    function myFunction1(value){
      if(this.flux.adresse==value){
      return this.flux.y
      }
    }
    
  }
 

}
