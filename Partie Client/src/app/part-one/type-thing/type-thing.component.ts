import { Component, OnInit, Input } from '@angular/core';
import { Thing } from 'src/app/models/Thing.model';

@Component({
  selector: 'app-type-thing',
  templateUrl: './type-thing.component.html',
  styleUrls: ['./type-thing.component.scss']
})
export class TypeThingComponent implements OnInit {
@Input()
stuffThing:Thing[]
  constructor() { }

  ngOnInit() {
  }

}
