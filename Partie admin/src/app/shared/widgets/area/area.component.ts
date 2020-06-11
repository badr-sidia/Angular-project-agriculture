import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Flux } from 'src/app/models/flux.model';
import { DashboardService } from 'src/app/modules/dashboard.service';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  flux:Flux[]
  
 flux1
  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
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
        this.data = principale;
        console.log(this.data)
        this.chartOptions = {
          chart: {
            type: 'area'
          },
          title: {
            text: 'Random DATA'
          },
          subtitle: {
            text: 'Demo'
          },
          tooltip: {
            split: true,
            valueSuffix: 'dinars'
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: true,
          },
          series: this.data
        };
        HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
      }
    )

    
    

    
  }

}
