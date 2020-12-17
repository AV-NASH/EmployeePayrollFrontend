import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlDirective, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserserviceService } from '../../Services/userervice/userservice.service'
import { Employee } from "../../Employee";
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox:QueryList<any>;
  employee: Employee = new Employee();
  submitted = false;
  userDetail: FormGroup;
  checked = [];
  precio = 0;
  department =['Hr','Sales', 'Finance', 'Engineer','Other'];
  

  constructor(private employeeService: UserserviceService,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userDetail = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]$')])],
      salary: [null, Validators.required],
      gender: [null, Validators.required],
      day: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      notes:[null,Validators.required],
      profilepic:[null,Validators.required]

    });

  }

  getCheckbox(checkbox){
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => this.checked.push(data.value))
  }

  getPrecio(event) {
    this.precio = event.value;
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  

  Day = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  Month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
  ];

  Year = [
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
  ];

  Department = [
    'Hr',
    'Sales',
    'Finance',
    'Engineer',
    'Other',
  ];

  register() {
    console.log(this.checked)
    var x = this.checked.toString();
    console.log(x)
    var employeeDto = {
      'name': this.userDetail.controls['name'].value,
      'salary': this.precio,
      'department':this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'notes':this.userDetail.controls['notes'].value,
      'profilepic':this.userDetail.controls['profilepic'].value
    };           
    console.log("employee dto is", employeeDto)
    this.employeeService.createEmployee(employeeDto).subscribe((response: any) => {
      this.router.navigate(["/"]);
      console.log("response",response.object)
    })
  }

  onSubmit() {
    this.submitted = true;
    this.register();
  }
  reset(){
    this.userDetail.reset();
  }

}
