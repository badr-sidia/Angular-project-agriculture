import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard.service';

import { Chart } from 'chart.js';  
import { BuysService } from 'src/app/services/buys.service';
import { Observable } from 'rxjs';
import { Buys } from 'src/app/models/Buys.model';
import { Percentage } from 'src/app/models/Percentage.model';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})

export class PieComponent implements OnInit {
  buys$:Observable<Percentage[]>
  data: Percentage[];  
  url = 'http://localhost:58617/API/Charts/GetCharts';  
  Player = [];  
  Run = [];  
  
  constructor(private dushboardService:DashboardService) { }  

  ngOnInit() {  
    this.buys$=this.dushboardService.getSomme();
    this.buys$.subscribe((result: Object[]) => {  
      result.forEach(x => {  
        console.log(x['y'])
        this.Player.push(x['name']);  
        this.Run.push(x['y']);  
      });  
      this  
      var chart = new Chart('canvas', {  
        type: 'pie',  
        data: {  
          labels: this.Player,  
          datasets: [  
            {  
              data: this.Run,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true  
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
    });  
  }  
}
