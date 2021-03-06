import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../../Services/userervice/userservice.service'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: any;
  color;
  constructor(private employeeService: UserserviceService,
    private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }

  deleteEmployee(id) {
    console.log(id)
     this.employeeService.deleteEmployee(id)
       .subscribe((response:any) => {
         console.log(response)
         this.reloadData();
        // this.router.navigate(["/"]);
       })
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe((response:Response)=>{
      console.log("Response is ====> ",response)
       this.employees = response;
    })
  }

}
