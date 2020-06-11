import { Component, OnInit } from '@angular/core';
import { flyInOut, expand } from '../../animations/app.animation';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
