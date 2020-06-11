import { Component, OnInit } from '@angular/core';
import { OptionService } from 'src/app/services/option.service';
import { Option } from 'src/app/models/Option.model';
import {ActivatedRoute} from '@angular/router'
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  id
  dataSource
  dataEmp
  ELEMENT_DATA: Option[]
  ELEMENT_DATA1:Employee[]
  displayedColumns: string[] = ['id', 'name', 'image','id_service','action'];
  displayedColumns1: string[] = ['id', 'name', 'designation', 'image','abbr','description','email','id_service','action'];
  constructor(private optservice:OptionService,
    private empservice:EmployeeService,
    private route:ActivatedRoute) { 
      
    }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.optservice.getServices(this.id)
    .subscribe(services => {
        this.ELEMENT_DATA= services
        this.dataSource = new MatTableDataSource<Option>(services);
        
    })
    this.empservice.getEmployees(this.id).subscribe(
      employees=>{
        this.ELEMENT_DATA1=employees
        this.dataEmp=new MatTableDataSource<Employee>(employees);
      }
    )
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
    this.empservice.deleteEmployee(id).subscribe(res => {
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
