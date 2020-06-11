import { Component, OnInit ,ViewChild} from '@angular/core';
import { Thing } from 'src/app/models/Thing.model';
import { StuffService } from 'src/app/services/stuff.service';
import Swal from 'sweetalert2'
import { MatTableDataSource, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  id
  dataSource
  dataEmp
  ELEMENT_DATA: Thing[]
  displayedColumns: string[] = ['id', 'title','description', 'imageUrl','price','status','stock','qualite','action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private thingservice:StuffService) { }

  ngOnInit() {
    
    this.thingservice.getStuff().subscribe(produits => {
        
        this.dataSource = new MatTableDataSource<Thing>(produits);
        this.dataSource.paginator = this.paginator;
        
    })
  }
  onDelete(id){
    Swal.fire({
      title:'Are you sure',
      text: "You won't be able to revert this!",
      
      showCancelButton: true,
    
      confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      this.thingservice.deleteThing(id).subscribe(res => {
        console.log(res);
        
      });
    
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
  
  }
  

}
